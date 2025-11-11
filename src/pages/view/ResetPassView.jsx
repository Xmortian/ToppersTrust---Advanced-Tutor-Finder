import { Link } from "react-router-dom";
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassView = ({
    newPassword,
    confirmPassword,
    message,
    isLoading,
    showNewPassword,
    showConfirmPassword,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    handleSubmit
}) => {
    const primaryColor = "bg-[#6344cc]";
    const hoverColor = "hover:bg-[#5238a8]";
    const focusRingColor = "focus:ring-[#6344cc]";

    return (
        <div className="w-full min-h-screen relative flex flex-col items-center justify-center p-4 font-roboto text-[#000] overflow-x-hidden">
            <img
                className="absolute inset-0 w-full h-full object-cover -z-10"
                alt="Background"
                src="/image-91@2x.png"
            />
            <img
                className="absolute top-4 left-4 sm:top-[-0.562rem] sm:left-[-1.562rem] w-24 h-24 sm:w-[10.438rem] sm:h-[10.438rem] object-contain z-20"
                alt="Toppers Trust Logo"
                src="/untitled-design--1-removebgpreview-11@2x.png"
            />
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 sm:top-[1.5rem] text-[1.75rem] sm:text-[2.25rem] font-oswald text-[#40919e] z-20 text-center whitespace-nowrap">
                TOPPERS TRUST
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-md z-10 mt-20 sm:mt-28"
            >
                <h2 className="text-xl sm:text-2xl font-semibold text-cyan-900 mb-4 text-center">
                    Reset Your Password
                </h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base text-center">
                    Enter and confirm your new password below.
                </p>

                <div className="mb-4 relative">
                    <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        New Password
                    </label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        onChange={handleNewPasswordChange}
                        className={`w-full p-3 pr-10 border ${message.includes("Password must be") || message.includes("Passwords do not match") ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} text-sm sm:text-base`}
                        placeholder="Enter new password (min. 6 characters)"
                        required
                    />
                    <button
                        type="button"
                        onClick={toggleShowNewPassword}
                        className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                    >
                        {showNewPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
                    </button>
                </div>

                <div className="mb-6 relative">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Confirm New Password
                    </label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`w-full p-3 pr-10 border ${message.includes("Passwords do not match") ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${focusRingColor} text-sm sm:text-base`}
                        placeholder="Confirm new password"
                        required
                    />
                    <button
                        type="button"
                        onClick={toggleShowConfirmPassword}
                        className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                        {showConfirmPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
                    </button>
                </div>

                {message && (
                    <p className={`mb-4 text-sm text-center ${message.includes("Error") || message.includes("Password must be") || message.includes("Passwords do not match") ? "text-red-600" : "text-green-600"}`}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center gap-2 ${primaryColor} text-white py-3 rounded-lg ${hoverColor} transition-colors duration-300 text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2
                        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                    {isLoading ? <FaSpinner className="animate-spin" /> : null}
                    {isLoading ? "Resetting..." : "Reset Password"}
                </button>

                <div className="mt-6 text-center">
                    <Link
                        to="/"
                        className={`text-sm text-[#6344cc] hover:underline font-medium`}
                    >
                        Back to Sign In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ResetPassView;