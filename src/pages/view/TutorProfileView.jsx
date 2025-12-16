// TutorProfileView.jsx (Stylized Version)
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaInfoCircle, FaBookOpen, FaGraduationCap, FaArrowLeft, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { FiMail, FiMapPin } from 'react-icons/fi';

// --- Utility Components ---

// Reusable Info Field Component (Enhanced for style)
const InfoField = ({ label, value, breakAll = false }) => (
    <div className="flex flex-col space-y-0.5">
        <strong className="text-xs uppercase tracking-wider text-gray-500">{label}</strong>
        <span className={`text-gray-800 text-sm font-medium ${breakAll ? 'break-all' : ''}`}>
            {value || <span className="text-gray-400 italic">N/A</span>}
        </span>
    </div>
);

// --- Section Components ---

const PersonalInfoSection = ({ tutorData, sectionHeaderColor, renderProfileLink }) => (
    <section className="border border-gray-100 rounded-xl overflow-hidden shadow-md">
        <div className={`bg-gray-700 text-white px-5 py-3 flex items-center justify-between ${sectionHeaderColor}`}>
            <div className="flex items-center gap-3">
                <FaInfoCircle className="text-lg" />
                <h2 className="text-lg font-semibold tracking-wide">Personal Information</h2>
            </div>
        </div>
        <div className="bg-white p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <InfoField label="Email" value={tutorData.email} breakAll />
            <InfoField label="Phone Number" value={tutorData.additionalNumber} />
            <InfoField label="Gender" value={tutorData.gender} />
            <InfoField label="Date of Birth" value={tutorData.dateOfBirth} />
            <InfoField label="Religion" value={tutorData.religion} />
            <InfoField label="National ID" value={tutorData.nationalId} />
            <div className="sm:col-span-2">
                <InfoField label="Nationality" value={tutorData.nationality} />
            </div>
            <div>
                <InfoField label="Facebook Profile Link" value={renderProfileLink(tutorData.facebookProfile, "View Profile")} />
            </div>
            <div className="sm:col-span-2">
                <InfoField label="Google Drive Link (Documents)" value={renderProfileLink(tutorData.driveLink, "View Documents")} />
            </div>
            <InfoField label="Father's Name" value={tutorData.fathersName} />
            <InfoField label="Father's Number" value={tutorData.fathersNumber} />
            <InfoField label="Mother's Name" value={tutorData.mothersName} />
            <InfoField label="Mother's Number" value={tutorData.mothersNumber} />
            <div className="sm:col-span-2">
                <InfoField label="Emergency Contact" value={tutorData.emergencyContact} />
            </div>
        </div>
    </section>
);

const EducationalInfoSection = ({ tutorData, sectionHeaderColor }) => {
    const hasUniInfo = tutorData.uniSchool || tutorData.uniGrade || tutorData.uniExamDegree;
    const hasHscInfo = tutorData.hscSchool || tutorData.hscGrade;
    const hasSscInfo = tutorData.sscSchool || tutorData.sscGrade;
    const hasAnyInfo = hasUniInfo || hasHscInfo || hasSscInfo;

    return (
        <section className="border border-gray-100 rounded-xl overflow-hidden shadow-md">
            <div className={`bg-gray-700 text-white px-5 py-3 flex items-center justify-between ${sectionHeaderColor}`}>
                <div className="flex items-center gap-3">
                    <FaGraduationCap className="text-lg" />
                    <h2 className="text-lg font-semibold tracking-wide">Educational Information</h2>
                </div>
            </div>
            <div className="bg-white p-5 sm:p-6 space-y-6 text-sm">
                {hasUniInfo && (
                    <div className="border border-indigo-100 rounded-lg p-4 bg-indigo-50">
                        <h4 className="font-bold text-indigo-700 text-base mb-3 border-b border-indigo-200 pb-2">
                            University / Bachelors / Honors
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <InfoField label="Institute" value={tutorData.uniSchool} />
                            <InfoField label="Curriculum" value={tutorData.uniCurriculum} />
                            <InfoField label="Exam/Degree" value={tutorData.uniExamDegree} />
                            <InfoField label="From Date" value={tutorData.uniFromDate} />
                            <InfoField label="Major/Group" value={tutorData.uniMajorGroup} />
                            <InfoField label="To Date" value={tutorData.uniToDate} />
                            <InfoField label="ID Card No" value={tutorData.uniIdCardNo} />
                            <InfoField label="Year of Passing" value={tutorData.uniYearOfPassing} />
                            <div className="sm:col-span-2">
                                <InfoField label="Result" value={tutorData.uniGrade} />
                            </div>
                            <div className="sm:col-span-2 flex items-center gap-2 mt-2">
                                <strong className="text-xs uppercase tracking-wider text-gray-500">Currently Studying Here:</strong>
                                <span className={`font-semibold text-sm ${tutorData.uniCurrentlyStudying ? 'text-green-600' : 'text-red-600'}`}>
                                    {tutorData.uniCurrentlyStudying ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {hasHscInfo && (
                    <div className="border border-yellow-100 rounded-lg p-4 bg-yellow-50">
                        <h4 className="font-bold text-yellow-700 text-base mb-3 border-b border-yellow-200 pb-2">
                            Higher Secondary (HSC)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <InfoField label="Institute" value={tutorData.hscSchool} />
                            <InfoField label="Grade/Result" value={tutorData.hscGrade} />
                        </div>
                    </div>
                )}

                {hasSscInfo && (
                    <div className="border border-green-100 rounded-lg p-4 bg-green-50">
                        <h4 className="font-bold text-green-700 text-base mb-3 border-b border-green-200 pb-2">
                            Secondary (SSC)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                            <InfoField label="Institute" value={tutorData.sscSchool} />
                            <InfoField label="Grade/Result" value={tutorData.sscGrade} />
                        </div>
                    </div>
                )}

                {!hasAnyInfo && (
                    <p className="text-gray-500 italic text-center py-4">No detailed educational information provided.</p>
                )}
            </div>
        </section>
    );
};

const TuitionInfoSection = ({ tutorData, sectionHeaderColor }) => (
    <section className="border border-gray-100 rounded-xl overflow-hidden shadow-md">
        <div className={`bg-gray-700 text-white px-5 py-3 flex items-center justify-between ${sectionHeaderColor}`}>
            <div className="flex items-center gap-3">
                <FaBookOpen className="text-lg" />
                <h2 className="text-lg font-semibold tracking-wide">Tuition Related Information</h2>
            </div>
        </div>
        <div className="bg-white p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
            <InfoField 
                label="Tutoring Method" 
                value={tutorData.tutoringMethod}
            />
            <InfoField 
                label="Total Experience" 
                value={tutorData.totalExperience} 
            />
            <InfoField 
                label="Available Days" 
                value={tutorData.availableDays?.join(', ') || null} 
            />
            <InfoField label="Available Time" value={tutorData.availableTime} />
            <InfoField label="Location (Current)" value={tutorData.location} />
            <div className="flex flex-col space-y-0.5">
                <strong className="text-xs uppercase tracking-wider text-gray-500">Expected Salary</strong>
                <span className="text-gray-800 text-sm font-medium">
                    {tutorData.expectedSalary ? <span className="text-green-600 font-bold">{tutorData.expectedSalary} BDT</span> : <span className="text-gray-400 italic">N/A</span>}
                </span>
            </div>
            <InfoField 
                label="Preferred Locations" 
                value={tutorData.preferredLocations?.join(', ') || null} 
            />
            <InfoField label="Place of Tutoring" value={tutorData.placeOfTutoring} />
            <div className="sm:col-span-2">
                <InfoField 
                    label="Preferred Classes" 
                    value={tutorData.preferredClasses?.join(', ') || null} 
                />
            </div>
            <div className="sm:col-span-2">
                <InfoField 
                    label="Preferred Subjects" 
                    value={tutorData.preferredSubjects?.join(', ') || null} 
                />
            </div>
            <div className="sm:col-span-2">
                <InfoField 
                    label="Tutoring Style" 
                    value={tutorData.tutoringStyle?.join(', ') || null} 
                />
            </div>
        </div>
    </section>
);


// --- Main View Component ---

const TutorProfileView = ({ 
    tutorData, 
    loading, 
    error, 
    handleGoBack,
    primaryColor, // e.g., bg-indigo-600
    hoverColor,   // e.g., hover:bg-indigo-700
    focusRingColor, // e.g., focus:ring-indigo-500
    sectionHeaderColor, // e.g., bg-gray-700
    profileImageFallback,
    renderProfileLink
}) => {
    // Determine profile completion status for styling
    const completion = tutorData.profileCompletion || 0;
    const completionStyle = completion >= 80 ? 'bg-green-500' : completion >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    const completionRingColor = completion >= 80 ? 'border-green-400' : completion >= 50 ? 'border-yellow-400' : 'border-red-400';
    
    // Defaulting primary color in case props are missing
    const defaultPrimaryColor = primaryColor || 'bg-indigo-600';
    const defaultHoverColor = hoverColor || 'hover:bg-indigo-700';
    const defaultFocusRingColor = focusRingColor || 'focus:ring-indigo-500';
    const defaultSectionHeaderColor = sectionHeaderColor || 'bg-gray-700';


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-gray-100 bg-slate-800">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading profile...
            </div>
        );
    }

    if (error && (!tutorData.name || tutorData.name === "Loading...")) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-xl bg-slate-800 text-white p-8 text-center">
                <FaExclamationTriangle className="text-red-500 text-5xl mb-4" />
                <p className="text-red-400 font-semibold mb-6">Error: {error}</p>
                <button 
                    onClick={handleGoBack} 
                    className={`mt-4 px-6 py-3 text-white ${defaultPrimaryColor} rounded-lg ${defaultHoverColor} transition-colors shadow-lg`}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8 font-roboto flex flex-col items-center text-gray-800">
            <div className="w-full max-w-4xl">
                
                {/* Header and Back Button */}
                <div className="flex justify-start mb-6">
                    <Link
                        to="/tutor-dashboard"
                        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white ${defaultPrimaryColor} rounded-full ${defaultHoverColor} transition-colors focus:outline-none focus:ring-2 ${defaultFocusRingColor} focus:ring-offset-2 shadow-md`}
                    >
                        <FaArrowLeft />
                        Back to Dashboard
                    </Link>
                </div>

                {/* Centered Top Profile Card */}
                <div className="w-full mb-8 flex justify-center">
                    <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl border-t-8 border-indigo-500">
                        <div className="flex flex-col items-center">
                            
                            {/* Profile Image and Name */}
                            <div className={`w-36 h-36 rounded-full border-4 ${completionRingColor} p-1 mb-4 relative`}>
                                <img 
                                    src={tutorData.profileImageUrl || profileImageFallback} 
                                    alt="Profile" 
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = profileImageFallback; 
                                    }} 
                                    className="w-full h-full rounded-full object-cover shadow-inner" 
                                />
                                <div className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white ${completionStyle} border-2 border-white text-xs font-bold`}>
                                    {completion}%
                                </div>
                            </div>

                            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{tutorData.name || "Tutor Name"}</h1>
                            <p className="text-sm text-gray-500 mb-4">Tutor ID: {tutorData.tutorId}</p>

                            {/* Completion Bar (Simplified to rely on ring) */}
                            {/* Optional: If you still want the bar, uncomment and adjust styling */}
                            {/* <div className="mb-5 w-full px-4">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className={`${completionStyle} h-2.5 rounded-full transition-all duration-500`} 
                                        style={{ width: `${tutorData.profileCompletion}%` }}
                                    ></div>
                                </div>
                            </div>
                            */}
                            
                            {/* Edit Button */}
                            <Link 
                                to="/tutor/profile/edit" 
                                className={`w-full max-w-xs flex items-center justify-center gap-2 px-6 py-3 my-4 text-base font-semibold text-white ${defaultPrimaryColor} rounded-lg ${defaultHoverColor} transition-colors duration-200 focus:outline-none focus:ring-2 ${defaultFocusRingColor} focus:ring-offset-2 focus:ring-offset-white shadow-md hover:shadow-lg transform hover:scale-[1.01]`}
                            >
                                <FaEdit /> Update Profile
                            </Link>
                            
                            {/* Quick Contact Info */}
                            <div className="w-full space-y-3 text-sm text-gray-700 border-t border-gray-200 pt-5 mt-auto">
                                <div className="flex items-center justify-center gap-2">
                                    <FiMail className="text-indigo-500 flex-shrink-0 text-lg" /> 
                                    <span className="truncate text-gray-600 font-medium" title={tutorData.email}>{tutorData.email}</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <FiMapPin className="text-indigo-500 flex-shrink-0 text-lg" /> 
                                    <span className="break-words text-gray-600">{tutorData.location || "Location Not Set"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content sections */}
                <div className="space-y-8">
                    {error && tutorData.name && tutorData.name !== "Loading..." && (
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg shadow-sm" role="alert">
                            <div className="flex items-center">
                                <FaExclamationTriangle className="mr-3 text-lg" />
                                <span className="font-medium">Notice:</span> {error} Please update your profile.
                            </div>
                        </div>
                    )}

                    {/* Personal Information Section */}
                    <PersonalInfoSection 
                        tutorData={tutorData} 
                        sectionHeaderColor={defaultSectionHeaderColor}
                        renderProfileLink={renderProfileLink}
                    />

                    <EducationalInfoSection 
                        tutorData={tutorData}
                        sectionHeaderColor={defaultSectionHeaderColor}
                    />
                    <TuitionInfoSection 
                        tutorData={tutorData}
                        sectionHeaderColor={defaultSectionHeaderColor}
                    />
                </div>
            </div>
        </div>
    );
};

export default TutorProfileView;