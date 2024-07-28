import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function Login() {
    const [formData, setFormData] = useState({ useremail: '', password: '' });
    const [errors, setErrors] = useState({ useremail: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { useremail: '', password: '' };

        if (!formData.useremail) {
            newErrors.useremail = 'useremail is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const { mutate, isPending } = useMutation({
        mutationFn: async (userInfo) => {
            const res = await axios.post(`${import.meta.env.VITE_API}/login`, userInfo);
            return res.data;
        },
        onSuccess: async (data) => {
            toast.success(data); // Or alert("Register successfully"); 
        },
        onError: (error) => {
            console.log(error)
            if (error?.response?.data?.error) {
                return toast.error(error?.response?.data?.error && error?.response?.data?.error);
            } else {
                toast.error("Tegister Failed!");
            }
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            // Handle form submission logic here
            console.log('Form submitted:', formData);
            try {
                await mutate(formData);  // Use await to handle potential errors
            } catch (error) {
                toast.error("Login Failed!", error.response?.data?.message || error.message);
            }
        }
    };

    return (
        <div>
            <section className="grid place-items-center min-h-screen bg-emerald-500 p-16">
                <div className="w-1/3 rounded-md border p-4 pt-0 shadow-lg bg-white">
                    <header className="flex mb-5 p-5 items-center justify-between font-bold text-emerald-950">
                        <span>Login</span>
                        {/* SVG: xmark */}
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {/* SVG: xmark */}
                    </header>
                    <form onSubmit={handleFormSubmit} className="grid gap-3">
                        {/* useremail Input */}
                        <input
                            className={`h-10 rounded-sm px-2 text-emerald-950 focus:outline-none border-2 ${errors.useremail ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500`}
                            type="text"
                            name="useremail"
                            value={formData.useremail}
                            onChange={handleInputChange}
                            placeholder="Enter your Number/Email"
                        />
                        {errors.useremail && <span className="text-red-500 text-sm">{errors.useremail}</span>}

                        {/* Password Input */}
                        <input
                            className={`h-10 rounded-sm px-2 text-emerald-950 focus:outline-none border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-emerald-500`}
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

                        {/* Sign In Button */}
                        <button
                            className="flex h-10 items-center justify-between rounded-sm bg-emerald-700 px-2 text-emerald-100 transition-colors duration-300 hover:bg-emerald-800 focus:outline-none focus:ring focus:ring-emerald-400"
                            type="submit"
                        >
                            <span>{isPending ? <ClipLoader size={20} color={"#ffffff"} /> : "Login"}</span>
                            <span>
                                {/* SVG: chevron-right */}
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                                {/* SVG: chevron-right */}
                            </span>
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default Login;
