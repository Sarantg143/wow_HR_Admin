import React, { useEffect, useState } from "react";
import { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL, doc, updateDoc } from "../../firebase";

const NewMentor = ({ onCancel, onAddMentor, mentorToEdit }) => {
  const [mentorData, setMentorData] = useState({
    name: "",
    job: "",
    leaderType: "",
    location: "",
    profileImg: null,
    description: "",
    linkedIn: "",
    github: "",
    twitter: "",
    instagram: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (mentorToEdit) {
      setMentorData(mentorToEdit);
      setImageUrl(mentorToEdit.profileImg || "");
    }
  }, [mentorToEdit]);

  const handleInput = (type, value) => {
    setMentorData({ ...mentorData, [type]: value });
  };

  useEffect(() => {
    if (mentorData.profileImg && typeof mentorData.profileImg === 'object') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(mentorData.profileImg);
    }
  }, [mentorData.profileImg]);

  const handleUploadMentor = async () => {
    try {
      let uploadedImageUrl = imageUrl;

      if (mentorData.profileImg && typeof mentorData.profileImg === 'object') {
        const imageRef = ref(storage, `mentors/${mentorData.profileImg.name}`);
        const snapshot = await uploadBytes(imageRef, mentorData.profileImg);
        uploadedImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (mentorToEdit) {
        await updateDoc(doc(db, "mentors", mentorToEdit.id), {
          ...mentorData,
          profileImg: uploadedImageUrl,
        });
        onAddMentor({ id: mentorToEdit.id, ...mentorData, profileImg: uploadedImageUrl });
      } else {
        const docRef = await addDoc(collection(db, "mentors"), {
          ...mentorData,
          profileImg: uploadedImageUrl,
        });
        onAddMentor({ id: docRef.id, ...mentorData, profileImg: uploadedImageUrl });
      }

      console.log("Mentor added/updated successfully");
      onCancel();
    } catch (error) {
      console.error("Error uploading mentor:", error);
    }
  };
  return (
    <div className="absolute z-10 top-0 left-0 w-screen h-screen lg:w-full lg:h-full bg-[#50525580] flex justify-center items-center">
      <div className="w-full md:w-[80%] h-full md:h-fit bg-white rounded-md p-4 md:p-8">
        <div className="w-full h-fit flex gap-4 justify-between flex-wrap mt-12 md:mt-0">
          <div className="w-full md:w-[50%] h-full flex flex-col gap-4 min-w-[10rem]">
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-300 font-medium"
              placeholder="Name *"
              value={mentorData.name}
              onChange={(e) => handleInput("name", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-300 font-medium"
              placeholder="Job *"
              value={mentorData.job}
              onChange={(e) => handleInput("job", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-300 font-medium"
              placeholder="Leader Type *"
              value={mentorData.leaderType}
              onChange={(e) => handleInput("leaderType", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-300 font-medium"
              placeholder="Location *"
              value={mentorData.location}
              onChange={(e) => handleInput("location", e.target.value)}
            />
          </div>
          <div className="w-full md:w-[40%] h-[10rem] rounded-md bg-slate-300 relative flex justify-center items-center">
            <input
              type="file"
              accept=".jpg,.png"
              className="w-full h-full absolute top-0 left-0 opacity-0 z-10 cursor-pointer"
              onChange={(e) =>
                setMentorData({
                  ...mentorData,
                  profileImg: e.target.files[0],
                })
              }
            />
            {mentorData.profileImg ? (
              <img
                src={imageUrl}
                alt="image"
                className="absolute w-full h-full top-0 left-0 z-1 rounded-md object-cover"
              />
            ) : (
              <p className="text-gray-500 font-medium">Add Profile +</p>
            )}
          </div>
        </div>
        <div className="w-full flex justify-between mt-8 flex-wrap">
          <textarea
            className="w-full md:w-[50%] h-[15rem] outline-none border-none rounded-md bg-slate-300 p-3"
            placeholder="description *"
            value={mentorData.description}
            onChange={(e) => handleInput("description", e.target.value)}
          />
          <div className="w-full md:w-[40%] h-full flex flex-col gap-5 mt-5">
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-200 font-medium"
              placeholder="LinkedIn 🔗"
              value={mentorData.linkedIn}
              onChange={(e) => handleInput("linkedIn", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-200 font-medium"
              placeholder="Github 🔗"
              value={mentorData.github}
              onChange={(e) => handleInput("github", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-200 font-medium"
              placeholder="Twitter 🔗"
              value={mentorData.twitter}
              onChange={(e) => handleInput("twitter", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-200 font-medium"
              placeholder="Instagram 🔗"
              value={mentorData.instagram}
              onChange={(e) => handleInput("instagram", e.target.value)}
            />
          </div>
        </div>
        <div className="w-full h-[2.5rem] flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => onCancel()}
            className="w-[5rem] h-full rounded-md bg-red-500 flex items-center justify-center cursor-pointer shadow-md shadow-red-100"
          >
            <p>Cancel</p>
          </button>
          <button
            type="button"
            onClick={() => handleUploadMentor()}
            className="w-[9rem] h-full rounded-md bg-blue-500 flex items-center justify-center cursor-pointer shadow-md shadow-blue-100"
          >
            <p className="text-white font-medium">Upload Mentor</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMentor;
