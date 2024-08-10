import { useState, useEffect } from "react";
import NewEvents from "./NewEvents";
import assets from "../../assets/assets";
import Sidebar from "../global/Sidebar";
import MobileSidebar from "../global/MobileSidebar";
import { collection, getDocs, doc, deleteDoc } from "@firebase/firestore";
import { db } from "../../firebase.js";

const Events = () => {
  const [openAddnewMentor, setOpenAddnewMentor] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [edit, setEdit] = useState(false);
  const [events, setEvents] = useState([]);
  const eventRef = collection(db, "events");

  const [defaultEditData, setDefaultEditData] = useState({
    type: "",
    image: null,
    description: "",
    date: null,
  });

  // Function to fetch events
  const fetchEvents = async () => {
    const newData = await getDocs(eventRef);
    setEvents(newData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvent = async (event_id) => {
    try {
      if (window.confirm("Are you sure you want to delete this event?")) {
        const docRef = doc(db, "events", event_id);
        await deleteDoc(docRef);
        console.log("Event deleted");
        fetchEvents(); // Refresh the list after deletion
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white">
      <Sidebar />
      <div className="relative p-4 overflow-x-scroll bg-white dashboard-content">
        {openAddnewMentor && (
          <NewEvents
            edit={edit}
            setEdit={setEdit}
            defaultEditData={defaultEditData}
            setDefaultEditData={setDefaultEditData}
            onCancel={() => {
              setOpenAddnewMentor(false);
              setEdit(false);
              setDefaultEditData({
                id: null,
                type: "",
                image: null,
                description: "",
                date: null,
              });
              fetchEvents(); // Refresh the list after adding or editing
            }}
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
            onClick={() => {
              setOpenSidebar(true);
            }}
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
            <h1 className="font-bold text-[1.5rem]">Events</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div
          className={`w-full h-[calc(100%-3rem)] bg-white mt-4 p-2 ${
            openAddnewMentor && "blur-sm"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between w-full h-10 gap-4 mt-8 md:mt-0">
            <div className="bg-[#edededde] w-[20rem] h-[90%] px-2 flex items-center gap-1 border rounded-md text-white border-blue-200">
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
              className="w-[10rem] h-[100%] flex items-center justify-center rounded-md bg-[#3372d7] cursor-pointer font-medium text-white"
            >
              Add New Event
            </div>
          </div>
          <div className="min-w-fit w-full h-[calc(100%-4rem)] bg-gray-50 mt-16 md:mt-4 rounded-lg flex flex-col gap-4">
            <div className="w-full h-10 flex justify-between gap-4 bg-[#eaeaea] px-4 rounded-t-md">
              <div className="w-[2rem] h-full flex gap-2 items-center text-black font-medium">
                <p>SI.No</p>
              </div>
              <div className="w-[10rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Date</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Event Type</p>
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

            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between w-full h-12 px-4"
              >
                <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>01</p>
                </div>
                <div className="w-[10rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{event.date}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{event.type}</p>
                </div>
                <div className="w-[30rem] h-full overflow-hidden flex gap-4 items-center text-gray-500">
                  <p className="w-full h-full text-[12px] text-justify">
                    {event.description}
                  </p>
                </div>
                <div className="w-[8rem] h-full flex gap-2 items-center text-black">
                  <img
                    src={event.image}
                    alt="event"
                    className="w-full h-[90%] object-cover rounded-md"
                  />
                </div>
                <div className="w-[5rem] h-fit flex gap-2 items-center justify-between">
                  <div
                    className="w-[3rem] h-8 bg-gray-100 hover:bg-blue-100 rounded-md cursor-pointer flex items-center justify-center"
                    onClick={() => {
                      setOpenAddnewMentor(true);
                      setEdit(true);
                      setDefaultEditData({
                        id: event.id,
                        type: event.type,
                        image: event.image,
                        description: event.description,
                        date: event.date,
                      });
                    }}
                  >
                    <img
                      src={assets.Img.edit}
                      alt="edit"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div
                    className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-red-100 cursor-pointer flex items-center justify-center"
                    onClick={() => deleteEvent(event.id)}
                  >
                    <img
                      src={assets.Img.Delete}
                      alt="delete"
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

export default Events;
