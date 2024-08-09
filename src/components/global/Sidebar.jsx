import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatch = (path) => {
    if (path === location.pathname) return true;
    return false;
  };

  return (
    <div className="hidden w-[15rem] h-full bg-blue-100  flex-col gap-5 items-center p-4 lg:flex">
      <div
        className="w-full h-[5rem] flex items-center justify-start"
        onClick={() => navigate("/")}
      >
        <img
          src={assets.Img.WowHRLogo}
          alt="logo"
          className="w-[70%] h-[40%] object-contain"
        />
      </div>
      <div
        onClick={() => navigate("/leaders")}
        className={`w-full h-11 cursor-pointer ${
          pathMatch("/leaders") && "bg-[#2984FF]"
        } p-1 rounded-lg flex  items-center pl-4`}
      >
        <img
          src={
            pathMatch("/leaders") ? assets.Img.Leader_white : assets.Img.Leader_gray
          }
          alt="icon"
          className="w-10 h-7 object-contain"
        />
        <p className={`${pathMatch("/leaders") ? "text-white" : "text-gray-500"}`}>
          LeaderShip
        </p>
      </div>
      <div
        onClick={() => navigate("/testimonials")}
        className={`w-full h-11 cursor-pointer ${
          pathMatch("/testimonials") && "bg-[#2984FF]"
        }  p-1 rounded-lg flex items-center pl-4 `}
      >
        <img
          src={
            pathMatch("/testimonials")
              ? assets.Img.Testimonial_white
              : assets.Img.Testimonial_gray
          }
          alt="icon"
          className="w-10 h-7 object-contain"
        />
        <p
          className={`${
            pathMatch("/testimonials") ? "text-white" : "text-gray-500"
          }`}
        >
          Testimonials
        </p>
      </div>
      <div
        onClick={() => navigate("/events")}
        className={`w-full h-11 cursor-pointer ${
          pathMatch("/events") && "bg-[#2984FF]"
        }  p-1 rounded-lg flex items-center pl-4 `}
      >
        <img
          src={
            pathMatch("/events")
              ? assets.Img.Calender_white
              : assets.Img.Calender_gray
          }
          alt="icon"
          className="w-10 h-7 object-contain"
        />
        <p
          className={`${pathMatch("/events") ? "text-white" : "text-gray-500"}`}
        >
          Events
        </p>
      </div>
      <div
        onClick={() => navigate("/knowledgeHub")}
        className={`w-full h-11 cursor-pointer ${
          pathMatch("/knowledgeHub") && "bg-[#2984FF]"
        }  p-1 rounded-lg flex items-center pl-4`}
      >
        <img
          src={
            pathMatch("/knowledgeHub")
              ? assets.Img.Knowledge_white
              : assets.Img.Knowledge_gray
          }
          alt="icon"
          className="w-10 h-7 object-contain"
        />
        <p
          className={`${
            pathMatch("/knowledgeHub") ? "text-white" : "text-gray-500"
          }`}
        >
          Knowledge Hub
        </p>
      </div>
    </div>
  );
};

export default Sidebar;