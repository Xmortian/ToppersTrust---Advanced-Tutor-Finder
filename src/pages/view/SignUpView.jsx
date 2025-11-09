
import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

export const GenderToggle = ({ value, onChange, options = ['Male', 'Female'] }) => (
  <div className="flex items-center gap-0 rounded-md border border-gray-300 overflow-hidden text-xs sm:text-sm">
    {options.map(option => (
      <button
        key={option}
        type="button"
        onClick={() => onChange(option)}
        className={`flex-1 py-1.5 sm:py-2 px-2 text-center transition-colors duration-200 focus:outline-none border-r border-gray-300 last:border-r-0 ${value === option ? "bg-[#6344cc] text-white z-10" : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
      >
        {option}
      </button>
    ))}
  </div>
);

const RoleButton = ({ active, label, subtext, onClick }) => {
  const primaryColor = "bg-[#6344cc]";
  const focusRingColor = "focus:ring-[#6344cc]";
  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`w-full sm:w-auto relative px-4 py-2.5 rounded-full flex items-center justify-center gap-2 text-white text-sm sm:text-base font-medium transition-all duration-300 focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2 ${active ? primaryColor : `bg-purple-400 hover:bg-purple-500`}`}
      >
        {label}
        {active && (<FaCheckCircle className="text-green-300 text-lg ml-1 sm:ml-2" />)}
      </button>
      <span className="mt-1 text-xs text-gray-600">{subtext}</span>
    </div>
  );
};

export default function SignUpView(props) {
  const {
    formData, formErrors, agreedToTerms, isLoading, signUpMessage,
    onInputChange, onGenderChange, onRoleChange, onTermsClick, onSubmit,
  } = props;

  const focusRingColor = "focus:ring-[#6344cc]";
  const primaryColor = "bg-[#6344cc]";
  const hoverColor = "hover:bg-[#5238a8]";

  return (
    <div className="w-full min-h-screen relative flex flex-col items-center justify-center p-4 sm:p-6 font-roboto text-[#000] overflow-x-hidden">
      <img className="absolute inset-0 w-full h-full object-cover -z-10" alt="Background" src="/image-9@2x.png" />

      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between p-4">
        <div className="w-20 sm:w-24">
          <img className="w-20 h-20 sm:w-24 sm:h-24 object-contain" alt="Toppers Trust Logo" src="/untitled-design--1-removebgpreview-1@2x.png" />
        </div>
        <div className="flex-grow text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-oswald font-bold text-[#40919e] whitespace-nowrap">TOPPERS TRUST</h1>
        </div>
        <div className="w-20 sm:w-24" />
      </header>

      <form onSubmit={onSubmit} className="relative bg-white/80 backdrop-blur-md shadow-2xl rounded-xl sm:rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-xl md:max-w-3xl z-10 mt-24 sm:mt-32 md:mt-40">
        <h2 className="text-xl sm:text-2xl font-semibold text-cyan-900 mb-6 text-center"> Create Your Account </h2>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
          <RoleButton active={formData.role === 'guardian'} label="I Want a Tutor" subtext="Guardian" onClick={() => onRoleChange('guardian')} />
          <RoleButton active={formData.role === 'teacher'} label="I Want to Teach" subtext="Teacher" onClick={() => onRoleChange('teacher')} />
        </div>
        {formErrors.role && <p className="text-red-500 text-xs mt-1 text-center mb-4">{formErrors.role}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-5">
          <div>
            <label htmlFor="name" className="block text-sm mb-1 text-left">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6344cc] outline-none" placeholder="Enter your name" required />
            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-left">Gender</label>
            <GenderToggle value={formData.gender} onChange={onGenderChange} options={['Male', 'Female']} />
            {formErrors.gender && <p className="text-red-500 text-xs mt-1">{formErrors.gender}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm mb-1 text-left">Phone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6344cc] outline-none" placeholder="Enter your phone number" required />
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-left">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6344cc] outline-none" placeholder="Enter your email" required />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm mb-1 text-left">City</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6344cc] outline-none" placeholder="Enter your city" />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm mb-1 text-left">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6344cc] outline-none" placeholder="E.g., Street address, Area" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-left">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6344cc] outline-none" placeholder="6+ characters" required />
            {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm mb-1 text-left">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={onInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#6344cc] outline-none" placeholder="Confirm your password" required />
            {formErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>}
          </div>
        </div>

        <div className="mt-5 flex items-center text-left">
          <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => onInputChange(e)} className="h-4 w-4 text-[#6344cc] border-gray-400 rounded focus:ring-[#6344cc]" />
          <label htmlFor="terms" className="ml-2 text-xs sm:text-sm font-light text-gray-700">
            I agree to the <span onClick={onTermsClick} className="underline text-[#1368a4] cursor-pointer hover:text-[#6344cc]"> Terms & Privacy Policy </span>
          </label>
        </div>
        {formErrors.terms && <p className="text-red-500 text-xs mt-1 text-left">{formErrors.terms}</p>}

        {signUpMessage && (<p className={`mt-4 text-sm text-center ${signUpMessage.toLowerCase().includes("error") || signUpMessage.toLowerCase().includes("failed") ? "text-red-600" : "text-green-600"}`}>{signUpMessage}</p>)}
        {formErrors.submit && !signUpMessage && (<p className="mt-4 text-sm text-center text-red-600">{formErrors.submit}</p>)}

        <div className="mt-6 text-center">
          <button type="submit" disabled={isLoading || !agreedToTerms}
            className={`w-full sm:w-auto rounded-full ${primaryColor} text-white px-10 py-3 font-medium text-base ${hoverColor} transition-colors duration-300 focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2 ${(isLoading || !agreedToTerms) ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isLoading ? <><FaSpinner className="animate-spin inline mr-2" />Signing Up...</> : "Sign Up"}
          </button>
        </div>

        <div className="mt-5 text-center text-sm font-light text-gray-600"> Already have an account? <Link to="/" className="underline text-[#1368a4] cursor-pointer hover:text-[#6344cc]"> Sign In </Link> </div>
      </form>
    </div>
  );
}
