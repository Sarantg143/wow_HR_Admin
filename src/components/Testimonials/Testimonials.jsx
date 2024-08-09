import React, { useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import assets from "../../assets/assets";
import NewTestimonial from "./NewTestimonial";
import MobileSidebar from "../global/MobileSidebar";
import { db, collection, getDocs, deleteDoc, doc } from "../../firebase";
import { storage, ref, deleteObject } from "../../firebase";

const Testimonal = () => {
  const [openAddNewTestimonial, setOpenAddNewTestimonial] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const testimonialsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const handleDeleteTestimonial = async (id, imageUrl) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        if (imageUrl) {
          const imageRef = ref(storage, imageUrl);
          await deleteObject(imageRef);
          console.log("Image deleted successfully");
        }
        await deleteDoc(doc(db, "testimonials", id));
        setTestimonials(testimonials.filter(t => t.id !== id));
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-white flex relative">
      <Sidebar />
      <div className={`dashboard-content bg-white p-4 relative ${openAddNewTestimonial ? 'blur-sm' : ''}`}>
        <div
          className="w-full h-20 flex items-center justify-between"
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
        <div className="w-full h-12 flex items-center justify-between">
          <div className="w-fit h-full">
            <h1 className="font-bold text-[1.5rem]">Testimonials</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div
            onClick={() => setOpenAddNewTestimonial(true)}
            className="w-[12rem] h-10 flex items-center justify-center rounded-md bg-[#3372d7] cursor-pointer font-medium text-white"
          >
            Add New Testimonial
          </div>
        </div>
        <div className="w-full h-[calc(100%-3rem)] bg-white mt-4 p-2">
          <div className="w-full h-fit flex justify-between items-center flex-wrap gap-4 mt-8 md:mt-0">
            <div className="bg-[#edededde] w-[20rem] h-10 px-2 flex items-center gap-1 border rounded-md text-white border-blue-200">
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
          </div>
          <div className="min-w-fit w-full h-[calc(100%-4rem)] bg-gray-50 mt-4 rounded-lg flex flex-col gap-4">
            <div className="w-full h-10 flex justify-between gap-4 bg-[#eaeaea] px-4 rounded-t-md">
              <div className="w-[2rem] h-full flex gap-2 items-center text-black font-medium">
                <p>SI.No</p>
              </div>
              <div className="w-[8rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Person</p>
              </div>
              <div className="w-[40rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Description</p>
              </div>
              <div className="w-[5rem] h-full flex gap-2 items-center text-black font-medium">
                <p>Action</p>
              </div>
            </div>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="w-full gap-4 h-12 flex justify-between px-4 items-center"
              >
                <div className="w-[2rem] h-fit flex gap-2 items-center text-gray-500">
                  <p>{index + 1}</p>
                </div>
                <div className="w-[8rem] h-fit flex gap-2 items-center text-gray-500">
                  <img
                    src={testimonial.imageUrl}
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
                    onClick={() => setOpenAddNewTestimonial(true)}
                  >
                    <img
                      src={assets.Img.edit}
                      alt="icon"
                      className="w-[60%] h-[60%] object-contain"
                    />
                  </div>
                  <div
                    className="w-[3rem] h-8 bg-gray-100 rounded-md hover:bg-red-100 cursor-pointer flex items-center justify-center"
                    onClick={() => handleDeleteTestimonial(testimonial.id, testimonial.imageUrl)}
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
      {openAddNewTestimonial && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <NewTestimonial
            onCancel={() => setOpenAddNewTestimonial(false)}
            onSave={(data) => {
              setTestimonials(prev => [
                ...prev.filter(t => t.id !== data.id),
                data,
              ]);
              setOpenAddNewTestimonial(false);
            }}
            testimonial={null} // Pass existing testimonial if editing
          />
        </div>
      )}
    </div>
  );
};

export default Testimonal;
