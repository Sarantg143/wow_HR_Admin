import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const MobileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatch = (path) => {
    if (path === location.pathname) return true;
    return false;
  };

  return (
    <div className="absolute top-0 left-0 z-20 w-[14rem] h-full bg-gray-100  flex-col gap-5 items-center p-1 flex lg:hidden">
     <div className="w-full h-[5rem] flex items-center justify-start" onClick={() => navigate("/")}>
        <img src={assets.Img.WowHRLogo} alt="logo" className="w-[70%] h-[40%] object-contain" />
      </div>
      <div
        onClick={() => navigate("/")}
        className={`w-full h-9 cursor-pointer ${
          pathMatch("/") && "bg-[#2984FF]"
        } p-1 rounded-lg flex items-center`}
      >
        <img
          src={
            pathMatch("/") ? assets.Img.Leader_white : assets.Img.Leader_gray
          }
          alt="icon"
          className="w-7 h-5 object-contain"
        />
        <p
          className={`${
            pathMatch("/") ? "text-white" : "text-gray-500"
          } text-[1rem]`}
        >
          LeaderShip
        </p>
      </div>
      <div
        onClick={() => navigate("/testimonials")}
        className={`w-full h-9 cursor-pointer ${
          pathMatch("/testimonials") && "bg-[#2984FF]"
        }  p-1 rounded-lg flex items-center `}
      >
        <img
          src={
            pathMatch("/")
              ? assets.Img.Testimonial_white
              : assets.Img.Testimonial_gray
          }
          alt="icon"
          className="w-7 h-5 object-contain"
        />
        <p
          className={`${
            pathMatch("/testimonials") ? "text-white" : "text-gray-500"
          } text-[1rem]  `}
        >
          Testimonials
        </p>
      </div>
      <div
        onClick={() => navigate("/events")}
        className={`w-full h-9 cursor-pointer ${
          pathMatch("/events") && "bg-[#2984FF]"
        }  p-1 rounded-lg flex items-center `}
      >
        <img
          src={
            pathMatch("/")
              ? assets.Img.Calender_white
              : assets.Img.Calender_gray
          }
          alt="icon"
          className="w-7 h-5 object-contain"
        />
        <p
          className={`${
            pathMatch("/events") ? "text-white" : "text-gray-500"
          } text-[1rem]`}
        >
          Events
        </p>
      </div>
      <div
        onClick={() => navigate("/knowledgeHub")}
        className={`w-full h-9 cursor-pointer ${
          pathMatch("/knowledgeHub") && "bg-[#2984FF]"
        }  p-1 rounded-lg flex items-center`}
      >
        <img
          src={
            pathMatch("/")
              ? assets.Img.Knowledge_white
              : assets.Img.Knowledge_gray
          }
          alt="icon"
          className="w-7 h-5 object-contain"
        />
        <p
          className={`${
            pathMatch("/knowledgeHub") ? "text-white" : "text-gray-500"
          } text-[1rem]`}
        >
          Knowledge Hub
        </p>
      </div>
    </div>
  );
};

export default MobileSidebar;
