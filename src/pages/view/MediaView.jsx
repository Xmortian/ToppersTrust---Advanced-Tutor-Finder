import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut, X, User, Briefcase } from 'lucide-react';

// Helper component for notifications close button
const NotificationCloseButton = ({ onClick }) => (
    <button onClick={onClick} className="text-gray-400 hover:text-white text-lg leading-none p-1">
        <X className="h-4 w-4" />
    </button>
);

export default function MediaView(props) {
    const {
        mediaData,
        loading,
        error,
        notifications,
        unreadCount,
        showNotificationsPanel,
        notificationPanelRef,
        onNotificationBellClick,
        onSignOut,
        getFontSizeClass,
        profileImageFallback,
    } = props;

    // --- Loading State UI ---
    if (loading && !mediaData?.mediaId) {
        return <div className="flex justify-center items-center min-h-screen text-xl bg-slate-800 text-gray-300">Loading Media Dashboard...</div>;
    }

    // --- Error State UI ---
    if (error && !mediaData?.mediaId) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-xl text-red-400 bg-slate-800 p-4 text-center">
                <p>Error: {error}</p>
                <button onClick={() => window.location.href = '/'} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Go to Homepage</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-800 font-roboto text-gray-100 pb-16">
            
            {/* Header - Same design as Tutor/Guardian */}
            <header className="bg-gradient-to-r from-[#3a394d] to-[#585673] text-white p-4 md:p-6 shadow-md relative h-[14rem] sm:h-[14.875rem] flex items-center">
                <div className="container mx-auto grid grid-cols-3 items-start w-full gap-2">
                    {/* Name/Title Section */}
                    <div className="text-left">
                        <h2 className="text-base sm:text-lg font-semibold mb-1 text-red-300 opacity-90">Media Partner</h2>
                        <h1 className={`font-extrabold leading-normal text-white break-words ${getFontSizeClass(mediaData?.name)}`}>{mediaData?.name || "Media Name"}</h1>
                    </div>

                    {/* Profile Image */}
                    <div className="absolute left-1/2 top-[5rem] sm:top-[5.5rem] md:top-[6rem] transform -translate-x-1/2 z-10 flex-shrink-0">
                        <img
                            src={mediaData?.profileImageUrl || profileImageFallback}
                            alt="Media Profile"
                            onError={(e) => { e.target.onerror = null; e.target.src = profileImageFallback; }}
                            className="w-[8rem] h-[10.5rem] sm:w-[10rem] sm:h-[13rem] md:w-[12rem] md:h-[16rem] rounded-3xl border-4 border-white shadow-lg object-cover"
                        />
                    </div>

                    {/* ID and Controls Section */}
                    <div className="text-right col-start-3">
                        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white break-words">ID : {mediaData?.mediaId || 'N/A'}</p>
                        <div className="mt-1 sm:mt-3 flex items-center justify-end space-x-3 sm:space-x-4 relative">
                            {/* Notification Bell */}
                            <div className="relative">
                                <button id="notification-bell-button" onClick={onNotificationBellClick} className="text-gray-300 hover:text-white transition-colors p-1" aria-label="Notifications" disabled={loading}>
                                    <Bell className="text-lg sm:text-xl h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-[-2px] right-[-2px] block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-red-600 text-white text-[8px] sm:text-[9px] flex items-center justify-center ring-1 ring-white">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notification Panel */}
                                {showNotificationsPanel && (
                                    <div ref={notificationPanelRef} className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-700 border border-slate-600 rounded-md shadow-2xl z-50 text-left">
                                        <div className="p-3 border-b border-slate-600 flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-100">Notifications</h3>
                                            <NotificationCloseButton onClick={onNotificationBellClick} />
                                        </div>
                                        {notifications.length === 0 ? (
                                            <p className="text-xs p-3 text-center" style={{fontFamily: "'Algerian', 'Times New Roman', serif", color: '#ffcdd2'}}>
                                                No new notifications.
                                            </p>
                                        ) : (
                                            <ul className="max-h-64 overflow-y-auto divide-y divide-slate-600/50">
                                                {notifications.map(notif => (
                                                    <li key={notif.id} className={`p-3 text-xs hover:bg-slate-600/70 ${notif.isRead ? '' : 'bg-slate-600'}`} style={{fontFamily: "'Algerian', 'Times New Roman', serif"}}>
                                                        <p className="mb-0.5 font-normal" style={{color: '#ffcdd2'}}>{notif.message}</p>
                                                        {notif.timestamp && (<p className="text-[10px] text-gray-400 font-normal">{new Date(notif.timestamp).toLocaleString()}</p>)}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Sign Out Button */}
                            <button onClick={onSignOut} className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors flex items-center" disabled={loading}>
                                <LogOut className="mr-1 text-sm sm:text-base h-4 w-4"/> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Navigation Section - Same style as Tutor/Guardian */}
            <section className="relative py-8 px-4 pt-40 sm:pt-44 md:pt-56">
                <div className="container mx-auto flex justify-center items-center gap-8 sm:gap-12 md:gap-16 relative z-10 flex-wrap">
                    {[
                        { name: "Profile", path: "/media/profile", isLink: true, bgColor: "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800" },
                        { name: "Post Job", path: "/media/post-job", isLink: true, bgColor: "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-gray-800" },
                        { name: "Browse Tutors", path: "/media/browse-tutors", isLink: true, bgColor: "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-gray-800" },

                    ].map((button) => (
                        button.isLink ? (
                            <Link key={button.name} to={button.path} className={`w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center text-center font-semibold text-xl md:text-2xl ${button.bgColor}`}>
                                <span>{button.name}</span>
                            </Link>
                        ) : (
                            <a key={button.name} href={button.path} className={`w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center text-center font-semibold text-xl md:text-2xl ${button.bgColor}`}>
                                <span>{button.name}</span>
                            </a>
                        )
                    ))}
                </div>
            </section>

            {/* Error Message Section */}
            {error && mediaData?.mediaId && (
                <div className="container mx-auto text-center py-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}
        </div>
    );
}