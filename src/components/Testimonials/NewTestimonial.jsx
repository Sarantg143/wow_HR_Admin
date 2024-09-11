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

const NewTestimonial = ({ onCancel, onAddTestimonial, testimonialToEdit }) => {
  const [testimonialData, setTestimonialData] = useState({
    name: "",
    designation: "",
    organization: "",
    image: null,
    description: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (testimonialToEdit) {
      setTestimonialData(testimonialToEdit);
      setImageUrl(testimonialToEdit.image || "");
    }
  }, [testimonialToEdit]);

  const handleInput = (type, value) => {
    setTestimonialData({ ...testimonialData, [type]: value });
  };

  useEffect(() => {
    if (testimonialData.image && typeof testimonialData.image === "object") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(testimonialData.image);
    }
  }, [testimonialData.image]);

  const handleUploadTestimonial = async () => {
    try {
      let uploadedImageUrl = imageUrl;

      if (testimonialData.image && typeof testimonialData.image === "object") {
        const imageRef = ref(
          storage,
          `testimonials/${testimonialData.image.name}`
        );
        const snapshot = await uploadBytes(imageRef, testimonialData.image);
        uploadedImageUrl = await getDownloadURL(snapshot.ref);
      }

      if (testimonialToEdit) {
        await updateDoc(doc(db, "testimonials", testimonialToEdit.id), {
          ...testimonialData,
          image: uploadedImageUrl,
        });
        onAddTestimonial({
          id: testimonialToEdit.id,
          ...testimonialData,
          image: uploadedImageUrl,
        });
      } else {
        const docRef = await addDoc(collection(db, "testimonials"), {
          ...testimonialData,
          image: uploadedImageUrl,
        });
        onAddTestimonial({
          id: docRef.id,
          ...testimonialData,
          image: uploadedImageUrl,
        });
      }

      console.log("Testimonial added/updated successfully");
      onCancel();
    } catch (error) {
      console.error("Error uploading testimonial:", error);
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
              value={testimonialData.name}
              onChange={(e) => handleInput("name", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Designation *"
              value={testimonialData.designation}
              onChange={(e) => handleInput("designation", e.target.value)}
            />
            <input
              type="text"
              className="w-full h-10 pl-2 font-medium border-none rounded-md outline-none bg-slate-300"
              placeholder="Organization *"
              value={testimonialData.organization}
              onChange={(e) => handleInput("organization", e.target.value)}
            />
          </div>
          <div className="w-full md:w-[40%] h-[10rem] rounded-md bg-slate-300 relative flex justify-center items-center">
            <input
              type="file"
              accept=".jpg,.png"
              className="absolute top-0 left-0 z-10 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) =>
                setTestimonialData({
                  ...testimonialData,
                  image: e.target.files[0],
                })
              }
            />
            {testimonialData.image ? (
              <img
                src={imageUrl}
                alt="image"
                className="absolute top-0 left-0 object-cover w-full h-full rounded-md z-1"
              />
            ) : (
              <p className="font-medium text-gray-500">Add Image +</p>
            )}
          </div>
        </div>
        <div className="flex justify-between w-full mt-8">
          <textarea
            className="w-full h-[12rem] outline-none border-none rounded-md bg-slate-300 p-3"
            placeholder="Description *"
            value={testimonialData.description}
            onChange={(e) => handleInput("description", e.target.value)}
          />
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
            onClick={() => handleUploadTestimonial()}
            className="w-[9rem] h-full rounded-md bg-blue-500 flex items-center justify-center cursor-pointer shadow-md shadow-blue-100"
          >
            <p className="font-medium text-white">Upload Testimonial</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTestimonial;
