import React, { useState, useEffect } from "react";
import NewTestimonial from "./NewTestimonial";
import Sidebar from "../global/Sidebar";
import assets from "../../assets/assets";
import MobileSidebar from "../global/MobileSidebar";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [openAddNewTestimonial, setOpenAddNewTestimonial] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const testimonialsCollection = collection(db, "testimonials");
    const testimonialsSnapshot = await getDocs(testimonialsCollection);
    const testimonialsList = testimonialsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTestimonials(testimonialsList);
  };

  const handleAddTestimonial = (newTestimonial) => {
    const updatedTestimonials = editTestimonial
      ? testimonials.map((testimonial) =>
          testimonial.id === newTestimonial.id ? newTestimonial : testimonial
        )
      : [...testimonials, newTestimonial];
    setTestimonials(updatedTestimonials);
    setEditTestimonial(null);
    setOpenAddNewTestimonial(false);
  };

  const handleDeleteTestimonial = async (id) => {
    await deleteDoc(doc(db, "testimonials", id));
    setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id));
  };

  const handleEditTestimonial = (testimonial) => {
    setEditTestimonial(testimonial);
    setOpenAddNewTestimonial(true);
  };

  const handleCancel = () => {
    setEditTestimonial(null);
    setOpenAddNewTestimonial(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <MobileSidebar />
        <div className="px-4 md:px-8">
          <h2>Testimonials</h2>
          <button
            type="button"
            onClick={() => setOpenAddNewTestimonial(true)}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add New Testimonial
          </button>
          <div className="testimonial-list">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-item">
                <h3>{testimonial.name}</h3>
                <p>{testimonial.designation} at {testimonial.organization}</p>
                <img src={testimonial.image} alt={testimonial.name} />
                <p>{testimonial.description}</p>
                <button
                  type="button"
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          {openAddNewTestimonial && (
            <NewTestimonial
              onCancel={handleCancel}
              onAddTestimonial={handleAddTestimonial}
              testimonialToEdit={editTestimonial}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
