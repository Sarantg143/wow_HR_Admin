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
const Testimonial = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAddNewTestimonial, setOpenAddNewTestimonial] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(null);

  // Fetch testimonials from Firebase
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

  // Handle adding a new testimonial
  const handleAddTestimonial = () => {
    fetchTestimonials();
  };

  // Handle editing an existing testimonial
  const handleEditTestimonial = (testimonial) => {
    setEditTestimonial(testimonial);
    setOpenAddNewTestimonial(true);
  };

  // Handle updating an existing testimonial
  const handleUpdateTestimonial = async (updatedTestimonial) => {
    try {
      const testimonialDocRef = doc(db, "testimonials", updatedTestimonial.id);

      // Handle image deletion and update
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

      // Fetch the updated list after an edit
      fetchTestimonials();
    } catch (error) {
      console.error("Error updating testimonial:", error);
    }
  };

  // Handle deleting a testimonial
  const handleDeleteTestimonial = async (testimonial) => {
    try {
      if (window.confirm("Are you sure you want to delete this testimonial?")) {
        if (testimonial.image) {
          console.log("Deleting image at path:", testimonial.image);
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
                <div className="flex flex-wrap items-center justify-between w-full h-10 gap-4 mt-8 md:mt-0">
  //new
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
              <p>Add New Testimonial</p>
            </button>
          </div>
          <div className="flex flex-col w-full h-full gap-4 mt-4 overflow-y-scroll">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex w-full gap-4 p-4 rounded-md h-fit bg-slate-100"
              >
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

export default Testimonial;
