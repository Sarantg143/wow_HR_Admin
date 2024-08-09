import React, { useState, useEffect } from "react";
import NewKnowledge from "./NewKnowledge";
import Sidebar from "../global/Sidebar";
import assets from "../../assets/assets";
import MobileSidebar from "../global/MobileSidebar";
import { db, collection, getDocs, doc, deleteDoc, updateDoc } from "../../firebase";
import { storage, ref, deleteObject } from "../../firebase"; 

const KnowledgeHub = () => {
  const [openAddnewMentor, setopenAddnewMentor] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [knowledgeItems, setKnowledgeItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch knowledge items from Firestore
  const fetchKnowledgeItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "knowledge"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKnowledgeItems(items);
    } catch (error) {
      console.error("Error fetching knowledge items: ", error);
    }
  };

  useEffect(() => {
    fetchKnowledgeItems();
  }, []);

  // Handle deletion of a knowledge item
  const handleDelete = async (id, mediaUrl) => {
    try {
      await deleteDoc(doc(db, "knowledge", id));
      if (mediaUrl) {
        const storageRef = ref(storage, mediaUrl);
        await deleteObject(storageRef);
      }
      fetchKnowledgeItems(); // Refresh the list
    } catch (error) {
      console.error("Error deleting knowledge item: ", error);
    }
  };

  // Handle updating a knowledge item
  const handleUpdate = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, "knowledge", id), updatedData);
      fetchKnowledgeItems(); // Refresh the list
    } catch (error) {
      console.error("Error updating knowledge item: ", error);
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex">
      <Sidebar />
      <div className="dashboard-content bg-white p-4 relative overflow-x-scroll">
        {openAddnewMentor && (
          <NewKnowledge 
            onCancel={() => {
              setopenAddnewMentor(false);
              setSelectedItem(null);
            }}
            selectedItem={selectedItem}
            onSave={fetchKnowledgeItems}
          />
        )}
        {openSidebar && <MobileSidebar />}
        <div
          className={`w-full h-20 flex items-center justify-between ${openAddnewMentor && "blur-sm"}`}
        >
          <img
            src={assets.Img.Menu_Icon}
            alt="icon"
            className="w-7 h-7 opacity-100 object-contain lg:opacity-0"
            onClick={() => setOpenSidebar(true)}
          />
          <div className="w-fit h-full flex items-center gap-4">
            <img
              src={assets.Img.Bg}
              alt="icon"
              className="w-7 h-7 rounded-full object-cover"
            />
            <p className="text-[1.2rem] font-semibold text-blue-600">
              Test User
            </p>
          </div>
        </div>
        <div
          className={`w-full h-12 flex items-center justify-between ${openAddnewMentor && "blur-sm"}`}
        >
          <div className="w-fit h-full">
            <h1 className="font-bold text-[1.5rem]">Knowledge Hub</h1>
            <p>Lorem ipsum dolor sit Pamet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div
          className={`w-full h-[calc(100%-3rem)] bg-white mt-4 p-2 ${openAddnewMentor && "blur-sm"}`}
        >
          <div className="w-full h-10 flex justify-between items-center flex-wrap gap-4 mt-8 md:mt-0">
            <div className="bg-[#edededde] w-[20rem] h-[90%] px-2 flex items-center gap-1 border rounded-md text-white border-blue-200">
              <img
                src={assets.Img.Search}
                alt="search"
                className="w-4 h-4 object-contain"
              />
              <input
                type="text"
                placeholder="Find"
                className="flex-1 outline-none border-none pl-2 bg-transparent placeholder-gray-400"
              />
            </div>
            <div
              onClick={() => {
                setopenAddnewMentor(true);
                setSelectedItem(null); // Reset selectedItem for new entry
              }}
              className="w-[8rem] h-[100%] flex items-center justify-center rounded-md bg-[#3372d7] cursor-pointer font-medium text-white"
            >
              Add New
            </div>
          </div>
          <div className="min-w-fit w-full h-[calc(100%-4rem)] bg-gray-50 mt-16 md:mt-4 rounded-lg flex flex-col gap-4">
            <div className="w-full h-10 flex justify-between gap-4 bg-[#f4f4f4] px-4 rounded-t-md">
              <div className="w-[2rem] h-full flex gap-2 items-center text-black font-medium">
                <p>SI.No</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Type</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Source Type</p>
              </div>
              <div className="w-[30rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Description</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Image</p>
              </div>
              <div className="w-[5rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Action</p>
              </div>
            </div>
            {knowledgeItems.map((item, index) => (
              <div key={item.id} className="w-full h-12 flex justify-between px-4 items-center">
                <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{index + 1}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{item.type}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{item.sourceType}</p>
                </div>
                <div className="w-[30rem] h-full overflow-hidden flex gap-4 items-center text-gray-500">
                  <p className="w-full h-full text-[12px] text-justify ">
                    {item.description}
                  </p>
                </div>
                <div className="w-[8rem] h-full flex gap-2 items-center text-gray-500">
                  {item.mediaUrl ? (
                    item.sourceType === "image" ? (
                      <img
                        src={item.mediaUrl}
                        alt="media"
                        className="w-full h-[90%] object-cover rounded-md"
                      />
                    ) : (
                      <video
                        src={item.mediaUrl}
                        className="w-full h-[90%] object-cover rounded-md"
                        controls
                      />
                    )
                  ) : (
                    <p>No Media</p>
                  )}
                </div>
                <div className="w-[5rem] h-fit flex gap-1 items-center justify-between">
                  <div
                    className="w-[2rem] h-8  bg-gray-100 hover:bg-blue-100 rounded-md cursor-pointer flex items-center justify-center"
                    onClick={() => {
                      setopenAddnewMentor(true);
                      setSelectedItem(item); // Pass the item data to the NewKnowledge component for editing
                    }}
                  >
                    <img
                      src={assets.Img.edit}
                      alt="icon"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div
                    className="w-[2rem] h-8  cursor-pointer bg-gray-100 rounded-md hover:bg-red-100  flex items-center justify-center"
                    onClick={() => handleDelete(item.id, item.mediaUrl)}
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

export default KnowledgeHub;
