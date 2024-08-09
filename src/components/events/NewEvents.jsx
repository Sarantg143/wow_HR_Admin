import { StaticDatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL, doc, updateDoc } from "../../firebase";


const NewEvents = ({ onCancel }) => {
  const [eventData, setEventData] = useState({
    type: "",
    image: null,
    description: "",
    date: null,
  });

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (eventData.image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(eventData.image);
    }
  }, [eventData.image]);

  const addDate = (dateData) => {
    const formattedDate = dayjs(dateData).format("DD MMM YYYY");
    setEventData({ ...eventData, date: formattedDate });
  };

  const upload = () => {
    console.log(eventData);
  };

  return (
    <div className="absolute  z-10 top-0 left-0 w-screen h-screen lg:w-full lg:h-full bg-[#50525580] flex justify-center items-center">
      <div className="w-full md:w-[80%] h-full md:h-fit bg-white rounded-md p-4 md:p-8">
        <div className="w-full h-fit flex gap-4 justify-between flex-wrap mt-12 md:mt-0">
          <div className="w-full md:w-[50%] h-full flex flex-col gap-4  min-w-[10rem]">
            <input
              type="text"
              className="w-full h-10 pl-2 rounded-md border-none outline-none bg-slate-300 font-medium "
              placeholder="Event Type"
              value={eventData.type}
              onChange={(e) =>
                setEventData({ ...eventData, type: e.target.value })
              }
            />

            <div className="w-[full] h-[10rem] rounded-md bg-slate-300 relative flex justify-center items-center">
              <input
                type="file"
                accept=".jpg,.png"
                className="w-full h-full absolute top-0 left-0 z-10 opacity-0 cursor-pointer"
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    image: e.target.files[0],
                  })
                }
              />
              {eventData.image ? (
                <img
                  src={imageUrl}
                  alt="image"
                  className="absolute w-full h-full top-0 left-0 z-1 rounded-md object-cover"
                />
              ) : (
                <p className="text-gray-500 font-medium">Add Image + </p>
              )}
            </div>
            <div className="w-full flex justify-between">
              <textarea
                className="w-[100%] h-[15rem] outline-none border-none rounded-md bg-slate-300 p-3 mt-4"
                placeholder="description"
                value={eventData.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full md:w-[40%] min-w[10rem]  h-fit rounded-md  relative">
            <StaticDatePicker
              sx={{
                minWidth: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
                "&.css-przs87-MuiPickersLayout-root": {
                  display: "none",
                },
              }}
              onChange={(e) => addDate(e)}
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
          <div className="w-[9rem] h-full rounded-md bg-blue-500 flex items-center justify-center cursor-pointer shadow-md shadow-blue-100">
            <p className="text-white font-medium">Upload Event</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvents;
