import React from 'react';
import TinderCard from 'react-tinder-card';
import { 
    FaMapMarkerAlt, FaVenusMars, FaStar, FaBriefcase, FaBook, FaGraduationCap,
    FaUndo, FaClock, FaDollarSign, FaPhone, FaEnvelope, FaArrowLeft
} from 'react-icons/fa';
import { IoClose, IoCheckmark } from "react-icons/io5";
import { useMediaBrowseTutorController } from '../control/MediaBrowseTutorController';

const getProfileImageFallback = (tutorName) => {
    return "https://placehold.co/200x200/6344cc/FFF?text=" +
        (tutorName ? tutorName.split(' ').map(n => n[0]).join('').substring(0, 2) : "T");
};

const MediaBrowseTutorView = () => {
    const c = useMediaBrowseTutorController();

    if (c.loading && c.tutors.length === 0) {
        return <div className="flex justify-center items-center min-h-screen text-xl bg-slate-800 text-gray-300">Loading Tutors...</div>;
    }
    
    if (c.error) {
        return <div className="flex justify-center items-center min-h-screen text-xl text-red-400 bg-slate-800 p-4 text-center">Error: {c.error}</div>;
    }

    return (
        <div className={`w-full min-h-screen bg-slate-800 flex flex-col items-center p-4 overflow-hidden transition-colors duration-300
            ${c.swipeFeedback === 'left' ? 'bg-red-700/40' : ''} 
            ${c.swipeFeedback === 'right' ? 'bg-green-700/40' : ''}
        `}>

            {/* DASHBOARD BUTTON */}
            <div className="w-full max-w-md mb-3 flex justify-start">
                <button 
                    onClick={() => c.navigate('/media-dashboard')} 
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-colors font-medium text-sm"
                >
                    <FaArrowLeft size={14} />
                    Go to Dashboard
                </button>
            </div>

            {/* FILTER UI */}
            <div className="w-full max-w-md mb-4 flex items-center space-x-2">
                <input
                    type="text"
                    value={c.filters.location}
                    onChange={(e) => c.setFilters({ ...c.filters, location: e.target.value })}
                    placeholder="Filter by Location..."
                    className="flex-grow px-2.5 py-1.5 text-xs bg-slate-600 text-gray-100 border border-slate-500 rounded-md placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                />
                <select
                    value={c.filters.gender}
                    onChange={(e) => c.setFilters({ ...c.filters, gender: e.target.value })}
                    className="px-2.5 py-1.5 text-xs bg-slate-600 text-gray-100 border border-slate-500 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                >
                    <option value="any">Any Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <button 
                    onClick={() => c.setFilters({ location: '', gender: 'any' })} 
                    title="Reset Filters"
                    className="p-1.5 text-gray-300 hover:text-indigo-300 focus:outline-none bg-slate-600 border border-slate-500 rounded-md shadow-sm"
                >
                    <FaUndo size={14} />
                </button>
            </div>

            {/* LOGIN PROMPT */}
            {c.showLoginPrompt && (
                 <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
                     <div className="bg-slate-700 p-6 rounded-lg shadow-xl text-center max-w-sm border border-slate-600">
                         <h3 className="text-lg font-semibold mb-3 text-gray-100">Login Required</h3>
                         <p className="text-sm text-gray-300 mb-4">You need to be logged in to browse tutors.</p>
                         <button onClick={() => c.navigate('/')} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">Go to Login</button>
                         <button onClick={() => c.setShowLoginPrompt(false)} className="mt-2 text-xs text-gray-400 hover:underline">Dismiss</button>
                     </div>
                 </div>
            )}

            {/* CARD STACK */}
            <div className="w-full max-w-md h-[70vh] sm:h-[65vh] relative">
                {c.tutors.length > 0 && c.tutors.map((tutor, index) => (
                    <TinderCard
                        ref={c.childRefs[index]}
                        className='absolute inset-0 cursor-grab'
                        key={tutor.id}
                        onSwipe={(dir) => c.handleSwipe(dir, tutor, index)}
                        preventSwipe={['up', 'down']}
                    >
                        <div className="select-none relative bg-gradient-to-br from-[#3a394d] to-[#2c2b38] text-white h-full w-full rounded-2xl shadow-xl p-5 flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                            {/* Header with name and photo */}
                            <div className="mb-3 text-center flex-shrink-0">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-2 leading-tight">{tutor.displayName}</h2>
                                <div className="flex justify-center items-center space-x-2 text-xs text-gray-300">
                                    {tutor.gender && <span className="flex items-center gap-1"><FaVenusMars size={12} />{tutor.gender}</span>}
                                    {tutor.experience_years && <span className="flex items-center gap-1"><FaBriefcase size={12} />{tutor.experience_years} yrs exp</span>}
                                </div>
                            </div>

                            {/* Photo Section */}
                            <div className="flex flex-grow justify-center items-center py-3 my-2 w-full">
                                <img 
                                    src={tutor.photoUrl || getProfileImageFallback(tutor.displayName)} 
                                    alt={tutor.displayName} 
                                    className="h-40 sm:h-48 max-h-full w-auto object-cover rounded-lg shadow-md" 
                                    onError={(e) => { e.target.src = getProfileImageFallback(tutor.displayName); }} 
                                />
                            </div>

                            {/* Tutor Details Grid */}
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs mb-2 px-1 flex-shrink-0">
                                <DetailItem icon={<FaMapMarkerAlt />} label="Location" value={tutor.location} />
                                <DetailItem icon={<FaStar />} label="Rating" value={tutor.rating ? `${tutor.rating}/5` : 'N/A'} />
                                <DetailItem icon={<FaGraduationCap />} label="Qualification" value={tutor.qualification ? tutor.qualification.substring(0, 15) : 'N/A'} />
                                <DetailItem icon={<FaBook />} label="Medium" value={tutor.medium || 'N/A'} />
                                {tutor.expected_salary && <DetailItem icon={<FaDollarSign />} label="Expected Salary" value={`BDT ${tutor.expected_salary}`} />}
                                {tutor.phone && <DetailItem icon={<FaPhone />} label="Phone" value={tutor.phone.substring(0, 10)} />}
                            </div>

                            {/* Preferred Subjects */}
                            {tutor.preferred_subjects && (
                                <div className="text-xs mb-2 px-1 flex-shrink-0">
                                    <span className="block text-gray-300 leading-tight mb-1">Subjects</span>
                                    <div className="flex flex-wrap gap-1">
                                        {tutor.preferred_subjects.split(',').slice(0, 3).map((subject, idx) => (
                                            <span key={idx} className="bg-indigo-600/50 px-2 py-0.5 rounded text-gray-200 text-[10px]">{subject.trim().substring(0, 12)}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Preferred Classes */}
                            {tutor.preferred_classes && (
                                <div className="text-xs mb-2 px-1 flex-shrink-0">
                                    <span className="block text-gray-300 leading-tight mb-1">Classes</span>
                                    <span className="text-gray-100">{tutor.preferred_classes}</span>
                                </div>
                            )}

                            <div className="text-center text-xs text-gray-300 border-t border-gray-600 pt-2 flex justify-between items-center px-2 flex-shrink-0">
                                <span>← Swipe Left to Reject</span>
                                <span>Right Swipe to Accept →</span>
                            </div>

                            {c.acceptedTutorId === tutor.id && c.swipeFeedback === 'right' && (
                                <div className="absolute inset-0 bg-green-600 bg-opacity-70 flex items-center justify-center rounded-2xl pointer-events-none">
                                    <span className="text-white text-3xl font-bold border-4 border-white rounded px-4 py-2">ACCEPTED</span>
                                </div>
                            )}
                        </div>
                    </TinderCard>
                ))}

                {/* EMPTY STATE */}
                {!c.loading && (c.tutors.length === 0 || (c.tutors.length > 0 && c.currentIndex < 0)) && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-400 text-xl p-4 bg-slate-700/80 rounded-2xl border-2 border-dashed border-slate-600">
                        <span className="font-semibold">No tutors match your filters.</span>
                        <span className="text-base mt-2">Try adjusting your search or reset filters.</span>
                    </div>
                )}
            </div>

            {/* ACTION BUTTONS */}
            {c.tutors.length > 0 && c.currentIndex >= 0 && (
                 <div className="flex justify-between w-full max-w-xs sm:max-w-sm mt-6 sm:mt-8">
                      <div className="flex flex-col items-center">
                          <button onClick={() => c.manualSwipe('left')} className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-700/20 rounded-full border-2 border-red-600/70 text-red-400 hover:bg-red-700/30 active:bg-red-700/40 transition-colors shadow-lg" aria-label="Reject">
                            <IoClose size={30} className="opacity-90"/>
                          </button>
                          <span className="mt-2 text-sm font-semibold text-red-400">REJECT</span>
                      </div>
                      <div className="flex flex-col items-center">
                          <button onClick={() => c.manualSwipe('right')} className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-700/20 rounded-full border-2 border-green-600/70 text-green-400 hover:bg-green-700/30 active:bg-green-700/40 transition-colors shadow-lg" aria-label="Accept">
                            <IoCheckmark size={30} className="opacity-90"/>
                          </button>
                          <span className="mt-2 text-sm font-semibold text-green-400">ACCEPT</span>
                      </div>
                 </div>
            )}
        </div>
    );
};

const DetailItem = ({ icon, label, value }) => (
    <div className="flex items-start gap-1">
        <span className="text-gray-300 mt-0.5 flex-shrink-0 text-[10px]">{icon}</span>
        <div>
            <span className="block text-[10px] text-gray-300 leading-tight">{label}</span>
            <strong className="text-gray-50 text-xs leading-tight">{String(value) || 'N/A'}</strong>
        </div>
    </div>
);

export default MediaBrowseTutorView;
