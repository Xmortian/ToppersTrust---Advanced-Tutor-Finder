import React from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/sign-up-frame");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-[#000] font-roboto flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
      <header className="w-full max-w-5xl fixed top-0 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-md shadow-md py-3 px-4 sm:px-6 z-50 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/untitled-design--1-removebgpreview-1@2x.png"
            alt="Toppers Trust Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 object-contain mr-3"
          />
          <h1 className="text-[1.5rem] sm:text-[1.75rem] font-oswald text-[#40919e] hidden sm:block">
            TOPPERS TRUST
          </h1>
        </div>
        <button
          onClick={handleGoBack}
          className="flex items-center bg-[#6344cc] text-white hover:bg-[#5238a8] px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium transition-colors"
        >
          <IoChevronBack className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Back
        </button>
      </header>

      <main className="w-full max-w-4xl bg-white p-6 sm:p-8 shadow-xl rounded-lg mt-24 sm:mt-28">
        <h2 className="text-center text-[1.75rem] sm:text-[2rem] font-bold mb-1 text-gray-800">
          Terms and Conditions
        </h2>
        <p className="text-center text-[0.875rem] sm:text-[1rem] text-gray-600 mb-8">
          Last updated on May 7, 2025
        </p>

        <div className="prose prose-sm sm:prose-base max-w-none text-left text-gray-700">
          {/* ... other terms content ... */}
          <p>
            By using the Toppers Trust platform, you agree to these Terms of Use. We may modify these Terms at any time by posting
            the revised version on our website: Toppers Trust. Changes take effect immediately upon posting. Users will be notified via
            social media, email, or the “Notice Board” in their account.
            Continued use of the platform constitutes acceptance of the updated Terms.
          </p>

          <p className="my-4 p-3 border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 font-semibold">
            PLEASE READ THESE TERMS CAREFULLY BEFORE USING OUR WEBSITE, MOBILE APP, OR SERVICES. THIS AGREEMENT IS
            LEGALLY BINDING.
          </p>

          <p>
            By clicking “Accept” or using the platform (e.g., Browse, registering), you (“user,” “student,” “tutor,” “guardian”) agree to
            these Terms. These Terms apply to all users, including tutors, students, guardians, and content contributors.
          </p>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Toppers Trust Serves as a Marketplace</h3>
          <p>
            Toppers Trust operates as a marketplace connecting students/guardians with tutors. Tutors set their rates, and users agree that <strong>Toppers Trust:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Does not guarantee tutor quality, conduct, or performance.</li>
            <li>Is not responsible for disputes between tutors and students/guardians.</li>
            <li>Acts solely as a verified tutor-matching platform. Use at your own risk.</li>
          </ul>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Membership Eligibility</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Minors (under 18) cannot register or transact. Guardians/parents may use the platform on behalf of minors.</li>
            <li>Users must provide accurate registration data, maintain account security, and update information promptly.</li>
            <li>Membership is void where prohibited by law.</li>
          </ul>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Tutor Responsibilities</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Tutors must fulfill service requests and contact students/guardians to clarify terms before accepting assignments.</li>
            <li>Tutors must disclose qualifications upon request and conduct themselves professionally.</li>
            <li>Toppers Trust does not guarantee job placement or set tuition fees.</li>
          </ul>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Platform Charges for Tutors</h3>
          <p>
            <strong>Platform Charge:</strong> Tutors pay a 50% platform charge per confirmed tuition job (Home or Online Tutoring only). This fee is due
            within 15 days of job confirmation.
          </p>
          <p>
            <strong>Online Tutoring:</strong> Full salary is collected in advance by Toppers Trust for the first month. Subsequent payments are made
            directly to tutors by the guardian/student.
          </p>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Return Policy</h3>
          <p>
            Refunds for platform charges apply only if a valid discontinuation reason is provided (e.g., guardian/student cancellation).
            Notifications must be submitted within 48 hours.
          </p>

          <div className="my-6 overflow-x-auto"> {/* overflow-x-auto for responsiveness on small screens */}
            <table className="min-w-full border border-gray-300 text-sm text-left shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-700">Tuition Type</th>
                  <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-700">Platform Charge</th>
                  <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-700">1st Month</th>
                  <th className="border-b border-gray-300 px-4 py-2 font-semibold text-gray-700">2nd Month</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">Home Tutoring</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">50%</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">25%</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">25%</td>
                </tr>
                <tr>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">Online Tutoring</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">50%</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">25%</td>
                  <td className="border-b border-gray-300 px-4 py-2 text-gray-700">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>


          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Guardian/Student Responsibilities</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Post detailed tuition requests for accurate tutor matches.</li>
            <li>Verify tutors’ qualifications independently. Toppers Trust is not liable for tutors’ misconduct (e.g., harassment, theft).</li>
            <li>Disputes between tutors and students/guardians must be resolved independently.</li>
          </ul>

          {/* ... rest of your terms content ... */}
          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Payment Process</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>No platform fees for guardians/students.</li>
            <li>Salary terms are set directly between tutors and guardians/students.</li>
          </ul>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Ban Policy</h3>
          <p>Users may be banned temporarily or permanently for:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Tutors:</strong> Misconduct, false information, unethical behavior, or violating platform rules.</li>
            <li><strong>Students/Guardians:</strong> Harassment, misleading requests, or unethical actions.</li>
            <li>Banned users lose access to platform services.</li>
          </ul>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Data & Privacy</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Location Data:</strong> Collected for attendance tracking (Check In/Out features).</li>
            <li><strong>Notifications:</strong> Users get email alerts for updates.</li>
          </ul>

          <h3 className="text-[1.25rem] sm:text-[1.5rem] font-semibold mt-6 mb-3 text-gray-800">Liability</h3>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Toppers Trust is not liable for indirect damages (e.g., lost profits) arising from platform use.</li>
            <li><strong>Copyright:</strong> Repeat infringers’ accounts will be terminated.</li>
            <li><strong>Breach:</strong> Accounts may be suspended for violations, fraud, or harmful activity.</li>
          </ul>

          <p className="mt-6">
            By using Toppers Trust, you agree not to exploit platform content for commercial purposes. We reserve the right to modify
            services and terminate access at our discretion.
          </p>

          <p className="mt-4">
            <strong>Contact:</strong> Facebook → Toppers Trust
          </p>

          <p className="mt-8 p-4 border-t-2 border-red-600 bg-red-50 text-red-700 font-bold text-center">
            YOU ACKNOWLEDGE READING AND AGREEING TO ALL TERMS ABOVE.
          </p>
        </div>
      </main>

      <footer className="w-full max-w-4xl mt-12 pb-8 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Toppers Trust. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;