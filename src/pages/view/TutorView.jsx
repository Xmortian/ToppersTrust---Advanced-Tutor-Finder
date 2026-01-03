import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// We assume the Supabase client ('supabase') is initialized and available globally 
// from your project's setup (e.g., in a main index file or context).

// --- ICON Definitions ---
const BullhornIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.885 3.012a.75.75 0 0 0-.877-.597C8.4 3.398 6.91 4.254 5.587 5.207c-1.258.852-2.31 1.942-3.222 3.176H1V21h4.5v-2.001c.754-.15 1.51-.278 2.266-.381.796-.104 1.583-.157 2.37-.168 1.411-.02 2.816.026 4.218.152.812.076 1.62.198 2.428.368 1.45.305 2.87.822 4.195 1.543l.888-1.559c-.482-.275-.98-.518-1.48-.737-.5-.219-1.002-.42-1.503-.604-1.282-.472-2.607-.74-3.954-.803-1.42-.066-2.825-.015-4.213.116-.83.076-1.656.208-2.478.384-.823.176-1.636.398-2.433.666V8.163l.894-.894c.83-.83 1.798-1.58 2.873-2.148 1.25-.66 2.652-1.127 4.102-1.298.24-.029.48-.046.72-.054.406-.013.811-.013 1.217.001a.75.75 0 0 0 .72-.614Z" />
    </svg>
);
const BackIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M11.03 14.73a.75.75 0 0 0 .02 1.06l1.25 1.25a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0 0-1.06l-7.5-7.5a.75.75 0 0 0-1.06 0l-1.25 1.25a.75.75 0 0 0-.02 1.06l3.89 3.9H3.75a.75.75 0 0 0 0 1.5h11.17l-3.89 3.9Z" clipRule="evenodd" />
    </svg>
);
import {
    FaBell,         
    FaSignOutAlt,     
    FaBullhorn,    
    FaTimes,          
    FaUser,         
    FaTh,             
    FaBriefcase       
} from 'react-icons/fa';

const NotificationCloseButton = ({ onClick }) => (
    <button onClick={onClick} className="text-gray-400 hover:text-white text-lg leading-none p-1">
        <FaTimes className="h-4 w-4" />
    </button>
);

const navItems = [
    { name: "Profile", path: "/tutor/profile", isLink: true, Icon: FaUser, styleClass: "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800" },
    // { name: "Dashboard", path: "/tutor-dashboard", isLink: false, Icon: FaTh, styleClass: "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-gray-800" },
    { name: "Job Board", path: "/job-card", isLink: true, Icon: FaBriefcase, styleClass: "bg-gradient-to-br from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800" },
    { name: "Dues", path: "/tutor/dues", isLink: true, Icon: FaBell, styleClass: "bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-gray-800"}
];


export default function TutorView(props) {
    const {
        tutorData,
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
        paymentLoading,
        paymentMessage: rawPaymentMessage,
        onAdvertiseClick,
    } = props;

    const paymentMessage = rawPaymentMessage || '';
    const isPaymentSuccess = paymentMessage.toLowerCase().includes('success');
    const paymentMessageClass = isPaymentSuccess
        ? 'text-green-400 font-semibold'
        : (paymentMessage ? 'text-red-400 font-semibold' : 'text-gray-400');

    if (loading && !tutorData.tutorId) {
        return <div className="flex justify-center items-center min-h-screen text-xl bg-slate-800 text-gray-300">Loading Tutor Dashboard...</div>;
    }

    if (error && !tutorData?.tutorId) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen text-xl text-red-400 bg-slate-800 p-4 text-center">
                <p>Error: {error}</p>
                <button onClick={() => window.location.href = '/'} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Go to Homepage</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-800 font-roboto text-gray-100 pb-16">
            
            <header className="bg-gradient-to-r from-[#3a394d] to-[#585673] text-white p-4 md:p-6 shadow-md relative h-[14rem] sm:h-[14.875rem] flex items-center">
                <div className="container mx-auto grid grid-cols-3 items-start w-full gap-2">
                    <div className="text-left">
                        <h2 className="text-base sm:text-lg font-semibold mb-1 text-red-300 opacity-90">Tutor</h2>
                        <h1 className={`font-extrabold leading-normal text-white break-words ${getFontSizeClass(tutorData?.name)}`}>{tutorData?.name}</h1>
                    </div>

                    <div className="absolute left-1/2 top-[5rem] sm:top-[5.5rem] md:top-[6rem] transform -translate-x-1/2 z-10 flex-shrink-0">
                        <img
                            src={tutorData?.profileImageUrl || profileImageFallback}
                            alt="Tutor Profile"
                            onError={(e) => { e.target.onerror = null; e.target.src = profileImageFallback; }}
                            className="w-[8rem] h-[10.5rem] sm:w-[10rem] sm:h-[13rem] md:w-[12rem] md:h-[16rem] rounded-3xl border-4 border-white shadow-lg object-cover"
                        />
                    </div>

                    <div className="text-right col-start-3">
                        <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white break-words">ID : {tutorData?.tutorId || 'N/A'}</p>
                        <div className="mt-1 sm:mt-3 flex items-center justify-end space-x-3 sm:space-x-4 relative">
                            <div className="relative">
                                <button id="notification-bell-button" onClick={onNotificationBellClick} className="text-gray-300 hover:text-white transition-colors p-1" aria-label="Notifications" disabled={loading}>
                                    <FaBell className="text-lg sm:text-xl h-5 w-5" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-[-2px] right-[-2px] block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-red-600 text-white text-[8px] sm:text-[9px] flex items-center justify-center ring-1 ring-white">
                                            {unreadCount > 9 ? '9+' : unreadCount}
                                        </span>
                                    )}
                                </button>

                                {showNotificationsPanel && (
                                    <div ref={notificationPanelRef} className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-700 border border-slate-600 rounded-md shadow-2xl z-50 text-left">
                                        <div className="p-3 border-b border-slate-600 flex justify-between items-center">
                                            <h3 className="text-sm font-semibold text-gray-100">Notifications</h3>
                                            <NotificationCloseButton onClick={onNotificationBellClick} />
                                        </div>
                                        {notifications.length === 0 ? (
                                            <p className="text-xs p-3 text-center" style={{fontFamily: "'Algerian', 'Times New Roman', serif', color: '#ffcdd2'"}}>
                                                No new notifications.
                                            </p>
                                        ) : (
                                            <ul className="max-h-64 overflow-y-auto divide-y divide-slate-600/50">
                                                {notifications.map(notif => (
                                                    // Original notification item styling restored
                                                    <li key={notif.id} className={`p-3 text-xs hover:bg-slate-600/70 ${notif.isRead ? '' : 'bg-slate-600'}`} style={{fontFamily: "Algerian, 'Times New Roman', serif"}}>
                                                        <p className="mb-0.5 font-normal" style={{color: '#ffcdd2'}}>{notif.message}</p>
                                                        {notif.timestamp && (<p className="text-[10px] text-gray-400 font-normal">{new Date(notif.timestamp).toLocaleString()}</p>)}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>

                            <button onClick={onSignOut} className="text-xs sm:text-sm text-gray-300 hover:text-white transition-colors flex items-center" disabled={loading}>
                                <FaSignOutAlt className="mr-1 text-sm sm:text-base h-4 w-4"/> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <section className="relative py-8 px-4 pt-40 sm:pt-44 md:pt-56">
                <div className="container mx-auto flex justify-center items-center gap-8 sm:gap-12 md:gap-16 relative z-10 flex-wrap">
                    {navItems.map((button) => {
                        // Card content structure reflecting original styling
                        const CardContent = (
                             <div className={`w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center text-center font-semibold text-xl md:text-2xl ${button.styleClass}`}>
                                {/* Icon added to original structure */}
                                <button.Icon className="h-12 w-12 sm:h-16 sm:w-16 mb-4 drop-shadow-lg" />
                                <span>{button.name}</span>
                            </div>
                        );

                        return button.isLink ? (
                            <Link key={button.name} to={button.path}>
                                {CardContent}
                            </Link>
                        ) : (
                            <a key={button.name} href={button.path}>
                                {CardContent}
                            </a>
                        );
                    })}
                </div>
            </section>

            {error && tutorData?.tutorId && (
                <div className="container mx-auto text-center py-4">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            <section className="py-8 px-4">
                <div className="container mx-auto text-center">
                    <button 
                        onClick={onAdvertiseClick} 
                        disabled={paymentLoading || loading || !tutorData?.tutorId}
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {paymentLoading 
                            ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Payment...
                                </>
                            )
                            : (
                                <>
                                    {/* FaBullhorn used for icon */}
                                    <FaBullhorn className="mr-3 text-xl h-6 w-6" /> ADVERTISE YOUR PROFILE (Pay ৳200)
                                </>
                            )}
                    </button>
                    {paymentMessage && (
                        <p className={`mt-4 text-sm ${paymentMessageClass}`}>{paymentMessage}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                        * Clicking "ADVERTISE" will initiate a payment redirect to SSLCommerz portal.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4 bg-slate-900/50">
                <div className="container mx-auto max-w-4xl rounded-xl shadow-2xl bg-slate-700 p-8">
                    <h2 className="text-3xl font-extrabold text-teal-400 mb-8 text-center border-b-2 border-teal-500/50 pb-2">
                        🌟 Why Become a Recommended Tutor?
                    </h2>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
                            <img
                                src={"/src/components/recc-tutor.png"}
                                alt="Example of a Recommended Tutor profile card highlighted with high priority"
                                className="rounded-xl shadow-xl border-4 border-teal-400 object-cover"
                            />
                        </div>

                        <div className="md:w-2/3 text-lg space-y-4 text-gray-200">
                            <p className="font-semibold text-gray-100">
                                {/* Highlighted Text as requested */}
                                <span className="text-amber-300 font-extrabold text-xl leading-relaxed bg-slate-600/50 p-1 rounded-md inline-block mb-2">
                                    If you become a “Recommended Tutor,” your profile will be specially highlighted to guardians and shown to them with higher priority.
                                </span>
                                {" "}This gives you a significant visibility advantage over other tutors and greatly increases your chances of receiving tuition offers.
                            </p>
                            <p className="text-sm text-gray-300 italic pt-2 border-t border-slate-600">
                                However, it does not guarantee 100% placement, as the final decision always rests with the guardian. Therefore, presenting a well-crafted profile, providing accurate information, and demonstrating strong teaching skills remain the most important factors.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}