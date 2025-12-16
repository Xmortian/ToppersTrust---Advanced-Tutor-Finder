

import React, { useState } from 'react'; // Only basic React hooks remain
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';
// No direct supabase import needed here anymore

// Icons (View elements)
import { FaCalendarAlt, FaUsers, FaMoneyBillWave, FaBook, FaMapMarkerAlt, FaCreditCard, FaHome, FaUserGraduate, FaVenusMars, FaChalkboardTeacher, FaGraduationCap, FaUndo } from 'react-icons/fa';
import { IoClose, IoCheckmark } from "react-icons/io5";

// Import the custom Controller Hook
import { useJobCardController } from './useJobCardController.js'; 

// DetailItem is a pure presentation component, so it stays with the View
const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-1.5">
        <span className="text-gray-300 mt-0.5 flex-shrink-0 text-xs">{icon}</span>
        <div>
            <span className="block text-[11px] text-gray-300 leading-tight">{label}</span>
            <strong className="text-gray-50 text-sm leading-tight">{String(value) || 'N/A'}</strong>
        </div>
    </div>
);


const JobCard = () => {
    const navigate = useNavigate();
    
    // === Controller Integration ===
    const {
        jobs, loading, error, swipeFeedback, appliedJobId, showLoginPrompt,
        currentIndex, locationFilter, genderFilter, unfilteredJobs,
        childRefs, setLocationFilter, setGenderFilter, swiped, outOfFrame,
        swipe, handleLoginRedirect, handleResetFilters, formatDate
    } = useJobCardController(navigate);
    // =============================
    
    // --- View Rendering Logic ---

    if (loading && unfilteredJobs.length === 0) return <div className="flex justify-center items-center min-h-screen text-xl bg-slate-800 text-gray-300">Loading Jobs...</div>;
    if (error) return <div className="flex justify-center items-center min-h-screen text-xl text-red-400 bg-slate-800 p-4 text-center">Error: {error}</div>;

    return (
        <div className={`w-full min-h-screen bg-slate-800 flex flex-col items-center p-4 overflow-hidden transition-colors duration-300
            ${swipeFeedback === 'left' ? 'bg-red-700/40' : ''}
            ${swipeFeedback === 'right' ? 'bg-green-700/40' : ''}
        `}>

            {/* FILTER UI (View) - Handlers call Controller's setters */}
            <div className="w-full max-w-md mb-4 flex items-center space-x-2">
                <input
                    type="text"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    placeholder="Filter by Location..."
                    className="flex-grow px-2.5 py-1.5 text-xs bg-slate-600 text-gray-100 border border-slate-500 rounded-md placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
                <select
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-slate-600 text-gray-100 border border-slate-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                >
                    <option value="any">Any Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button
                    onClick={handleResetFilters} // Controller method
                    title="Reset Filters"
                    className="p-1.5 text-gray-300 hover:text-indigo-300 focus:outline-none bg-slate-600 border border-slate-500 rounded-md shadow-sm"
                >
                    <FaUndo size={14} />
                </button>
            </div>

            {/* Login Prompt Modal (View) */}
            {showLoginPrompt && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                    <div className="bg-slate-700 p-6 rounded-lg shadow-xl text-center max-w-sm border border-slate-600">
                        <h3 className="text-lg font-semibold mb-3 text-gray-100">Login Required</h3>
                        <p className="text-sm text-gray-300 mb-4">You need to be logged in to apply for jobs.</p>
                        <button onClick={handleLoginRedirect} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Go to Login</button>
                        <button onClick={() => handleLoginRedirect(false)} className="mt-2 text-xs text-gray-400 hover:underline">Dismiss</button>
                    </div>
                </div>
            )}

            {/* Tinder Card Stack (View) */}
            <div className="w-full max-w-md h-[70vh] sm:h-[65vh] relative">
                {jobs.length > 0 && jobs.map((job, index) => (
                    <TinderCard
                        ref={childRefs[index]} // Ref from Controller
                        className='absolute inset-0 cursor-grab'
                        key={job.id}
                        onSwipe={(dir) => swiped(dir, job.id, job.title, index)} // Controller method
                        onCardLeftScreen={() => outOfFrame(job.id, job.title, index)} // Controller method
                        preventSwipe={['up', 'down']}
                        swipeRequirementType="position"
                        swipeThreshold={100}
                    >
                        <div className="select-none relative bg-gradient-to-br from-[#3a394d] to-[#2c2b38] text-white h-full w-full rounded-2xl shadow-xl p-5 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                            {/* Card Content (View) */}
                            <div className="mb-3 text-center flex-shrink-0">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-2 leading-tight">{job.title}</h2>
                                <div className="flex justify-between items-center text-xs text-gray-300 px-2">
                                    <span>Code : {job.code}</span>
                                    <span>Posted : {formatDate(job.postedDate)}</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-2 px-1 flex-shrink-0">
                                <DetailItem icon={<FaHome />} label="Tuition Type" value={job.tuitionType} />
                                <DetailItem icon={<FaVenusMars />} label="Student Gender" value={job.studentGender} />
                                <DetailItem icon={<FaUserGraduate />} label="Preferred Tutor" value={job.preferredTutor} />
                                <DetailItem icon={<FaCalendarAlt />} label="Tutoring Time" value={job.tutoringTime} />
                                <DetailItem icon={<FaGraduationCap />} label="Class" value={job.class} />
                                <DetailItem icon={<FaChalkboardTeacher />} label="Medium" value={job.medium} />
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-2 mb-3 px-1 flex-shrink-0">
                                <DetailItem icon={<FaCalendarAlt />} label="Days/Week" value={job.daysPerWeek} />
                                <DetailItem icon={<FaUsers />} label="No. of Students" value={job.noOfStudents} />
                                <DetailItem icon={<FaMoneyBillWave />} label="Salary" value={job.salary ? `BDT ${job.salary}` : 'N/A'} />
                                <DetailItem icon={<FaBook />} label="Subjects" value={job.subjects.length > 0 ? job.subjects.join(', ') : 'N/A'} />
                                <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={job.location} />
                                <DetailItem icon={<FaCreditCard />} label="Payment Basis" value={job.paymentBasis} />
                            </div>
                             <div className="flex flex-grow justify-center items-center py-2 my-2 w-full">
                                <img src={job.logoUrl || "/previewremovebgpreview-1@2x.png"} alt="Logo" className="h-32 sm:h-40 max-h-full w-auto object-contain" onError={(e) => { e.target.style.display = 'none'; }} />
                             </div>
                            <div className="text-center text-xs text-gray-300 border-t border-gray-600 pt-3 flex justify-between items-center px-2 flex-shrink-0">
                                <span>← Swipe Left to Decline</span>
                                <span>Right Swipe to Apply →</span>
                            </div>
                            
                            {/* Applied Feedback (View) */}
                            {appliedJobId === job.id && swipeFeedback === 'right' && (
                                <div className="absolute inset-0 bg-green-600 bg-opacity-70 flex items-center justify-center rounded-2xl pointer-events-none">
                                    <span className="text-white text-3xl font-bold border-4 border-white rounded px-4 py-2">APPLIED</span>
                                </div>
                            )}
                        </div>
                    </TinderCard>
                ))}
                {!loading && (jobs.length === 0 || (jobs.length > 0 && currentIndex < 0)) && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-400 text-xl p-4 bg-slate-700/80 rounded-2xl border-2 border-dashed border-slate-600">
                        <span className="font-semibold">No jobs match your filters.</span>
                        <span className="text-base mt-2">Try adjusting your search or reset filters.</span>
                    </div>
                )}
            </div>

            {/* Action Buttons (View) */}
            {jobs.length > 0 && currentIndex >= 0 && (
                <div className="flex justify-between w-full max-w-xs sm:max-w-sm mt-6 sm:mt-8">
                    <div className="flex flex-col items-center">
                        <button onClick={() => swipe('left')} className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-700/20 rounded-full border-2 border-red-600/70 text-red-400 hover:bg-red-700/30 active:bg-red-700/40 transition-colors shadow-lg" aria-label="Decline"><IoClose size={30} className="opacity-90"/></button>
                        <span className="mt-2 text-sm font-semibold text-red-400">DECLINE</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <button onClick={() => swipe('right')} className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-700/20 rounded-full border-2 border-green-600/70 text-green-400 hover:bg-green-700/30 active:bg-green-700/40 transition-colors shadow-lg" aria-label="Accept"><IoCheckmark size={30} className="opacity-90"/></button>
                        <span className="mt-2 text-sm font-semibold text-green-400">ACCEPT</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobCard;