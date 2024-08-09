import React, { useEffect, useState } from "react";
import { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL, doc, updateDoc } from "../../firebase";

const NewKnowledge = ({ onCancel }) => {
  const [knowledgeData, setKnowledgeData] = useState({
    type: "",
    sourceType: "",
    description: "",
    mediaFile: null,
    mediaUrl: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (knowledgeData.mediaFile && knowledgeData.sourceType === "image") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(knowledgeData.mediaFile);
    }
    if (knowledgeData.mediaFile && knowledgeData.sourceType === "video") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setVideoUrl(e.target.result);
      };
      reader.readAsDataURL(knowledgeData.mediaFile);
    }
  }, [knowledgeData.mediaFile]);

  const handleUpload = async () => {
    try {
      let fileUrl = "";

      if (knowledgeData.mediaFile) {
        const fileRef = ref(storage, `knowledge_media/${knowledgeData.mediaFile.name}`);
        await uploadBytes(fileRef, knowledgeData.mediaFile);
        fileUrl = await getDownloadURL(fileRef);
      }

      const docRef = await addDoc(collection(db, "knowledge"), {
        type: knowledgeData.type,
        sourceType: knowledgeData.sourceType,
        description: knowledgeData.description,
        mediaUrl: fileUrl || knowledgeData.mediaUrl,
      });

      console.log("Document written with ID: ", docRef.id);
      onCancel();  // Close the modal after successful upload
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="absolute w-screen h-screen lg:w-full lg:h-full z-10 top-0 left-0 bg-[#50525580] flex justify-center items-center">
      <div className="w-full lg:w-[90%] h-full md:h-fit bg-white rounded-md p-4 md:p-8">
        <div className="w-full h-fit flex gap-4 justify-between flex-wrap mt-12">
          <div className="w-full md:w-[50%] h-fit flex flex-col gap-7 ">
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-300 font-medium"
              placeholder="Type"
              value={knowledgeData.type}
              onChange={(e) =>
                setKnowledgeData({ ...knowledgeData, type: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-300 font-medium"
              placeholder="Source Type"
              value={knowledgeData.sourceType}
              onChange={(e) =>
                setKnowledgeData({
                  ...knowledgeData,
                  sourceType: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full md:w-[40%] h-[10rem] rounded-md bg-slate-300 relative flex justify-center items-center">
            {knowledgeData.mediaFile && knowledgeData.sourceType === "image" ? (
              <img
                src={imageUrl}
                alt="image"
                className="absolute w-full h-full top-0 left-0 z-1 rounded-md object-cover"
              />
            ) : (
              <p className="text-gray-500 font-medium">Media Preview 🖼️</p>
            )}
            {knowledgeData.mediaFile && knowledgeData.sourceType === "video" && (
              <video
                src={videoUrl}
                className="absolute w-full h-full top-0 left-0 z-1 rounded-md object-cover"
                controls
              />
            )}
          </div>
        </div>
        <div className="w-full h-fit flex justify-between mt-9 md:mt-0 flex-wrap">
          <textarea
            className="w-full md:w-[50%] h-[15rem] outline-none border-none rounded-md bg-slate-300 p-3"
            placeholder="description"
            value={knowledgeData.description}
            onChange={(e) =>
              setKnowledgeData({
                ...knowledgeData,
                description: e.target.value,
              })
            }
          />
          <div className="w-full md:w-[40%] h-full flex flex-col gap-5 mt-5">
            <div className="w-full h-10 pl-2 flex justify-center items-center rounded-md border-none outline-none bg-slate-400 font-medium relative">
              <input
                type="file"
                accept={
                  knowledgeData.sourceType === "image"
                    ? ".jpg,.png"
                    : knowledgeData.sourceType === "video"
                    ? "video/*"
                    : ""
                }
                className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                onChange={(e) =>
                  setKnowledgeData({
                    ...knowledgeData,
                    mediaFile: e.target.files[0],
                  })
                }
              />
              <p className="text-gray-500 font-medium">Add Media + </p>
            </div>
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-200 font-medium"
              placeholder="Link 🔗"
              value={knowledgeData.mediaUrl}
              onChange={(e) =>
                setKnowledgeData({
                  ...knowledgeData,
                  mediaUrl: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="w-full h-[2.5rem] flex justify-between items-center mt-8">
          <div
            onClick={() => onCancel()}
            className="w-[5rem] h-full rounded-md bg-red-500 flex items-center justify-center cursor-pointer shadow-md shadow-red-100"
          >
            <p>Cancel</p>
          </div>
          <div
            onClick={handleUpload}
            className="w-[9rem] h-full rounded-md bg-blue-500 flex items-center justify-center cursor-pointer shadow-md shadow-blue-100"
          >
            <p className="text-white font-medium">Upload Mentor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewKnowledge;
