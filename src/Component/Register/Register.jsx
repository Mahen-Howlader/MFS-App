import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    pin: '',
    mobile: '',
    email: '',
    status: 'pending',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = formData.name ? "" : "Name is required.";
    tempErrors.pin = formData.pin.length === 5 && !isNaN(formData.pin) ? "" : "PIN must be a 5-digit number.";
    tempErrors.mobile = formData.mobile.match(/^\d{11}$/) ? "" : "Mobile number must be a 10-digit number.";
    tempErrors.email = formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? "" : "Email is not valid.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleChange = e => {
    const { name, value } = e.target;
    console.log({ ...formData, [name]: value })
    setFormData({ ...formData, [name]: value });
  };

// console.log(import.meta.env.VITE_API)
  const { mutate,isPending  } = useMutation({
    mutationFn: async (userInfo) => {
      const res = await axios.post(`${import.meta.env.VITE_API}/registration`, userInfo);
      return res.data;
    },
    onSuccess: async (data) => {
      // Choose one notification method
      console.log(data.insertedId)
      if(data.insertedId){
        toast.success("Register successfully"); // Or alert("Register successfully"); 
      }
    },
    onError: (error) => {
      toast.error("Registration Failed!", error.response?.data?.message || error.message); // Provide user-friendly error message
    },
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validate()) {
      console.log("Form Data Submitted:", formData); // Log form data for debugging (optional)
      // console.log("Request URL:", `${import.meta.env.VITE_API}/registration`);
      // const res = await axios.post(`${import.meta.env.VITE_API}/registration`, formData);
      
      
      try {
        await mutate(formData);  // Use await to handle potential errors
      } catch (error) {
        toast.error("Registration Failed!", error.response?.data?.message || error.message);
      }
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-5">Registration </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">5-digit PIN</label>
          <input
            type="text"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.pin && <p className="text-red-500 text-sm">{errors.pin}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
        {isPending ? <ClipLoader size={20} color={"#ffffff"} /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
