import { uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "@firebase/firestore";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref } from "firebase/storage";

const NewKnowledge = ({
  onCancel,
  edit,
  setedit,
  defaultEditData,
  setDefaultEditData,
}) => {
  const [knowledgeData, setKnowledgeData] = useState({
    type: "",
    sourceType: "",
    description: "",
    mediaFile: null,
    mediaUrl: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isMediaChanged, setIsMediaChanged] = useState(false);

  useEffect(() => {
    if (knowledgeData.mediaFile && knowledgeData.sourceType && isMediaChanged) {
      const file = knowledgeData.mediaFile;

      if (file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (knowledgeData.sourceType === "image") {
            setImageUrl(e.target.result);
          } else if (knowledgeData.sourceType === "video") {
            setVideoUrl(e.target.result);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }, [knowledgeData.mediaFile, knowledgeData.sourceType, isMediaChanged]);

  useEffect(() => {
    if (edit) {
      setKnowledgeData(defaultEditData);
    }
  }, [edit, defaultEditData]);

  const upload = async () => {
    let url = null;

    if (knowledgeData.mediaFile && !edit) {
      try {
        const mediaRef = ref(
          storage,
          `knowledge/${knowledgeData.mediaFile.name}`
        );
        await uploadBytes(mediaRef, knowledgeData.mediaFile);
        url = await getDownloadURL(mediaRef);
        console.log("Media uploaded to:", url);
      } catch (e) {
        console.log(e);
      }
    }

    if (!edit) {
      const eventRef = collection(db, "knowledge");
      try {
        await addDoc(eventRef, { ...knowledgeData, mediaFile: url });
        console.log("Added to database");
      } catch (e) {
        console.log(e);
      }
    } else {
      if (isMediaChanged) {
        try {
          const mediaRef = ref(
            storage,
            `knowledge/${knowledgeData.mediaFile.name}`
          );
          await uploadBytes(mediaRef, knowledgeData.mediaFile);
          url = await getDownloadURL(mediaRef);
          setKnowledgeData((prevData) => ({ ...prevData, mediaFile: url }));
          console.log("Media updated in:", url);
        } catch (e) {
          console.log(e);
        }
      }

      const docRef = doc(db, "knowledge", knowledgeData.id);
      const fieldsToExclude = !isMediaChanged ? ["mediaFile", "id"] : ["id"];
      const knowledgeDataToUpdate = Object.fromEntries(
        Object.entries({ ...knowledgeData, mediaFile: url }).filter(
          ([key]) => !fieldsToExclude.includes(key)
        )
      );

      try {
        await updateDoc(docRef, knowledgeDataToUpdate);
        console.log("Document updated:", knowledgeDataToUpdate);
        onCancel();
      } catch (e) {
        console.log(e);
      }
    }
    onCancel();
  };

  return (
    <div className="absolute w-screen h-screen lg:w-full lg:h-full z-10 top-0 left-0 bg-[#50525580] flex justify-center items-center">
      <div className="w-full lg:w-[90%] h-full md:h-fit bg-white rounded-md p-4 md:p-8">
        <div className="flex flex-wrap justify-between w-full gap-4 mt-12 h-fit">
          <div className="w-full md:w-[50%] h-fit flex flex-col gap-7 ">
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Type"
              value={knowledgeData.type}
              onChange={(e) =>
                setKnowledgeData({ ...knowledgeData, type: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
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
                className="absolute top-0 left-0 object-cover w-full h-full rounded-md z-1"
              />
            ) : (
              <p className="font-medium text-gray-500">Media Preview 🖼️</p>
            )}
            {knowledgeData.mediaFile &&
              knowledgeData.sourceType === "video" && (
                <video
                  src={videoUrl}
                  alt="video"
                  className="absolute top-0 left-0 object-cover w-full h-full rounded-md z-1"
                  controls
                />
              )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full h-fit mt-9 md:mt-0">
          <textarea
            className="w-full md:w-[50%] h-[15rem] outline-none border-none rounded-md bg-slate-300 p-3"
            placeholder="Description"
            value={knowledgeData.description}
            onChange={(e) =>
              setKnowledgeData({
                ...knowledgeData,
                description: e.target.value,
              })
            }
          />
          <div className="w-full md:w-[40%] h-full flex flex-col gap-5 mt-5">
            <div className="relative flex items-center justify-center w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-400">
              <input
                type="file"
                accept={
                  knowledgeData.sourceType === "image" ? "image/*" : "video/*"
                }
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setKnowledgeData((prevData) => ({
                      ...prevData,
                      mediaFile: file,
                    }));
                    setIsMediaChanged(true);
                  }
                }}
              />
              <p className="font-medium text-gray-500">Add Media + </p>
            </div>
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-200"
              placeholder="Link 🔗"
              value={knowledgeData.mediaUrl}
              onChange={(e) =>
                setKnowledgeData({ ...knowledgeData, mediaUrl: e.target.value })
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
            className="w-[9rem] h-full rounded-md bg-blue-500 flex items-center justify-center cursor-pointer shadow-md shadow-blue-100"
            onClick={() => upload()}
          >
            <p className="font-medium text-white">Upload</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewKnowledge;
