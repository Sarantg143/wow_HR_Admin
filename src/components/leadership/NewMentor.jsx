import React, { useEffect, useState } from "react";
import {
  db,
  storage,
  collection,
  addDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  doc,
  updateDoc,
} from "../../firebase";

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

  const resetMentorData = () => {
    setMentorData({
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
    setImageUrl(""); // Reset the image URL
  };

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
    if (mentorData.profileImg && typeof mentorData.profileImg === "object") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(mentorData.profileImg);
    }
  }, [mentorData.profileImg]);

  const handleUploadMentor = async () => {
    if (
      !mentorData.name ||
      !mentorData.job ||
      !mentorData.leaderType ||
      !mentorData.location ||
      !mentorData.description ||
      !mentorData.profileImg
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      let uploadedImageUrl = imageUrl;

      if (mentorData.profileImg && typeof mentorData.profileImg === "object") {
        const imageRef = ref(storage, `mentors/${mentorData.profileImg.name}`);
        const snapshot = await uploadBytes(imageRef, mentorData.profileImg);
        uploadedImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (mentorToEdit) {
        await updateDoc(doc(db, "mentors", mentorToEdit.id), {
          ...mentorData,
          profileImg: uploadedImageUrl,
        });
        onAddMentor({
          id: mentorToEdit.id,
          ...mentorData,
          profileImg: uploadedImageUrl,
        });
      } else {
        const docRef = await addDoc(collection(db, "mentors"), {
          ...mentorData,
          profileImg: uploadedImageUrl,
        });
        onAddMentor({
          id: docRef.id,
          ...mentorData,
          profileImg: uploadedImageUrl,
        });
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
        <div className="flex flex-wrap justify-between w-full gap-4 mt-12 h-fit md:mt-0">
          <div className="w-full md:w-[50%] h-full flex flex-col gap-4 min-w-[10rem]">
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Name *"
              value={mentorData.name}
              onChange={(e) => handleInput("name", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Job *"
              value={mentorData.job}
              onChange={(e) => handleInput("job", e.target.value)}
            />
            {/* <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Leader Type *"
              value={mentorData.leaderType}
              onChange={(e) => handleInput("leaderType", e.target.value)}
            /> */}

            <select
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Leader Type *"
              value={mentorData.leaderType}
              onChange={(e) => handleInput("leaderType", e.target.value)}
              // onChange={(e) =>
              //   setEventData({ ...eventData, type: e.target.value })
              // }
            >
              <option value="" disabled hidden>
                Select Type
              </option>
              <option value="Mentor">Mentor</option>
              <option value="Core Team">Core Team</option>
            </select>
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Location *"
              value={mentorData.location}
              onChange={(e) => handleInput("location", e.target.value)}
            />
          </div>
          <div className="w-full md:w-[40%] h-[10rem] rounded-md bg-slate-300 relative flex justify-center items-center">
            <input
              type="file"
              accept=".jpg,.png"
              className="absolute top-0 left-0 z-10 w-full h-full opacity-0 cursor-pointer"
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
                className="absolute top-0 left-0 object-cover w-full h-full rounded-md z-1"
              />
            ) : (
              <p className="font-medium text-gray-500">Add Profile +</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between w-full mt-8">
          <textarea
            className="w-full md:w-[50%] h-[15rem] outline-none border-none rounded-md bg-slate-300 p-3"
            placeholder="description *"
            value={mentorData.description}
            onChange={(e) => handleInput("description", e.target.value)}
          />
          <div className="w-full md:w-[40%] h-full flex flex-col gap-5 mt-5">
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-200"
              placeholder="LinkedIn 🔗"
              value={mentorData.linkedIn}
              onChange={(e) => handleInput("linkedIn", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-200"
              placeholder="Github 🔗"
              value={mentorData.github}
              onChange={(e) => handleInput("github", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-200"
              placeholder="Twitter 🔗"
              value={mentorData.twitter}
              onChange={(e) => handleInput("twitter", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-200"
              placeholder="Instagram 🔗"
              value={mentorData.instagram}
              onChange={(e) => handleInput("instagram", e.target.value)}
            />
          </div>
        </div>
        <div className="w-full h-[2.5rem] flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={() => {
              onCancel();
              resetMentorData();
            }}
            className="w-[5rem] h-full rounded-md bg-red-500 flex items-center justify-center cursor-pointer shadow-md shadow-red-100"
          >
            <p>Cancel</p>
          </button>
          <button
            type="button"
            onClick={() => handleUploadMentor()}
            className="w-[9rem] h-full rounded-md bg-blue-500 flex items-center justify-center cursor-pointer shadow-md shadow-blue-100"
          >
            <p className="font-medium text-white">Upload Mentor</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMentor;
