import React, { useState } from "react";
import NewEvents from "./NewEvents";
import assets from "../../assets/assets";
import Sidebar from "../global/Sidebar";
import MobileSidebar from "../global/MobileSidebar";

const Events = () => {
  const [openAddnewMentor, setopenAddnewMentor] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="w-screen h-screen bg-white flex ">
      <Sidebar />
      <div className="dashboard-content bg-white p-4 relative overflow-x-scroll  ">
        {openAddnewMentor && (
          <NewEvents onCancel={() => setopenAddnewMentor(false)} />
        )}
        {openSidebar && <MobileSidebar />}
        <div
          className={`w-full h-20 flex items-center justify-between  ${
            openAddnewMentor && "blur-sm"
          }`}
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
          className={`w-full h-12 flex items-center justify-between ${
            openAddnewMentor && "blur-sm"
          }`}
        >
          <div className="w-fit h-full">
            <h1 className="font-bold text-[1.5rem] ">Events</h1>
            <p>Lorem ipsum dolor sit Pamet consectetur adipisicing elit.</p>
          </div>
        </div>
        <div
          className={`w-full h-[calc(100%-3rem)] bg-white mt-4 p-2 ${
            openAddnewMentor && "blur-sm"
          } `}
        >
          <div className="w-full h-10 flex justify-between items-center flex-wrap gap-4 mt-8 md:mt-0 ">
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
              onClick={() => setopenAddnewMentor(true)}
              className=" w-[10rem] h-[100%] flex items-center justify-center rounded-md bg-[#3372d7] cursor-pointer font-medium text-white"
            >
              Add New Event
            </div>
          </div>
          <div className="min-w-fit w-full h-[calc(100%-4rem)] bg-gray-50 mt-16  md:mt-4  rounded-lg flex flex-col gap-4 ">
            <div className="w-full h-10 flex justify-between gap-4 bg-[#eaeaea] px-4 rounded-t-md ">
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
            <div className="w-full h-12 flex justify-between px-4 items-center">
              <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                <p>01</p>
              </div>
              <div className="w-[10rem] h-fit flex gap-2 items-center text-gray-500">
                <p>11 dec 2024</p>
              </div>
              <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                <p>event</p>
              </div>
              <div className="w-[30rem] h-full overflow-hidden flex gap-4 items-center text-gray-500">
                <p className="w-full h-full text-[12px] text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate quo ipsa dignissimos, quos itaque rem quisquam
                  distinctio, molestiae autem ...
                </p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black">
                <img
                  src={assets.Img.Bg}
                  alt="icon"
                  className="w-full h-[90%] object-cover rounded-md"
                />
              </div>
              <div className="w-[5rem] h-fit flex gap-2 items-center justify-between ">
                <div className="w-[3rem] h-8 bg-gray-100 hover:bg-blue-100 rounded-md cursor-pointer flex items-center justify-center ">
                  <img
                    src={assets.Img.edit}
                    onClick={() => setopenAddnewMentor(true)}
                    alt="icon"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-red-100 cursor-pointer  flex items-center justify-center ">
                  <img
                    src={assets.Img.Delete}
                    alt="icon"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-12 flex justify-between px-4 items-center">
              <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                <p>01</p>
              </div>
              <div className="w-[10rem] h-fit flex gap-2 items-center text-gray-500">
                <p>11 dec 2024</p>
              </div>
              <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                <p>event</p>
              </div>
              <div className="w-[30rem] h-full overflow-hidden flex gap-4 items-center text-gray-500">
                <p className="w-full h-full text-[12px] text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate quo ipsa dignissimos, quos itaque rem quisquam
                  distinctio, molestiae autem ...
                </p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black">
                <img
                  src={assets.Img.Bg}
                  alt="icon"
                  className="w-full h-[90%] object-cover rounded-md"
                />
              </div>
              <div className="w-[5rem] h-fit flex gap-2 items-center justify-between ">
                <div className="w-[3rem] h-8 bg-gray-100 hover:bg-blue-100 rounded-md cursor-pointer flex items-center justify-center ">
                  <img
                    src={assets.Img.edit}
                    onClick={() => setopenAddnewMentor(true)}
                    alt="icon"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-red-100 cursor-pointer  flex items-center justify-center ">
                  <img
                    src={assets.Img.Delete}
                    alt="icon"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-12 flex justify-between px-4 items-center">
              <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                <p>01</p>
              </div>
              <div className="w-[10rem] h-fit flex gap-2 items-center text-gray-500">
                <p>11 dec 2024</p>
              </div>
              <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                <p>event</p>
              </div>
              <div className="w-[30rem] h-full overflow-hidden flex gap-4 items-center text-gray-500">
                <p className="w-full h-full text-[12px] text-justify ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cupiditate quo ipsa dignissimos, quos itaque rem quisquam
                  distinctio, molestiae autem ...
                </p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black">
                <img
                  src={assets.Img.Bg}
                  alt="icon"
                  className="w-full h-[90%] object-cover rounded-md"
                />
              </div>
              <div className="w-[5rem] h-fit flex gap-2 items-center justify-between ">
                <div className="w-[3rem] h-8 bg-gray-100 hover:bg-blue-100 rounded-md cursor-pointer flex items-center justify-center ">
                  <img
                    src={assets.Img.edit}
                    onClick={() => setopenAddnewMentor(true)}
                    alt="icon"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-red-100 cursor-pointer  flex items-center justify-center ">
                  <img
                    src={assets.Img.Delete}
                    alt="icon"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
