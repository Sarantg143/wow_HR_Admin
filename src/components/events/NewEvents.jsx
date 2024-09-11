import { StaticDatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { db, storage } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const NewEvents = ({
  onCancel,
  edit,
  setedit,
  defaultEditData,
  setDefaultEditData,
}) => {
  const [eventData, setEventData] = useState({
    type: "",
    image: null,
    description: "",
    date: null,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);

  useEffect(() => {
    if (edit) {
      // Populate the fields with defaultEditData if in edit mode
      setEventData(defaultEditData);
      if (typeof defaultEditData.image === "string" && !isImageChanged) {
        setImageUrl(defaultEditData.image);
      }
    } else {
      // Clear the preview and reset state when adding a new event
      setEventData({
        type: "",
        image: null,
        description: "",
        date: null,
      });
      setImageUrl("");
      setIsImageChanged(false);
    }
  }, [edit, defaultEditData]);

  useEffect(() => {
    if (eventData.image && isImageChanged) {
      // When a new image is selected, update the preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(eventData.image);
    }
  }, [eventData.image, isImageChanged]);

  const addDate = (dateData) => {
    const formattedDate = dayjs(dateData).format("DD MMM YYYY");
    setEventData({ ...eventData, date: formattedDate });
  };

  // const upload = async () => {
  //   let url = eventData.image;

  //   // Upload a new image if `isImageChanged` is true
  //   if (eventData.image && isImageChanged) {
  //     try {
  //       const imageRef = ref(storage, `events/${eventData.image.name}`);
  //       await uploadBytes(imageRef, eventData.image);
  //       url = await getDownloadURL(imageRef);
  //       console.log("Image uploaded:", url);
  //     } catch (e) {
  //       console.log(e);
  //       return; // Exit the function if there's an error during image upload
  //     }
  //   }

  //   try {
  //     if (!edit) {
  //       // Adding a new event
  //       const eventRef = collection(db, "events");
  //       await addDoc(eventRef, { ...eventData, image: url });
  //       console.log("Event added to DB");
  //     } else {
  //       // Editing an existing event
  //       const docs = doc(db, "events", eventData.id);
  //       const eventDataToUpdate = { ...eventData, image: url };
  //       delete eventDataToUpdate.id;

  //       await updateDoc(docs, eventDataToUpdate);
  //       console.log("Event updated successfully");
  //     }
  //     onCancel(); // Close the modal after successful upload or update
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const upload = async () => {
    // Validate the form fields
    if (
      !eventData.type ||
      !eventData.description ||
      !eventData.date ||
      !eventData.image
    ) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    let url = eventData.image;

    // Upload a new image if `isImageChanged` is true
    if (eventData.image && isImageChanged) {
      try {
        const imageRef = ref(storage, `events/${eventData.image.name}`);
        await uploadBytes(imageRef, eventData.image);
        url = await getDownloadURL(imageRef);
        console.log("Image uploaded:", url);
      } catch (e) {
        console.log(e);
        return; // Exit the function if there's an error during image upload
      }
    }

    try {
      if (!edit) {
        // Adding a new event
        const eventRef = collection(db, "events");
        await addDoc(eventRef, { ...eventData, image: url });
        console.log("Event added to DB");
      } else {
        // Editing an existing event
        const docs = doc(db, "events", eventData.id);
        const eventDataToUpdate = { ...eventData, image: url };
        delete eventDataToUpdate.id;

        await updateDoc(docs, eventDataToUpdate);
        console.log("Event updated successfully");
      }
      onCancel(); // Close the modal after successful upload or update
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="absolute z-10 top-0 left-0 w-screen h-screen lg:w-full lg:h-full bg-[#50525580] flex justify-center items-center">
      <div className="w-full md:w-[80%] h-full md:h-fit bg-white rounded-md p-4 md:p-8">
        <div className="flex flex-wrap justify-between w-full gap-4 mt-12 h-fit md:mt-0">
          <div className="w-full md:w-[50%] h-full flex flex-col gap-4 min-w-[10rem]">
            {edit && <p>edit</p>}
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Event Type"
              value={eventData.type}
              onChange={(e) =>
                setEventData({ ...eventData, type: e.target.value })
              }
            />
            <div className="w-full h-[10rem] rounded-md bg-slate-300 relative flex justify-center items-center">
              <input
                type="file"
                accept=".jpg,.png"
                className="absolute top-0 left-0 z-10 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  setIsImageChanged(true);
                  setEventData({
                    ...eventData,
                    image: e.target.files[0],
                  });
                }}
              />
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="image"
                  className="absolute top-0 left-0 object-cover w-full h-full rounded-md z-1"
                />
              ) : (
                <p className="font-medium text-gray-500">Add Image +</p>
              )}
            </div>

            <div className="flex justify-between w-full">
              <textarea
                className="w-[100%] h-[15rem] outline-none border-none rounded-md bg-slate-300 p-3 mt-4"
                placeholder="Description"
                value={eventData.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="w-full md:w-[40%] min-w[10rem] h-fit rounded-md relative">
            <StaticDatePicker
              value={dayjs(eventData.date)}
              sx={{
                minWidth: "100%",
                height: "80%",
                display: "flex",
                flexDirection: "column",
                ".MuiDialogActions-root": {
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
          <div
            onClick={() => upload()}
            className="w-[9rem] h-full rounded-md bg-blue-500 flex items-center justify-center cursor-pointer shadow-md shadow-blue-100"
          >
            <p className="font-medium text-white">Upload Event</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEvents;
