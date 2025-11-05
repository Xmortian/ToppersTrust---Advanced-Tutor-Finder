import { useState } from "react";
import { FaCheckCircle, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from '../supabase.js';

const LandingPage = () => {
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signInError, setSignInError] = useState("");

    const navigate = useNavigate();

    const primaryColor = "bg-[#6344cc]";
    const hoverColor = "hover:bg-[#5238a8]";
    const focusRingColor = "focus:ring-[#6344cc]";

    const handleSignIn = async () => {
        if (!role) {
            setSignInError("Please select your role.");
            return;
        }
        if (!email || !password) {
            setSignInError("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        setSignInError("");

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setSignInError(error.message);
                setIsLoading(false);
                return;
            }

            if (data.user) {
                console.log("Successfully signed in:", data.user);
                const storedUserRole = data.user.user_metadata?.user_role;
                const expectedRole = role === "tutor" ? "guardian" : "teacher";

                if (storedUserRole === expectedRole) {
                    if (expectedRole === "guardian") {
                        navigate("/guardian-dashboard");
                    } else if (expectedRole === "teacher") {
                        navigate("/tutor-dashboard");
                    } else {
                        console.warn("User has unexpected role:", storedUserRole);
                        navigate("/");
                    }
                } else {
                    setSignInError(`Incorrect role selected. This account is registered as a ${storedUserRole || 'user'}.`);
                    await supabase.auth.signOut();
                }
            } else {
                setSignInError("Sign in failed. Please try again.");
            }
        } catch (error) {
            setSignInError("An unexpected error occurred. Please try again.");
            console.error("Sign in catch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative w-full h-screen bg-[#fafafa] overflow-hidden font-roboto">
            {/* Background Image */}
            <img
                src="/image-8@2x.png"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />

            <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4">
                {/* Left: Logo */}
                <div className="flex-shrink-0">
                    <img
                        className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                        alt="Toppers Trust Logo"
                        src="/untitled-design--1-removebgpreview-1@2x.png"
                    />
                </div>

                {/* Center: Title */}
                <div className="flex-grow text-center">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-oswald font-bold text-[#40919e] whitespace-nowrap">
                        TOPPERS TRUST
                    </h1>
                </div>

                <div className="flex-shrink-0">
                    <Link
                        to="/job-card"
                        className="text-base sm:text-lg font-medium text-black hover:underline"
                    >
                        Job Board
                    </Link>
                </div>
            </header>


            {/* Centered Login Card */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
                <div className="bg-white/80 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-xs sm:max-w-md text-center backdrop-blur-md">
                    <h2 className="text-xl sm:text-2xl font-semibold text-cyan-900 mb-1">Welcome!</h2>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">Sign in to continue</p>

                    {/* Role Select Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
                        {[
                            { type: "tutor", label: "I Want a Tutor", subtext: "Guardian" },
                            { type: "teacher", label: "I Want to Teach", subtext: "Teacher" },
                        ].map((roleOption) => (
                            <div key={roleOption.type} className="flex flex-col items-center">
                                <button
                                    onClick={() => { setRole(roleOption.type); setSignInError(""); }}
                                    className={`w-full sm:w-auto relative px-4 py-2.5 rounded-full flex items-center justify-center gap-2 text-white text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2 ${role === roleOption.type ? `${primaryColor}` : `bg-purple-400 hover:bg-purple-500`}`}
                                >
                                    {roleOption.label}
                                    {role === roleOption.type && (<FaCheckCircle className="text-green-300 text-lg ml-1 sm:ml-2" />)}
                                </button>
                                <span className="mt-1 text-xs text-gray-600">{roleOption.subtext}</span>
                            </div>
                        ))}
                    </div>

                    {/* Login Form */}
                    <div className="flex flex-col gap-4 mb-4">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={`p-3 rounded-lg border ${signInError && (!email || !password) ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 ${focusRingColor} text-sm sm:text-base`} />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full p-3 pr-10 rounded-lg border ${signInError && (!email || !password) ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 ${focusRingColor} text-sm sm:text-base`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                        </div>
                    </div>

                    {signInError && (<p className="text-red-500 text-xs sm:text-sm mb-3">{signInError}</p>)}

                    <button onClick={handleSignIn} disabled={isLoading || !role} className={`w-full flex items-center justify-center gap-2 ${primaryColor} text-white py-3 rounded-lg ${hoverColor} transition-colors duration-300 mb-4 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2 ${(isLoading || !role) ? "opacity-70 cursor-not-allowed" : ""}`}>
                        {isLoading ? <FaSpinner className="animate-spin" /> : null}
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>
                    {!role && (<div className="text-xs text-gray-500 mb-4 -mt-3"> Please select a role above to enable Sign In. </div>)}

                    <div className="text-xs sm:text-sm text-gray-700">
                        <Link to="/sign-up-frame" className={`mr-1 sm:mr-2 hover:underline cursor-pointer text-[#6344cc] font-medium`}> Sign up </Link> |
                        <Link to="/forgot-pass" className={`ml-1 sm:ml-2 text-[#6344cc] font-medium cursor-pointer hover:underline`}> Forgot Password? </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;