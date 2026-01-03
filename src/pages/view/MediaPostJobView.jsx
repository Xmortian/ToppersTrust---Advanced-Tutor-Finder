import React from 'react';
import { ArrowLeft, Send, FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PostJobView(props) {
    const {
        mediaData,
        loading,
        submitting,
        error,
        successMessage,
        jobDescription,
        previousRequests,
        loadingRequests,
        onDescriptionChange,
        onSubmit,
        onBack
    } = props;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-400">
                Loading...
            </div>
        );
    }

    const charCount = jobDescription.length;
    const maxChars = 5000;
    const minChars = 10;
    const isValid = charCount >= minChars && charCount <= maxChars;

    return (
        <div className="min-h-screen bg-gray-900 font-roboto text-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 md:px-8 shadow-2xl border-b-4 border-gray-600/50">
                <div className="container mx-auto max-w-5xl">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-300 hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Dashboard
                    </button>
                    <div className="flex items-center space-x-4">
                        <FileText className="h-10 w-10 text-blue-400" />
                        <div>
                            <h1 className="text-4xl font-black text-white">Request a Tutor</h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Submit your requirements and our admin team will find the perfect match
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto max-w-5xl px-4 py-12">
                
                {/* Success Message */}
                {successMessage && (
                    <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-3xl p-6 flex items-start space-x-4">
                        <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-green-400 font-bold text-lg mb-1">Success!</h3>
                            <p className="text-gray-300">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-3xl p-6 flex items-start space-x-4">
                        <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-red-400 font-bold text-lg mb-1">Error</h3>
                            <p className="text-gray-300">{error}</p>
                        </div>
                    </div>
                )}

                {/* Job Request Form */}
                <section className="bg-gray-800/80 border border-gray-700 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-12">
                    <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                        <FileText className="h-6 w-6 mr-3 text-blue-400" />
                        Describe Your Requirements
                    </h2>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                            <label 
                                htmlFor="job-description" 
                                className="block text-sm font-bold text-gray-400 uppercase mb-3"
                            >
                                Job Description *
                            </label>
                            <textarea
                                id="job-description"
                                value={jobDescription}
                                onChange={onDescriptionChange}
                                placeholder="Example: Looking for an experienced Math tutor for high school students. Must be proficient in Algebra and Calculus. Flexible schedule required..."
                                rows={8}
                                disabled={submitting}
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-2xl p-4 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            
                            {/* Character Count */}
                            <div className="mt-2 flex justify-between items-center text-xs">
                                <span className={`${charCount < minChars ? 'text-yellow-500' : charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
                                    {charCount < minChars 
                                        ? `Minimum ${minChars} characters required`
                                        : charCount > maxChars
                                        ? `Maximum ${maxChars} characters exceeded`
                                        : 'Looking good!'}
                                </span>
                                <span className={`${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
                                    {charCount} / {maxChars}
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitting || !isValid}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-black text-lg rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-3"
                        >
                            {submitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="h-5 w-5" />
                                    <span>Submit Request</span>
                                </>
                            )}
                        </button>
                    </form>
                </section>

                {/* Previous Requests Section */}
                <section className="bg-gray-800/50 border border-gray-700 rounded-[2.5rem] p-8 md:p-12 shadow-xl">
                    <h2 className="text-2xl font-black text-white mb-6 flex items-center">
                        <Clock className="h-6 w-6 mr-3 text-purple-400" />
                        Your Previous Requests
                    </h2>

                    {loadingRequests ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-600 border-t-transparent mx-auto mb-4"></div>
                            Loading requests...
                        </div>
                    ) : previousRequests.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>No previous requests found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {previousRequests.map((request) => (
                                <div
                                    key={request.id}
                                    className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-xs font-bold text-blue-400 uppercase">
                                            Request #{request.id}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(request.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {request.job_description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}