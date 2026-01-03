import React, { useState } from 'react';
import { Terminal, ShieldAlert, Activity, Cpu, Database, Lock, AlertTriangle, DollarSign, Heart, UserCheck, CurrencyIcon } from 'lucide-react';

const AdminPortalView = ({ 
    adminName, adminId, activeSection, setActiveSection, 
    mediaJobs, acceptedJobs, complaints, dues, mediaInterests, tutorAcceptances,
    selectedRequest, setSelectedRequest, onSendToMedia 
}) => {
    const [tutorId, setTutorId] = useState("");
    const [note, setNote] = useState("");

    const navTabs = [
        { id: 'dashboard', label: 'Dashboard', icon: Terminal, color: 'text-emerald-400', border: 'border-emerald-900' },
        { id: 'media', label: 'Media Jobs', icon: Database, color: 'text-blue-400', border: 'border-blue-900' },
        { id: 'interests', label: 'Media Interests', icon: Heart, color: 'text-pink-400', border: 'border-pink-900' },
        { id: 'accepted', label: 'Accepted Tutors', icon: Lock, color: 'text-purple-400', border: 'border-purple-900' },
        { id: 'complaints', label: 'Complaints', icon: AlertTriangle, color: 'text-red-400', border: 'border-red-900' },
        { id: 'dues', label: 'Dues', icon: CurrencyIcon, color: 'text-yellow-400', border: 'border-yellow-900' },
        { id: 'confirmations', label: 'Logs', icon: UserCheck, color: 'text-cyan-400', border: 'border-cyan-900' }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-300 p-4 md:p-8 font-mono selection:bg-[#00FF41] selection:text-black">
            
            {/* --- IMPROVED HIGH-CONTRAST HEADER --- */}
            <header className="mb-10 p-6 bg-[#121217] border border-slate-800 border-l-4 border-l-[#00FF41] rounded-r-xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] text-[#00FF41] font-black uppercase tracking-[0.4em]">
                        <ShieldAlert size={16} className="animate-pulse" /> SYSTEM_ROOT_ACCESS: LEVEL_0
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                        OPERATOR: <span className="text-[#00FF41] drop-shadow-[0_0_10px_rgba(0,255,65,0.3)]">{adminName || "NULL_USER"}</span>
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                        <span className="bg-[#1a1a20] text-[#00FF41] border border-slate-700 px-3 py-1 rounded">
                            UUID: {adminId || "000"}
                        </span>
                        <span>/ / PROTOCOL_v2.0</span>
                        <span className="text-emerald-500">/ / STATUS: ENCRYPTED</span>
                    </div>
                </div>
                <div className="hidden lg:block text-right">
                    <div className="text-[10px] text-slate-600 uppercase font-black mb-1">Grid_Power_Usage</div>
                    <div className="text-xl font-bold text-emerald-400">98.4% NOMINAL</div>
                </div>
            </header>

            {/* --- VISIBLE NAVIGATION --- */}
            <nav className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar border-b border-slate-800">
                {navTabs.map((tab) => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id)} 
                        className={`flex items-center gap-3 px-6 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                            activeSection === tab.id 
                            ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.2)]' 
                            : `bg-[#16161d] ${tab.color} ${tab.border} hover:bg-slate-800`
                        }`}
                    >
                        <tab.icon size={16} /> {tab.label}
                    </button>
                ))}
            </nav>

            <main className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {activeSection === 'dashboard' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {navTabs.slice(1).map((card) => (
                            <div key={card.id} onClick={() => setActiveSection(card.id)} 
                                className={`p-8 bg-[#121217] border ${card.border} rounded-2xl hover:border-[#00FF41] cursor-pointer transition-all hover:scale-[1.02] shadow-xl group`}>
                                <card.icon className={`${card.color} mb-6 h-8 w-8 group-hover:scale-125 transition-transform`} />
                                <h3 className="text-xl font-bold text-white mb-2">{card.label}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-medium">Access system node {card.id.toUpperCase()} for data management and entry.</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* TABLES: Darker Background + Lighter Text for Readability */}
                        <div className="bg-[#0c0c0e] rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-[#16161d] text-slate-400 text-[11px] uppercase font-black tracking-widest border-b border-slate-800">
                                    <tr>
                                        {activeSection === 'media' && <>
                                            <th className="p-5">Partner</th><th className="p-5">Description</th><th className="p-5 text-right">Action</th>
                                        </>}
                                        {activeSection === 'accepted' && <>
                                            <th className="p-5">Job_Ref</th><th className="p-5">Tutor</th><th className="p-5">Guardian</th><th className="p-5">System_Log</th>
                                        </>}
                                        {activeSection === 'complaints' && <>
                                            <th className="p-5">ID</th><th className="p-5">Subject</th><th className="p-5">Rating</th><th className="p-5">Log_Details</th>
                                        </>}
                                        {activeSection === 'dues' && <>
                                            <th className="p-5">Reg_ID</th><th className="p-5">Tutor</th><th className="p-5">Balance</th><th className="p-5">State</th>
                                        </>}
                                        {activeSection === 'interests' && <>
                                            <th className="p-5">Node</th><th className="p-5">Media_Source</th><th className="p-5">Interested_Tutor</th><th className="p-5">Logged_At</th>
                                        </>}
                                        {activeSection === 'confirmations' && <>
                                            <th className="p-5">ID</th><th className="p-5">Guardian</th><th className="p-5">Tutor</th><th className="p-5">Status</th>
                                        </>}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/50">
                                    {/* MEDIA SECTION */}
                                    {activeSection === 'media' && mediaJobs.map((job) => (
                                        <tr key={job.id} className="hover:bg-slate-800/40">
                                            <td className="p-5 font-bold text-white">{job.media?.name}</td>
                                            <td className="p-5 text-sm text-slate-400 italic">"{job.job_description}"</td>
                                            <td className="p-5 text-right">
                                                <button onClick={() => setSelectedRequest(job)} className="bg-[#00FF41] text-black text-[10px] px-5 py-2 rounded-md font-black uppercase hover:bg-emerald-300">Transmit_Data</button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* ACCEPTED SECTION */}
                                    {activeSection === 'accepted' && acceptedJobs.map((item) => (
                                        <tr key={`${item.job_id}-${item.tutor_id}`} className="hover:bg-slate-800/40">
                                            <td className="p-5 text-emerald-400 font-bold">#{item.job_id}</td>
                                            <td className="p-5 text-white font-medium">{item.tutor?.name}</td>
                                            <td className="p-5 text-slate-300">{item.guardian?.name}</td>
                                            <td className="p-5 text-xs text-slate-500 font-mono italic max-w-xs truncate">{item.comment || "NO_DATA"}</td>
                                        </tr>
                                    ))}
                                    {/* COMPLAINTS SECTION */}
                                    {activeSection === 'complaints' && complaints.map((c) => (
                                        <tr key={c.id} className="hover:bg-red-950/20">
                                            <td className="p-5 text-red-500 font-bold">ERR_{c.id}</td>
                                            <td className="p-5 text-white font-medium">{c.tutor?.name}</td>
                                            <td className="p-5 text-yellow-500 font-bold">{c.rating}/5</td>
                                            <td className="p-5 text-xs text-red-400 italic max-w-md">{c.complaint_text}</td>
                                        </tr>
                                    ))}
                                    {/* DUES SECTION */}
                                    {activeSection === 'dues' && dues.map((d) => (
                                        <tr key={d.due_idd} className="hover:bg-yellow-950/20">
                                            <td className="p-5 text-yellow-500 font-bold">TXN_{d.due_idd}</td>
                                            <td className="p-5 text-white font-medium">{d.tutor?.name}</td>
                                            <td className="p-5 text-emerald-400 font-black tracking-widest">${d.amount}</td>
                                            <td className={`p-5 text-[10px] font-black ${d.payment ? 'text-emerald-400' : 'text-red-500'}`}>
                                                {d.payment ? '[ VERIFIED ]' : '[ PENDING_APPROVAL ]'}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* INTERESTS SECTION */}
                                    {activeSection === 'interests' && mediaInterests.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-800/40">
                                            <td className="p-5 text-pink-500 font-bold">LINK_{item.id}</td>
                                            <td className="p-5 text-white font-medium">{item.media?.name}</td>
                                            <td className="p-5 text-slate-300">{item.tutor?.name}</td>
                                            <td className="p-5 text-[10px] text-slate-600">{new Date(item.created_at).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {/* CONFIRMATIONS SECTION */}
                                    {activeSection === 'confirmations' && tutorAcceptances.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-800/40">
                                            <td className="p-5 text-cyan-400 font-bold">LOG_{item.id}</td>
                                            <td className="p-5 text-white font-medium">{item.guardian?.name}</td>
                                            <td className="p-5 text-slate-300">{item.tutor?.name}</td>
                                            <td className={`p-5 text-[10px] font-black ${item.accepted_status ? 'text-emerald-400' : 'text-red-500'}`}>
                                                {item.accepted_status ? '[ CONFIRMED ]' : '[ REJECTED ]'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* HIGH-VISIBILITY FORM */}
                        {selectedRequest && activeSection === 'media' && (
                            <div className="bg-[#1a1a20] border-2 border-[#00FF41] p-10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                                <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
                                    <h3 className="text-2xl font-black text-white flex items-center gap-4 uppercase tracking-tighter">
                                        <Cpu className="text-[#00FF41]" /> Transmit To: {selectedRequest.media?.name}
                                    </h3>
                                    <button onClick={() => setSelectedRequest(null)} className="text-slate-500 hover:text-white text-lg">✕</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-[10px] font-black text-[#00FF41] mb-2 uppercase">Target_Tutor_ID</label>
                                        <input type="number" className="w-full bg-black border border-slate-700 p-4 rounded text-white font-mono focus:border-[#00FF41] outline-none transition-all" placeholder="E.G. 102" value={tutorId} onChange={(e) => setTutorId(e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-[#00FF41] mb-2 uppercase">Validation_Note</label>
                                        <input type="text" className="w-full bg-black border border-slate-700 p-4 rounded text-white font-mono focus:border-[#00FF41] outline-none transition-all" placeholder="REASON FOR SELECTION" value={note} onChange={(e) => setNote(e.target.value)} />
                                    </div>
                                </div>
                                <button onClick={() => { onSendToMedia(tutorId, note); setTutorId(""); setNote(""); }} 
                                    className="mt-10 w-full bg-[#00FF41] hover:bg-emerald-400 text-black py-5 rounded-xl font-black uppercase tracking-[0.3em] transition-all shadow-lg active:scale-95">
                                    INITIATE_DATA_TRANSFER
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPortalView;