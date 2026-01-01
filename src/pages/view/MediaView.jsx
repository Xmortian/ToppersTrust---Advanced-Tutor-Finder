import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Bell, LogOut, X, User, Search, FileText, 
    SearchCheckIcon, Calendar, MessageSquare, ClipboardCheck, 
    ExternalLink, Briefcase, CheckCircle2, UserCheck 
} from 'lucide-react';

const NotificationCloseButton = ({ onClick }) => (
    <button onClick={onClick} className="text-gray-400 hover:text-white p-1">
        <X className="h-4 w-4" />
    </button>
);

const mediaNavItems = [
    { name: "Profile", path: "/media/profile", Icon: User, bgColor: "bg-gradient-to-br from-gray-700 to-gray-800 text-white" },
    { name: "Post Job", path: "/media/post-job", Icon: FileText, bgColor: "bg-gradient-to-br from-slate-600 to-gray-700 text-white" },
    { name: "From Admins", path: "#admin-section", Icon: SearchCheckIcon , bgColor: "bg-gradient-to-br from-slate-600 to-gray-700 text-white" },
    { name: "Browse Tutors", path: "/media/browse-tutors", Icon: Search, bgColor: "bg-gradient-to-br from-neutral-500 to-slate-600 text-white" },
];

export default function MediaView(props) {
    const {
        mediaData, loading, error, notifications, unreadCount,
        showNotificationsPanel, notificationPanelRef, onNotificationBellClick,
        onSignOut, getFontSizeClass, profileImageFallback,
        adminRecommendations, isAdminLoading, onSelectTutor
    } = props;

    if (loading && !mediaData?.mediaId) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-400">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 font-roboto text-gray-100 pb-16 scroll-smooth">
            
            {/* Header */}
            <header className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 md:p-6 shadow-2xl relative h-[16rem] flex items-center border-b-4 border-gray-600/50">
                <div className="container mx-auto grid grid-cols-3 items-start w-full">
                    <div className="text-left pt-2">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase">Media Partner</h2>
                        <h1 className={`font-extrabold text-white break-words ${getFontSizeClass(mediaData?.name)}`}>{mediaData?.name}</h1>
                    </div>

                    <div className="absolute left-1/2 top-[5.5rem] transform -translate-x-1/2 z-10">
                        <img
                            src={mediaData?.profileImageUrl || profileImageFallback}
                            alt="Profile"
                            className="w-[9rem] h-[12rem] sm:w-[11rem] sm:h-[14rem] rounded-3xl border-4 border-gray-500 shadow-xl object-cover"
                        />
                    </div>

                    <div className="text-right pt-2">
                        <p className="text-xl font-bold text-gray-400">ID:</p>
                        <p className="text-3xl sm:text-5xl font-extrabold text-white">{mediaData?.mediaId}</p>
                        <div className="mt-4 flex items-center justify-end space-x-3">
                            <button id="notification-bell-button" onClick={onNotificationBellClick} className="relative p-2 text-gray-300 hover:text-white bg-gray-700/50 rounded-full">
                                <Bell className="h-5 w-5" />
                                {unreadCount > 0 && <span className="absolute top-0 right-0 h-3 w-3 bg-red-600 rounded-full border-2 border-gray-800"></span>}
                            </button>
                            <button onClick={onSignOut} className="flex items-center text-sm font-medium text-gray-300 hover:text-white bg-gray-700/50 p-2 px-4 rounded-full">
                                <LogOut className="mr-2 h-4 w-4"/> Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Cards */}
            <section className="relative py-8 px-4 pt-44 sm:pt-56">
                <div className="container mx-auto flex justify-center gap-6 flex-wrap">
                    {mediaNavItems.map((button) => (
                        <Link 
                            key={button.name} 
                            to={button.path} 
                            className={`w-48 h-48 sm:w-60 sm:h-60 rounded-3xl shadow-xl transform hover:-translate-y-2 transition-all flex flex-col items-center justify-center ${button.bgColor} border-b-4 border-gray-500/20`}
                        >
                            <button.Icon className="h-10 w-10 mb-3" />
                            <span className="font-bold text-lg">{button.name}</span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* From Admins Section */}
            <section id="admin-section" className="container mx-auto px-4 mt-20">
                <div className="flex items-center space-x-4 mb-10 border-b border-gray-800 pb-6">
                    <SearchCheckIcon className="text-blue-400 h-8 w-8" />
                    <h2 className="text-3xl font-black text-white">Recommendations From Admins</h2>
                </div>

                {isAdminLoading ? (
                    <div className="text-center py-20 text-gray-500 font-mono animate-pulse">Syncing Admin Records...</div>
                ) : adminRecommendations.length === 0 ? (
                    <div className="bg-gray-800/30 rounded-[2.5rem] p-16 text-center border-2 border-dashed border-gray-700 text-gray-500">
                        <ClipboardCheck className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No tutor assignments found for your requests.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {adminRecommendations.map((rec) => (
                            <div key={rec.id} className={`bg-gray-800/80 border ${rec.tutor_selected ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700'} rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group`}>
                                
                                {rec.tutor_selected && (
                                    <div className="absolute top-6 right-8 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold border border-green-500/30 flex items-center">
                                        <CheckCircle2 className="h-3 w-3 mr-1" /> SELECTED
                                    </div>
                                )}

                                <div className="mb-6 flex items-center text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                                    <Briefcase className="h-3 w-3 mr-2" />
                                    Job Ref: {rec.media_to_admin?.id}
                                </div>

                                <div className="mb-6 bg-black/20 p-4 rounded-2xl italic text-gray-400 text-sm">
                                    "{rec.media_to_admin?.job_description}"
                                </div>

                                <div className="mb-6">
                                    <p className="text-gray-500 text-[10px] font-black uppercase mb-1">Recommended Tutor</p>
                                    <h3 className="text-4xl font-black text-white group-hover:text-blue-400 transition-colors">
                                        {rec.tutor?.name || `Tutor #${rec.tutor_id}`}
                                    </h3>
                                </div>

                                {rec.admin_note && (
                                    <div className="bg-gray-900/50 p-4 rounded-2xl border-l-4 border-blue-500 flex items-start space-x-3 mb-8">
                                        <MessageSquare className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                                        <p className="text-sm text-gray-300">"{rec.admin_note}"</p>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 rounded-2xl text-xs font-bold uppercase">View Profile</button>
                                    {rec.tutor_selected ? (
                                        <div className="flex-[1.5] py-4 bg-green-600/10 text-green-400 rounded-2xl text-xs font-black uppercase text-center border border-green-600/30 flex items-center justify-center">
                                            <UserCheck className="h-4 w-4 mr-2" /> Hired
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => onSelectTutor(rec.id)}
                                            className="flex-[1.5] py-4 bg-white text-gray-900 hover:bg-gray-200 rounded-2xl text-xs font-black uppercase shadow-lg transition-transform active:scale-95"
                                        >
                                            Select This Tutor
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}