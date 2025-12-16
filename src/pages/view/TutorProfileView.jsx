// TutorProfileView.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaInfoCircle, FaBookOpen, FaGraduationCap, FaArrowLeft } from 'react-icons/fa';
import { FiMail, FiMapPin } from 'react-icons/fi';

const TutorProfileView = ({ 
    tutorData, 
    loading, 
    error, 
    handleGoBack,
    primaryColor,
    hoverColor,
    focusRingColor,
    sectionHeaderColor,
    profileImageFallback,
    renderProfileLink
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl">
                Loading profile...
            </div>
        );
    }

    if (error && (!tutorData.name || tutorData.name === "Loading...")) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-xl text-red-600 p-4 text-center">
                <p>Error: {error}</p>
                <button 
                    onClick={handleGoBack} 
                    className={`mt-4 px-4 py-2 text-white ${primaryColor} rounded-md ${hoverColor}`}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-800 p-4 sm:p-6 lg:p-8 font-roboto flex flex-col items-center">
            {/* Back Button */}
            <div className="w-full max-w-lg mb-4 flex">
                <Link
                    to="/tutor-dashboard"
                    className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white ${primaryColor} rounded-lg ${hoverColor} transition-colors focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2`}
                >
                    <FaArrowLeft />
                    Back to Dashboard
                </Link>
            </div>

            {/* Centered Top Box */}
            <div className="w-full max-w-lg mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
                    <div className="flex flex-col items-center mb-5">
                        <img 
                            src={tutorData.profileImageUrl || profileImageFallback} 
                            alt="Profile" 
                            onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = profileImageFallback; 
                            }} 
                            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-gray-200 shadow-md object-cover mb-3" 
                        />
                        <p className="text-sm text-gray-600">Tutor ID: {tutorData.tutorId}</p>
                    </div>
                    
                    <div className="mb-5 w-full px-4">
                        <label className="text-sm font-medium text-gray-700 block text-center mb-1">
                            Profile Completed: {tutorData.profileCompletion}%
                        </label>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className={`${primaryColor} h-2.5 rounded-full`} 
                                style={{ width: `${tutorData.profileCompletion}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <Link 
                        to="/tutor/profile/edit" 
                        className={`w-full max-w-xs flex items-center justify-center gap-2 px-4 py-2.5 mb-5 text-sm font-medium text-white ${primaryColor} rounded-lg ${hoverColor} transition-colors duration-200 focus:outline-none focus:ring-2 ${focusRingColor} focus:ring-offset-2`}
                    >
                        <FaEdit /> Edit Profile
                    </Link>
                    
                    <div className="w-full space-y-2 text-sm text-gray-700 border-t border-gray-200 pt-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                            <FiMail className="text-gray-500 flex-shrink-0" /> 
                            <span className="truncate" title={tutorData.email}>{tutorData.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <FiMapPin className="text-gray-500 flex-shrink-0" /> 
                            <span className="break-words">{tutorData.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content sections */}
            <div className="container mx-auto max-w-4xl w-full">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-6">
                    {error && tutorData.name && tutorData.name !== "Loading..." && (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            <span className="font-medium">Notice:</span> {error} Some profile data might be incomplete.
                        </div>
                    )}

                    {/* Personal Information Section */}
                    <PersonalInfoSection 
                        tutorData={tutorData} 
                        sectionHeaderColor={sectionHeaderColor}
                        renderProfileLink={renderProfileLink}
                    />

                    {/* Educational Information Section */}
                    <EducationalInfoSection 
                        tutorData={tutorData}
                        sectionHeaderColor={sectionHeaderColor}
                    />

                    {/* Tuition Related Information Section */}
                    <TuitionInfoSection 
                        tutorData={tutorData}
                        sectionHeaderColor={sectionHeaderColor}
                    />
                </div>
            </div>
        </div>
    );
};

// Personal Information Section Component
const PersonalInfoSection = ({ tutorData, sectionHeaderColor, renderProfileLink }) => (
    <section>
        <div className={`${sectionHeaderColor} text-white px-4 py-2 rounded-t-lg flex items-center justify-between`}>
            <div className="flex items-center gap-2">
                <FaInfoCircle />
                <h2 className="text-lg font-semibold">Personal Information</h2>
            </div>
        </div>
        <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
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
                <strong className="block text-gray-600">Facebook Profile Link</strong>
                {renderProfileLink(tutorData.facebookProfile, "Facebook")}
            </div>
            <div className="sm:col-span-2">
                <strong className="block text-gray-600">Google Drive Link (Documents)</strong>
                {renderProfileLink(tutorData.driveLink, "Google Drive")}
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

// Educational Information Section Component
const EducationalInfoSection = ({ tutorData, sectionHeaderColor }) => {
    const hasUniInfo = tutorData.uniSchool || tutorData.uniGrade || tutorData.uniExamDegree;
    const hasHscInfo = tutorData.hscSchool || tutorData.hscGrade;
    const hasSscInfo = tutorData.sscSchool || tutorData.sscGrade;
    const hasAnyInfo = hasUniInfo || hasHscInfo || hasSscInfo;

    return (
        <section>
            <div className={`${sectionHeaderColor} text-white px-4 py-2 rounded-t-lg flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                    <FaGraduationCap />
                    <h2 className="text-lg font-semibold">Educational Information</h2>
                </div>
            </div>
            <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 space-y-6 text-sm">
                {hasUniInfo && (
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <h4 className="font-semibold text-base text-gray-800 mb-3">
                            University / Bachelors / Honors
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
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
                            <div className="sm:col-span-2">
                                <strong className="block text-gray-600">Currently Studying Here</strong>
                                <span className="text-gray-800">
                                    {tutorData.uniCurrentlyStudying ? 'Yes' : 'No'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {hasHscInfo && (
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <h4 className="font-semibold text-base text-gray-800 mb-3">
                            Higher Secondary (HSC)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <InfoField label="Institute" value={tutorData.hscSchool} />
                            <InfoField label="Grade/Result" value={tutorData.hscGrade} />
                        </div>
                    </div>
                )}

                {hasSscInfo && (
                    <div>
                        <h4 className="font-semibold text-base text-gray-800 mb-3">
                            Secondary (SSC)
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                            <InfoField label="Institute" value={tutorData.sscSchool} />
                            <InfoField label="Grade/Result" value={tutorData.sscGrade} />
                        </div>
                    </div>
                )}

                {!hasAnyInfo && (
                    <p className="text-gray-500 italic">No educational information provided.</p>
                )}
            </div>
        </section>
    );
};

// Tuition Information Section Component
const TuitionInfoSection = ({ tutorData, sectionHeaderColor }) => (
    <section>
        <div className={`${sectionHeaderColor} text-white px-4 py-2 rounded-t-lg flex items-center justify-between`}>
            <div className="flex items-center gap-2">
                <FaBookOpen />
                <h2 className="text-lg font-semibold">Tuition Related Information</h2>
            </div>
        </div>
        <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 space-y-3 text-sm">
            <div>
                <strong className="block text-gray-600 mb-1">Tutoring Method</strong>
                <p className="text-gray-800">
                    {tutorData.tutoringMethod || <span className="text-gray-500 italic">N/A</span>}
                </p>
            </div>
            <InfoField 
                label="Available Days" 
                value={tutorData.availableDays?.join(', ')} 
            />
            <InfoField label="Time" value={tutorData.availableTime} />
            <InfoField label="Location" value={tutorData.location} />
            <InfoField 
                label="Preferred Locations" 
                value={tutorData.preferredLocations?.join(', ')} 
            />
            <div>
                <strong className="block text-gray-600">Expected Salary</strong>
                <span className="text-gray-800">
                    {tutorData.expectedSalary ? `${tutorData.expectedSalary} BDT` : <span className="text-gray-500 italic">N/A</span>}
                </span>
            </div>
            <InfoField 
                label="Preferred Classes" 
                value={tutorData.preferredClasses?.join(', ')} 
            />
            <InfoField 
                label="Preferred Subjects" 
                value={tutorData.preferredSubjects?.join(', ')} 
            />
            <InfoField label="Place of Tutoring" value={tutorData.placeOfTutoring} />
            <InfoField 
                label="Tutoring Style" 
                value={tutorData.tutoringStyle?.join(', ')} 
            />
            <InfoField label="Total Experience" value={tutorData.totalExperience} />
        </div>
    </section>
);

// Reusable Info Field Component
const InfoField = ({ label, value, breakAll = false }) => (
    <div>
        <strong className="block text-gray-600">{label}</strong>
        <span className={`text-gray-800 ${breakAll ? 'break-all' : ''}`}>
            {value || <span className="text-gray-500 italic">N/A</span>}
        </span>
    </div>
);

export default TutorProfileView;