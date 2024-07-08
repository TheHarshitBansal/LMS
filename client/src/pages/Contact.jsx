import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useState } from "react";

import axiosInstance from "../helpers/axiosInstance";
import HomeLayout from "../layouts/HomeLayout";

const ContactUs = () => {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      enqueueSnackbar("All the fields are required", { variant: "error" });
      return;
    }

    if (formData.name.length < 2 || formData.name.length > 20) {
      enqueueSnackbar("Name should be of 2-20 characters", {
        variant: "error",
      });
      return;
    }

    //Email validation
    if (
      !formData.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      enqueueSnackbar("Invalid Email Address", { variant: "error" });
      return;
    }

    const response = axiosInstance.post('/contact', formData)
    const loading = enqueueSnackbar("Submitting your response", {variant:"warning", persist:true})
    response
      .then(() => {
        closeSnackbar(loading);
        enqueueSnackbar("Submitted Succesfully", {variant: 'success'})
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch(() => {
        enqueueSnackbar("Failed to create account", { variant: "error" });
      });
  };

  return (
    <HomeLayout>
      <div className="h-[90vh] flex items-center justify-center bg-gray-900 text-gray-100">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-400 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ContactUs;
