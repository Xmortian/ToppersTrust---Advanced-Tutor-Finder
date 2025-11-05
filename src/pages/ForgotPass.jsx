import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../supabase.js'; 
import { FaSpinner } from 'react-icons/fa'; 

const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(""); // State for success/error messages

    const primaryColor = "bg-[#6344cc]";
    const hoverColor = "hover:bg-[#5238a8]";
    const focusRingColor = "focus:ring-[#6344cc]";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!email) {
            setMessage("Please enter your email address.");
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            });

            if (error) {
                console.error("Password reset error:", error);
                setMessage(`Error sending reset link: ${error.message}`);
            } else {
                setMessage("Password reset link sent! Please check your email (including spam folder).");
                setEmail("");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen relative flex flex-col items-center justify-center p-4 font-roboto text-[#000] overflow-x-hidden">
            <img
                className="absolute inset-0 w-full h-full object-cover -z-10"
                alt="Background"
                src="/image-91@2x.png"
            />

            <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4">
                {/* Left: Logo */}
                <div className="w-20 sm:w-24"> 
                    <img
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                        alt="Toppers Trust Logo"
                        src="/untitled-design--1-removebgpreview-11@2x.png"
                    />
                </div>

                {/* Center: Title */}
                <div className="flex-grow text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-oswald font-bold text-[#40919e] whitespace-nowrap">
                        TOPPERS TRUST
                    </h1>
                </div>

                <div className="w-20 sm:w-24" /> {/* This empty div ensures the title is perfectly centered */}
            </header>

            {/* Form Card */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-md z-10 mt-20 sm:mt-28"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-cyan-900 mb-2 text-center">
                    Forgot Your Password?
                </h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base text-center">
                    Enter your email address below and we'll send you a link to reset it.
                </p>

                {/* Email Input Field */}
                <div className="mb-5">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full p-3 border ${message.includes("Error") ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} text-sm sm:text-base`}
                        placeholder="you@example.com"
                        required
                    />
                </div>

                {message && (
                    <p className={`mb-4 text-sm text-center ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                        {message}
                    </p>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 ${primaryColor} text-white py-3 rounded-lg ${hoverColor} transition-colors duration-300 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? <FaSpinner className="animate-spin" /> : null}
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>

                {/* Link to go back to Login */}
                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className={`text-sm text-[#6344cc] hover:underline font-medium`}
                    >
                        Remembered your password? Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPass;