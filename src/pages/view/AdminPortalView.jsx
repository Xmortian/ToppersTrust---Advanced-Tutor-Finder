import React, { useState } from 'react';

const AdminPortalView = ({ 
    adminName, activeSection, setActiveSection, 
    mediaJobs, selectedRequest, setSelectedRequest, onSendToMedia 
}) => {
    const [tutorId, setTutorId] = useState("");
    const [note, setNote] = useState("");

    return (
        <div className="min-h-screen bg-slate-900 text-white p-8">
            {/* Header logic same as before... */}
            
            {activeSection === 'dashboard' ? (
                /* Dashboard Grid same as before... */
                <div onClick={() => setActiveSection('media')} className="...">...</div>
            ) : (
                <div className="space-y-6">
                    {/* MEDIA TABLE */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-xl">
                        <table className="w-full text-left">
                            <thead className="bg-slate-700/50 text-slate-300 text-xs uppercase font-mono">
                                <tr>
                                    <th className="p-4">Partner</th>
                                    <th className="p-4">Request Description</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {mediaJobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-slate-700/20">
                                        <td className="p-4 font-bold text-blue-300">{job.media?.name}</td>
                                        <td className="p-4 text-sm text-slate-300">{job.job_description}</td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => setSelectedRequest(job)}
                                                className="bg-blue-600 hover:bg-blue-500 text-xs px-3 py-2 rounded font-bold"
                                            >
                                                Assign Tutor
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ASSIGNMENT FORM (Shows only when a request is clicked) */}
                    {selectedRequest && (
                        <div className="bg-slate-800 border-2 border-blue-500 p-6 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
                            <div className="flex justify-between mb-4">
                                <h3 className="text-xl font-bold">Assign Tutor for: {selectedRequest.media?.name}</h3>
                                <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-white">✕</button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">TUTOR ID</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white focus:outline-none focus:border-blue-500"
                                        placeholder="Enter Tutor ID e.g. 102"
                                        value={tutorId}
                                        onChange={(e) => setTutorId(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">ADMIN NOTE</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-slate-900 border border-slate-700 p-2 rounded text-white focus:outline-none focus:border-blue-500"
                                        placeholder="Why this tutor?"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button 
                                onClick={() => {
                                    onSendToMedia(tutorId, note);
                                    setTutorId(""); setNote("");
                                }}
                                className="mt-4 w-full bg-blue-600 hover:bg-blue-500 py-2 rounded font-bold transition-all"
                            >
                                Send Recommendation to Media
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPortalView;