import { useState } from "react";

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <div>
            <section className="grid place-items-center min-h-screen bg-emerald-500 p-16">
                <div className="w-1/3 rounded-md border p-4 pt-0 shadow-lg">
                    <header className="flex mb-5 p-5 items-center justify-between font-bold text-emerald-950">
                        <span>Login</span>
                        {/* SVG: xmark */}
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        {/* SVG: xmark */}
                    </header>
                    <form onSubmit={handleFormSubmit} className="grid gap-3">
                        {/* Username Input */}
                        <input
                            className="h-10 rounded-sm px-2 text-emerald-950 focus:outline-none border-2 rounded-sm"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your Number/Email"
                        />
                        {/* Password Input */}
                        <input
                            className="h-10 rounded-sm px-2 text-emerald-950 focus:outline-none border-2 rounded-sm"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                        />
                        {/* Sign In Button */}
                        <button
                            className="flex h-10 items-center justify-between rounded-sm bg-emerald-700 px-2 text-emerald-100 transition-colors duration-300 hover:bg-emerald-800 focus:outline-none focus:ring focus:ring-emerald-400"
                            type="submit"
                        >
                            <span>Sign In</span>
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