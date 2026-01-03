import React from 'react';
import TinderCard from 'react-tinder-card';
import { FaStar, FaMoneyBillWave, FaClock, FaExclamationTriangle, FaBriefcase } from 'react-icons/fa';
import { IoClose, IoCheckmark } from "react-icons/io5";

const DetailItemGolden = ({ value, icon = null, transparent = false }) => (
    <div className="w-full text-center overflow-hidden">
        <p className={`text-base sm:text-lg md:text-xl text-amber-50 leading-snug break-words py-1.5 px-2 ${!transparent ? 'bg-black/20 rounded-lg shadow-md' : ''}`}>
            {icon && <span className="mr-1.5 align-middle">{icon}</span>}
            {value || <span className="italic text-amber-200">Not Provided</span>}
        </p>
    </div>
);

const FifaCardShell = ({ tutor, fallbackImage }) => {
    return (
        <>
            <style>{`
    .card-aspect-ratio-box {
        position: relative;
        width: 88%;
        margin: 0 auto;
        height: 0;
        padding-bottom: 170%;
        background-image: url('/tt-card2.png');
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        user-select: none;
    }
    .card-content-shell {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        padding: 1.25rem 0.75rem;
        font-family: 'Saira Semi Condensed', sans-serif;
    }
`}</style>

            <div className="card-aspect-ratio-box">
                <div className="card-content-shell">
                    <div className="flex flex-col items-center pt-2 pb-4 flex-shrink-0">
                        <img
                            src={tutor.profileImageUrl || fallbackImage(tutor.name)}
                            alt={tutor.name}
                            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-amber-200 shadow-lg"
                            onError={(e) => { e.target.src = fallbackImage(tutor.name); }}
                        />
                    </div>
                    <div className="flex-grow flex flex-col justify-center items-center text-center space-y-2 px-1 overflow-hidden">
                        <h2 className="w-full text-2xl sm:text-3xl font-bold text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">{tutor.name}</h2>
                        <DetailItemGolden value={`${tutor.university}`} />
                        <DetailItemGolden value={`${tutor.department} -- GPA  ${tutor.grade}`} />
                        <DetailItemGolden value={tutor.location} />
                        <DetailItemGolden
                            value={tutor.expectedSalary ? `Min. Expected Salary : ${tutor.expectedSalary} BDT` : 'Salary: Negotiable'}
                            icon={<FaMoneyBillWave className="text-green-300 inline mr-1.5 text-sm" />}
                        />
                        <DetailItemGolden
                            value={tutor.availableTime || 'Time: Not Specified'}
                            icon={<FaClock className="text-blue-300 inline mr-1.5 text-sm" />}
                        />
                        <DetailItemGolden value={tutor.rating ? `Rating : ${tutor.rating.toFixed(2)} / 5.00` : 'Rating : N/A'} icon={<FaStar className="text-yellow-200 inline mr-1 text-base" />} />
                        <DetailItemGolden value={tutor.sscInfo} />
                        <DetailItemGolden value={tutor.hscInfo} />
                        <DetailItemGolden
                            transparent={true}
                            value={tutor.experience_years != null ? `Experience: ${tutor.experience_years} year${tutor.experience_years !== 1 ? 's' : ''}` : 'Experience: N/A'}
                            icon={<FaBriefcase className="text-amber-100 inline mr-1.5 text-sm" />}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const RecommendedTutorsView = ({
    tutors,
    loading,
    error,
    childRefs,
    onSwipe,
    outOfFrame,
    triggerSwipe,
    currentIndex,
    showLoginPrompt,
    handleLoginRedirect,
    showAcceptConfirmModal,
    tutorToConfirm,
    confirmAcceptTutor,
    cancelAcceptTutor,
    uiFeedbackMessage,
    tutorProfileImageFallback,
    isBrowsePage
}) => {
    if (loading) return <div className="flex justify-center items-center min-h-screen text-xl bg-slate-800 text-gray-300">Loading Tutors...</div>;
    if (error && !showLoginPrompt && !showAcceptConfirmModal) { return <div className="flex justify-center items-center min-h-screen text-xl text-red-400 bg-slate-800 p-4 text-center">Error: {error}</div>; }

    return (
        <div className={`w-full min-h-screen bg-slate-800 flex flex-col justify-center items-center p-4 overflow-hidden`}>

            <h1 className="text-3xl sm:text-4xl font-bold text-amber-400 mb-6 sm:mb-8 text-center">{isBrowsePage ? 'Browse All Tutors from Toppers Trust' : 'Recommended Tutors from Toppers Trust'}</h1>

            {showLoginPrompt && (<div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100] p-4"> <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm"> <h3 className="text-lg font-semibold mb-3 text-gray-800">Login Required</h3> <p className="text-sm text-gray-600 mb-4">You need to be logged in to select tutors.</p> <button onClick={handleLoginRedirect} className="w-full bg-[#6344cc] text-white py-2 px-4 rounded-md hover:bg-[#5238a8] transition-colors"> Go to Login / Sign Up </button> <button onClick={() => {}} className="mt-2 text-xs text-gray-500 hover:underline"> Dismiss </button> </div> </div>)}
            {showAcceptConfirmModal && tutorToConfirm && (<div className="fixed inset-0 bg-purple bg-opacity-75 flex items-center justify-center z-[100] p-4"> <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-gray-800"> <div className="flex items-start mb-3"> <FaExclamationTriangle className="text-yellow-500 text-2xl mr-3 mt-1 flex-shrink-0" /> <h3 className="text-xl font-semibold">Confirmation!!!</h3> </div> <p className="text-sm text-gray-700 mb-2"> You're expressing interest in SuperTutor: <strong className="text-[#6344cc]">{tutorToConfirm.name}</strong>. </p> <p className="text-sm text-gray-600 mb-6"> We’ll reach out to the tutor and let them know you’re interested in hiring them. Are you sure you wish to proceed? </p> <div className="flex justify-end gap-3"> <button onClick={cancelAcceptTutor} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400" > No, Not Now </button> <button onClick={confirmAcceptTutor} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" > Yes, Select Tutor </button> </div> </div> </div>)}
            {uiFeedbackMessage && (<div className={`fixed top-5 left-1/2 -translate-x-1/2 z-[110] p-3 rounded-md shadow-lg text-white text-sm ${uiFeedbackMessage.type === 'error' ? 'bg-red-600' : 'bg-green-600'} transition-all duration-300 ease-out opacity-100 translate-y-0`}> {uiFeedbackMessage.text} </div>)}

            <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center">
                <div className="w-full relative">
                    <div style={{ paddingBottom: '155.56%' }} />

                    {tutors.length > 0 ? (
                        tutors.map((tutor, index) => (
                            <TinderCard
                                ref={childRefs[index]}
                                className='absolute inset-0'
                                key={tutor.id}
                                onSwipe={(dir) => onSwipe(dir, tutor.id, tutor.name, index)}
                                onCardLeftScreen={() => outOfFrame(tutor.id, tutor.name, index)}
                                preventSwipe={['up', 'down']}
                                swipeRequirementType="position"
                                swipeThreshold={80}
                            >
                                <FifaCardShell tutor={tutor} fallbackImage={tutorProfileImageFallback} />
                            </TinderCard>
                        ))
                    ) : (
                        !loading &&
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-gray-400 text-xl p-4 bg-slate-700/80 rounded-2xl">
                            <span className="font-semibold">No {isBrowsePage ? 'tutors' : 'recommended tutors'} available right now.</span>
                            <span className="text-base mt-2">Please check back later!</span>
                        </div>
                    )}
                </div>

                {tutors.length > 0 && currentIndex >= 0 && (
                    <div className="flex justify-around w-full mt-6">
                        <div className="flex flex-col items-center">
                            <button onClick={() => triggerSwipe('left')} className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-red-700/30 rounded-full border-2 border-red-700/60 text-red-300/90 hover:bg-red-700/40 active:bg-red-700/50 transition-colors shadow-lg" aria-label="Decline" > <IoClose size={30} className="opacity-90" /> </button>
                            <span className="mt-2 text-sm font-semibold text-red-400">REJECT</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <button onClick={() => triggerSwipe('right')} className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-green-700/30 rounded-full border-2 border-green-700/70 text-green-300/90 hover:bg-green-700/40 active:bg-green-700/50 transition-colors shadow-lg" aria-label="Accept" > <IoCheckmark size={30} className="opacity-90" /> </button>
                            <span className="mt-2 text-sm font-semibold text-green-400">ACCEPT</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecommendedTutorsView;
