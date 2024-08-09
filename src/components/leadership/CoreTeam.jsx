import { useState, useEffect } from "react";
import Sidebar from "../global/Sidebar";
import assets from "../../assets/assets";
import NewMentor from "./NewMentor";
import MobileSidebar from "../global/MobileSidebar";
import {
  db,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "../../firebase";
import { storage, ref, deleteObject } from "../../firebase";

const Mentor = () => {
  const [openAddnewMentor, setOpenAddnewMentor] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [editMentor, setEditMentor] = useState(null);

  const fetchMentors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "mentors"));
      const mentorsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMentors(mentorsList);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleAddMentor = (newMentor) => {
    try {
      setMentors((prevMentors) => [...prevMentors, newMentor]);
      fetchMentors();
    } catch (error) {
      console.error("Error adding mentor:", error);
    }
  };

  // const handleEditMentor = (mentor) => {
  //   setEditMentor(mentor);
  //   setOpenAddnewMentor(true);
  // };
  const handleEditMentor = async (mentor) => {
    try {
      await fetchMentors();
      setEditMentor(mentor);
      setOpenAddnewMentor(true);
    } catch (error) {
      console.error("Error handling edit mentor:", error);
    }
  };

  const handleUpdateMentor = async (updatedMentor) => {
    try {
      const mentorDocRef = doc(db, "mentors", updatedMentor.id);
      if (
        editMentor.profileImg &&
        updatedMentor.profileImg !== editMentor.profileImg
      ) {
        const oldImageRef = ref(storage, editMentor.profileImg);
        await deleteObject(oldImageRef);
        console.log("Old image deleted successfully");
      }

      await updateDoc(mentorDocRef, {
        ...updatedMentor,
        profileImg: updatedMentor.profileImg || "",
      });

      fetchMentors();
      setOpenAddnewMentor(false);
      setEditMentor(null);
    } catch (error) {
      console.error("Error updating mentor:", error);
    }
  };

  const handleDeleteMentor = async (mentor) => {
    try {
      if (window.confirm("Are you sure you want to delete this mentor?")) {
        if (mentor.profileImg) {
          console.log("Deleting image at path:", mentor.profileImg);
          const imageRef = ref(storage, mentor.profileImg);
          await deleteObject(imageRef)
            .then(() => {
              console.log("Image deleted successfully");
            })
            .catch((error) => {
              console.error("Error deleting image:", error);
            });
        }
        await deleteDoc(doc(db, "mentors", mentor.id));
        fetchMentors();
      }
    } catch (error) {
      console.error("Error deleting mentor:", error);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white">
      <Sidebar />
      <div className="relative p-4 overflow-x-scroll bg-white dashboard-content">
        {openAddnewMentor && (
          <NewMentor
            onCancel={() => {
              setOpenAddnewMentor(false);
              setEditMentor(null);
            }}
            onAddMentor={handleAddMentor}
            mentorToEdit={editMentor}
            onUpdateMentor={handleUpdateMentor}
          />
        )}
        {openSidebar && <MobileSidebar />}
        <div
          className={`w-full h-20 flex items-center justify-between ${
            openAddnewMentor && "blur-sm"
          }`}
        >
          <img
            src={assets.Img.Menu_Icon}
            alt="icon"
            className="object-contain opacity-100 w-7 h-7 lg:opacity-0"
            onClick={() => setOpenSidebar(true)}
          />
          <div className="flex items-center h-full gap-4 w-fit">
            <img
              src={assets.Img.Bg}
              alt="icon"
              className="object-cover rounded-full w-7 h-7"
            />
            <p className="text-[1.2rem] font-semibold text-blue-600">
              Test User
            </p>
          </div>
        </div>
        <div
          className={`w-full h-12 flex items-center justify-between ${
            openAddnewMentor && "blur-sm"
          }`}
        >
          <div className="h-full w-fit">
            <h1 className="font-bold text-[1.5rem]">Core Team</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div
          className={`w-full h-[calc(100%-3rem)] bg-white mt-4 p-2 ${
            openAddnewMentor && "blur-sm"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-8 h-fit md:mt-0">
            <div className="bg-[#edededde] w-[20rem] h-10 px-2 flex items-center gap-1 border rounded-md text-white border-blue-200">
              <img
                src={assets.Img.Search}
                alt="search"
                className="object-contain w-4 h-4"
              />
              <input
                type="text"
                placeholder="Find"
                className="flex-1 pl-2 placeholder-gray-400 bg-transparent border-none outline-none"
              />
            </div>
            <div
              onClick={() => setOpenAddnewMentor(true)}
              className="w-[11rem] h-10 flex items-center justify-center rounded-md bg-[#2d6acb] cursor-pointer font-medium text-white"
            >
              Add New Member
            </div>
          </div>
          <div className="min-w-fit w-full h-[calc(100%-4rem)] bg-gray-50 mt-4 rounded-lg flex flex-col gap-4">
            <div className="w-full h-10 flex justify-between gap-4 bg-[#eaeaea] px-4 rounded-t-md">
              <div className="w-[2rem] h-full flex gap-2 items-center text-black font-medium">
                <p>SI.No</p>
              </div>
              <div className="w-[10rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Person</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Job Title</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Leader Type</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Location</p>
              </div>
              <div className="w-[15rem] h-full overflow-hidden flex gap-2 items-center text-black font-medium">
                <p>Description</p>
              </div>
              <div className="w-[5rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Action</p>
              </div>
            </div>
            {mentors.map((mentor, index) => (
              <div
                key={`${mentor.id}-${index}`}
                className="flex items-center justify-between w-full h-12 gap-4 px-4"
              >
                <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{index + 1}</p>
                </div>
                <div className="w-[10rem] h-fit flex gap-2 items-center text-gray-500">
                  <img
                    src={mentor.profileImg || assets.Img.Bg}
                    alt="icon"
                    className="object-cover rounded-full w-7 h-7"
                  />
                  <p>{mentor.name}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{mentor.job}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{mentor.leaderType}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{mentor.location}</p>
                </div>
                <div className="w-[15rem] h-full overflow-hidden flex gap-2 items-center text-gray-500">
                  <p>{mentor.description}</p>
                </div>
                <div className="w-[5rem] h-fit flex gap-2 items-center">
                  <div
                    className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-blue-100 cursor-pointer flex items-center justify-center"
                    onClick={() => handleEditMentor(mentor)}
                  >
                    <img
                      src={assets.Img.edit}
                      alt="icon"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div
                    className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-red-100 cursor-pointer flex items-center justify-center"
                    onClick={() => handleDeleteMentor(mentor)}
                  >
                    <img
                      src={assets.Img.Delete}
                      alt="icon"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
