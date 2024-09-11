<<<<<<< HEAD
import { useState, useEffect } from "react";
import assets from "../../assets/assets";
import Sidebar from "../global/Sidebar";
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
import NewTestimonial from "./NewTestimonial";

=======
import React, { useState, useEffect } from "react"; // React and Hooks
import assets from "../../assets/assets"; // Asset files
import Sidebar from "../global/Sidebar"; // Sidebar component
import MobileSidebar from "../global/MobileSidebar"; // Mobile Sidebar component

import {
  db, // Firebase database
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "../../firebase"; // Firebase imports

import { storage, ref, deleteObject } from "../../firebase"; // Firebase storage
import NewTestimonial from "./NewTestimonial"; // NewTestimonial component
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
const Testimonial = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAddNewTestimonial, setOpenAddNewTestimonial] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(null);

<<<<<<< HEAD
=======
  // Fetch testimonials from Firebase
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
  const fetchTestimonials = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "testimonials"));
      const testimonialsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonialsList);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

<<<<<<< HEAD
=======
  // Handle adding a new testimonial
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
  const handleAddTestimonial = () => {
    fetchTestimonials();
  };

<<<<<<< HEAD
=======
  // Handle editing an existing testimonial
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
  const handleEditTestimonial = (testimonial) => {
    setEditTestimonial(testimonial);
    setOpenAddNewTestimonial(true);
  };

<<<<<<< HEAD
=======
  // Handle updating an existing testimonial
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
  const handleUpdateTestimonial = async (updatedTestimonial) => {
    try {
      const testimonialDocRef = doc(db, "testimonials", updatedTestimonial.id);

<<<<<<< HEAD
=======
      // Handle image deletion and update
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
      if (
        editTestimonial.image &&
        updatedTestimonial.image !== editTestimonial.image
      ) {
        const oldImageRef = ref(storage, editTestimonial.image);
        await deleteObject(oldImageRef);
        console.log("Old image deleted successfully");
      }

      await updateDoc(testimonialDocRef, {
        ...updatedTestimonial,
        image: updatedTestimonial.image || "",
      });

      setOpenAddNewTestimonial(false);
      setEditTestimonial(null);
<<<<<<< HEAD
=======

      // Fetch the updated list after an edit
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
      fetchTestimonials();
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

<<<<<<< HEAD
=======
  // Handle deleting a testimonial
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
  const handleDeleteTestimonial = async (testimonial) => {
    try {
      if (window.confirm("Are you sure you want to delete this testimonial?")) {
        if (testimonial.image) {
<<<<<<< HEAD
=======
          console.log("Deleting image at path:", testimonial.image);
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
          const imageRef = ref(storage, testimonial.image);
          await deleteObject(imageRef)
            .then(() => {
              console.log("Image deleted successfully");
            })
            .catch((error) => {
              console.error("Error deleting image:", error);
            });
        }
        await deleteDoc(doc(db, "testimonials", testimonial.id));
        fetchTestimonials();
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-white">
      <Sidebar />
<<<<<<< HEAD
      <div
        className={`dashboard-content bg-white p-4 relative ${
          openAddNewTestimonial ? "blur-sm" : ""
        }`}
      >
        <div className="w-full h-20 flex items-center justify-between">
=======

      <div className="relative p-4 overflow-x-scroll bg-white dashboard-content">
        {openAddNewTestimonial && (
          <NewTestimonial
            onCancel={() => setOpenAddNewTestimonial(false)}
            onAddTestimonial={handleAddTestimonial}
            testimonialToEdit={editTestimonial}
            onUpdateTestimonial={handleUpdateTestimonial}
          />
        )}
        {openSidebar && <MobileSidebar />}
        <div className={`w-full h-20 flex items-center justify-between`}>
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
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
         <div className="w-full h-12 flex items-center justify-between">
          <div className="w-fit h-full">
            <h1 className="font-bold text-[1.5rem]">Testimonials</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
<<<<<<< HEAD
          <div
            onClick={() => {
              setEditTestimonial(null);
              setOpenAddNewTestimonial(true);
            }}
            className="w-[12rem] h-10 flex items-center justify-center rounded-md bg-[#3372d7] cursor-pointer font-medium text-white"
          >
            Add New Testimonial
=======
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
          </div>
        <div className="flex flex-col w-full h-full">
          <div className="w-full h-[4rem] flex justify-end">
            <button
              type="button"
              onClick={() => {
                setEditTestimonial(null);
                setOpenAddNewTestimonial(true);
              }}
              className="w-[8rem] h-full bg-blue-500 rounded-md flex justify-center items-center cursor-pointer text-white"
            >
              
              <p>Add New Testimonial</p>
            </button>
          </div>
          <div className="flex flex-col w-full h-full gap-4 mt-4 overflow-y-scroll">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex w-full gap-4 p-4 rounded-md h-fit bg-slate-100"
              >
<<<<<<< HEAD
                <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{index + 1}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <img
                    src={testimonial.image}
                    alt="icon"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <p>{testimonial.name}</p>
                </div>
                <div className="w-[40rem] h-full overflow-hidden flex gap-2 items-center text-gray-500">
                  <p className="w-full h-full text-[12px] text-justify">
                    {testimonial.description}
                  </p>
                </div>
                <div className="w-[5rem] h-fit flex gap-2 items-center justify-between">
                  <div
                    className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-blue-100 cursor-pointer flex items-center justify-center"
                    onClick={() => handleEditTestimonial(testimonial)}
                  >
                    <img
                      src={assets.Img.edit}
                      alt="icon"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div
                    className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-red-100 cursor-pointer flex items-center justify-center"
                    onClick={() =>
                      handleDeleteTestimonial(testimonial)
                    }
                  >
                    <img
                      src={assets.Img.Delete}
                      alt="icon"
                      className="w-[60%] h-[60%] object-contain"
                    />
=======
                <img
                  src={testimonial.image}
                  alt="Testimonial"
                  className="w-[6rem] h-[6rem] rounded-md object-cover"
                />
                <div className="flex flex-col justify-center w-full">
                  <p className="text-lg font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.designation}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.organization}
                  </p>
                  <p className="mt-2">{testimonial.description}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="w-[6rem] h-[2rem] bg-blue-500 rounded-md text-white flex items-center justify-center"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTestimonial(testimonial)}
                      className="w-[6rem] h-[2rem] bg-red-500 rounded-md text-white flex items-center justify-center"
                    >
                      Delete
                    </button>
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
<<<<<<< HEAD
      {openAddNewTestimonial && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <NewTestimonial
            onCancel={() => setOpenAddNewTestimonial(false)}
            onAddTestimonial={handleAddTestimonial}
            testimonialToEdit={editTestimonial}
            onUpdateTestimonial={handleUpdateTestimonial}
          />
        </div>
      )}
=======
>>>>>>> 327f21e0ca1aa45a211b32e27ed437824d695040
    </div>
  );
};

export default Testimonial;
