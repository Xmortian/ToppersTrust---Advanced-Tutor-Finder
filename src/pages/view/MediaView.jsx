import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut, X, User, Briefcase, Search, FileText, SearchCheckIcon } from 'lucide-react';

// Helper component for notifications close button
const NotificationCloseButton = ({ onClick }) => (
    <button onClick={onClick} className="text-gray-400 hover:text-white text-lg leading-none p-1">
        <X className="h-4 w-4" />
    </button>
);

// Define aesthetic navigation buttons for the Media partner
const mediaNavItems = [
    // Updated to use grayscale gradients for a less vibrant look
    { name: "Profile", path: "/media/profile", Icon: User, bgColor: "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white" },
    { name: "Post Job", path: "/media/post-job", Icon: FileText, bgColor: "bg-gradient-to-br from-slate-600 to-gray-700 hover:from-slate-500 hover:to-gray-600 text-white" },
    { name: "From Admins", path: "/media/post-job", Icon: SearchCheckIcon , bgColor: "bg-gradient-to-br from-slate-600 to-gray-700 hover:from-slate-500 hover:to-gray-600 text-white" },
    { name: "Browse Tutors", path: "/media/browse-tutors", Icon: Search, bgColor: "bg-gradient-to-br from-neutral-500 to-slate-600 hover:from-neutral-400 hover:to-slate-500 text-white" },

];

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
        <div className="min-h-screen bg-gray-900 font-roboto text-gray-100 pb-16">
            
            {/* Header - Subtle Greyscale Gradient */}
            <header className="bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 md:p-6 shadow-2xl relative h-[15rem] sm:h-[16rem] flex items-center border-b-4 border-gray-600/50">
                <div className="container mx-auto grid grid-cols-3 items-start w-full gap-2">
                    {/* Name/Title Section */}
                    <div className="text-left pt-2">
                        {/* FIX: Removed duplicate 'className' attribute */}
                        <h2 className="text-sm sm:text-lg font-semibold mb-1 text-gray-400">Media Partner</h2>
                        <h1 className={`font-extrabold leading-normal text-white break-words ${getFontSizeClass(mediaData?.name)}`}>{mediaData?.name || "Media Name"}</h1>
                    </div>

                    {/* Profile Image */}
                    <div className="absolute left-1/2 top-[5.5rem] transform -translate-x-1/2 z-10 flex-shrink-0">
                        <img
                            src={mediaData?.profileImageUrl || profileImageFallback}
                            alt="Media Profile"
                            onError={(e) => { e.target.onerror = null; e.target.src = profileImageFallback; }}
                            // Subtle border color
                            className="w-[9rem] h-[12rem] sm:w-[11rem] sm:h-[14rem] rounded-3xl border-4 border-gray-500 shadow-xl object-cover transform hover:scale-[1.03] transition-transform duration-300"
                        />
                    </div>

                    {/* ID and Controls Section */}
                    <div className="text-right col-start-3 pt-2">
                        <p className="text-xl sm:text-2xl font-bold text-gray-400">ID:</p>
                        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white break-words">{mediaData?.mediaId || 'N/A'}</p>
                        <div className="mt-2 flex items-center justify-end space-x-3 relative">
                            {/* Notification Bell */}
                            <div className="relative">
                                {/* Subdued accent color for button */}
                                <button id="notification-bell-button" onClick={onNotificationBellClick} className="text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700/50" aria-label="Notifications" disabled={loading}>
                                    <Bell className="h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 block h-3.5 w-3.5 transform rounded-full bg-red-600 text-white text-[8px] flex items-center justify-center ring-1 ring-gray-900">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notification Panel */}
                                {showNotificationsPanel && (
                                    <div ref={notificationPanelRef} className="absolute right-0 mt-2 w-72 sm:w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-50 text-left">
                                        <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-100">Notifications</h3>
                                            <NotificationCloseButton onClick={onNotificationBellClick} />
                                        </div>
                                        {notifications.length === 0 ? (
                                            <p className="text-xs p-3 text-gray-400 text-center">
                                                No new notifications.
                                            </p>
                                        ) : (
                                            <ul className="max-h-64 overflow-y-auto divide-y divide-gray-700">
                                                {notifications.map(notif => (
                                                    <li key={notif.id} className={`p-3 text-xs hover:bg-gray-700 transition-colors ${notif.isRead ? '' : 'bg-gray-700/70'}`}>
                                                        <p className="mb-0.5 font-normal text-gray-200">{notif.message}</p>
                                                        {notif.timestamp && (<p className="text-[10px] text-gray-500 font-normal">{new Date(notif.timestamp).toLocaleString()}</p>)}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Sign Out Button */}
                            <button onClick={onSignOut} className="text-sm text-gray-300 hover:text-white transition-colors flex items-center font-medium p-2 rounded-full hover:bg-gray-700/50" disabled={loading}>
                                <LogOut className="mr-1 h-5 w-5"/> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Navigation Section - Greyscale Cards */}
            <section className="relative py-8 px-4 pt-44 sm:pt-48 md:pt-56">
                <div className="container mx-auto flex justify-center items-center gap-8 sm:gap-10 md:gap-12 relative z-10 flex-wrap">
                    {mediaNavItems.map((button) => (
                        <Link 
                            key={button.name} 
                            to={button.path} 
                            className={`w-52 h-52 sm:w-64 sm:h-64 rounded-3xl shadow-2xl transition-all duration-500 transform hover:-translate-y-4 flex flex-col items-center justify-center text-center font-bold text-xl md:text-2xl ${button.bgColor} p-6 border-b-4 border-t-2 border-gray-500/20`}
                        >
                            <button.Icon className="h-12 w-12 mb-4 drop-shadow-md" />
                            <span>{button.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Error Message Section */}
            {error && mediaData?.mediaId && (
                <div className="container mx-auto text-center py-8">
                    <p className="text-red-400 bg-red-900/20 p-3 rounded-lg">{error}</p>
                </div>
            )}
        </div>
    );
}