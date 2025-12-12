import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FiLogOut,       // For Sign Out (replacing FaSignOutAlt)
    FiUser,         // For Profile (replacing FaUser)
    FiBookmark,     // For Shortlist (replacing FaBookmark)
    FiPlusSquare,   // For Post Job (replacing FaPlusSquare)
    FiClipboard,    // For Posted Jobs (replacing FaClipboardList)
    FiSearch,       // New Icon for Search/Browse
    FiStar          // New Icon for Rating/Emphasis
} from 'react-icons/fi';

const navItems = [
    { name: "Profile", path: "/guardian/profile", bgColor: "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500", Icon: FiUser },
    { name: "Shortlist", path: "/tutor-card", bgColor: "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600", Icon: FiBookmark },
    { name: "Post Job", path: "/guardian/post-job", bgColor: "bg-gradient-to-br from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700", Icon: FiPlusSquare },
    { name: "Posted Jobs", path: "/guardian/previous-jobs", bgColor: "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500", Icon: FiClipboard },
];

const GuardianView = ({
    guardianData,
    loading,
    error,
    recommendedTutors,
    recommendationsLoading,
    recommendationsError,
    handleSignOut,
    profileImageFallback,
    tutorImageFallback,
    getFontSizeClass
}) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl bg-slate-800 text-gray-300">
                Loading Guardian Dashboard...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-800 font-roboto text-gray-100 pb-24">
            <header className="bg-[#3b394d] text-white p-4 md:p-6 shadow-md relative h-[14.875rem] flex items-center">
                <div className="container mx-auto grid grid-cols-3 items-start w-full gap-2">
                    
                    <div className="text-left">
                        <h2 className="text-base sm:text-lg font-semibold mb-1 text-red-300 opacity-90">
                            Guardian
                        </h2>
                        <h1 className={`font-bold leading-tight text-white ${getFontSizeClass(guardianData.name)}`}>
                            {guardianData.name}
                        </h1>
                    </div>

                    <div className="absolute left-1/2 top-[5.5rem] transform -translate-x-1/2 z-10">
                        <img
                            src={guardianData.profileImageUrl || profileImageFallback}
                            alt="Guardian Profile"
                            onError={(e) => { e.target.onerror = null; e.target.src = profileImageFallback; }}
                            className="w-[9rem] h-[12rem] sm:w-[10rem] sm:h-[14rem] md:w-[12rem] md:h-[16rem] rounded-[60px] border-4 border-white shadow-lg object-cover"
                        />
                    </div>
                    
                    <div className="text-right col-start-3">
                        <p className="text-base sm:text-lg text-gray-300 mb-1">Guardian ID</p>
                        <p className="text-3xl sm:text-4xl md:text-5xl font-bold">{guardianData.guardianId}</p>
                        <button
                            onClick={handleSignOut}
                            className="mt-3 text-sm text-gray-300 hover:text-white transition-colors flex items-center ml-auto"
                        >
                            {/* Icon used for sign out */}
                            <FiLogOut className="mr-1" /> Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <section className="relative py-8 px-4 pt-40 sm:pt-44 md:pt-52">
                <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 relative z-10">
                    {navItems.map((button) => (
                        <Link
                            key={button.name}
                            to={button.path}
                            className={`p-10 md:p-12 min-h-[10rem] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center text-center text-gray-800 font-semibold text-xl md:text-2xl ${button.bgColor}`}
                        >
                            {/* Icon added here */}
                            <button.Icon className="h-8 w-8 mb-3" />
                            <span>{button.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {error && (
                <div className="container mx-auto text-center py-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* --- Majestic Recommended Tutors Section --- */}
            <section className="pt-16 pb-12 px-4 mt-16 md:mt-24 lg:mt-32 bg-gray-900 shadow-inner">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-10 border-b border-indigo-500/50 pb-3">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-400 flex items-center">
                            <FiStar className="h-6 w-6 mr-3 text-yellow-400" /> Top Recommendations
                        </h3>
                        <Link to="/browse-tutors" className="text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors flex items-center">
                            Browse All <FiSearch className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    {recommendationsLoading && <p className="text-gray-400 text-center py-10">Loading elite tutors...</p>}
                    {!recommendationsLoading && recommendationsError && (
                        <p className="text-red-400 text-center py-10 bg-red-900/20 rounded-xl">Error loading recommendations: {recommendationsError}</p>
                    )}
                    {!recommendationsLoading && !recommendationsError && recommendedTutors.length === 0 && (
                        <p className="text-gray-400 text-center py-10 bg-gray-700/30 rounded-xl">No recommended tutors available. Try posting a job!</p>
                    )}
                    {!recommendationsLoading && !recommendationsError && recommendedTutors.length > 0 && (
                        <div className="max-w-6xl mx-auto">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                                {recommendedTutors.map((tutor) => (
                                    <Link
                                        key={tutor.id}
                                        to={`/browse-tutors`}
                                        className="group block bg-gray-800/80 p-3 rounded-xl shadow-xl border border-gray-700/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:bg-gray-700/90"
                                    >
                                        <div className="relative w-full h-32 mb-3 overflow-hidden rounded-lg shadow-md">
                                            <img
                                                src={tutor.imageUrl}
                                                alt={tutor.name}
                                                onError={(e) => { e.target.onerror = null; e.target.src = tutorImageFallback(); }}
                                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                            />
                                            {/* Optional Rating/Badge */}
                                            <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-md flex items-center">
                                                <FiStar className="h-3 w-3 mr-1" /> Top Tutor
                                            </div>
                                        </div>
                                        
                                        <h4 className="text-sm font-bold text-gray-100 group-hover:text-teal-400 truncate px-1 transition-colors">{tutor.name}</h4>
                                        <p className="text-xs text-gray-400 truncate px-1 mt-0.5">{tutor.subject || 'Not specified'}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default GuardianView;