import React from 'react';
import { Link } from 'react-router-dom';
import { FaBullhorn, FaArrowLeft, FaSpinner } from 'react-icons/fa'; // Importing React Icons

export default function DuesView({
    dueData,
    loading,
    error,
    paymentLoading,
    paymentMessage,
    tutorName,
    onPayClick,
    onBack,
}) {
    const message = paymentMessage || '';
    const isPaymentSuccess = message.toLowerCase().includes('success');
    const paymentMessageClass = isPaymentSuccess 
        ? 'text-green-400 font-semibold' 
        : (message ? 'text-red-400 font-semibold' : 'text-gray-400');
    
    const hasDues = dueData && dueData.amount > 0;
    const amountDue = dueData?.amount || 0;

    return (
        <div className="min-h-screen bg-gray-900 font-roboto text-white p-4 sm:p-8">
            <header className="flex justify-between items-center mb-12 border-b border-gray-700 pb-4">
                <button onClick={onBack} className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors text-lg font-medium">
                    <FaArrowLeft className="h-5 w-5 mr-3" /> Back to Dashboard
                </button>
                <h1 className="text-3xl font-extrabold text-teal-400 tracking-wider">Tutor Dues</h1>
            </header>

            <div className="max-w-md mx-auto bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 text-center border border-gray-700/50 transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-bold mb-8 text-indigo-400 border-b border-gray-700 pb-3">
                    Account: {tutorName || 'Tutor'}
                </h2>

                {loading ? (
                    <div className="py-12 text-indigo-400 flex justify-center items-center">
                        <FaSpinner className="animate-spin h-8 w-8 mr-3" />
                        <span className="text-lg">Fetching Dues Data...</span>
                    </div>
                ) : error ? (
                    <div className="bg-red-900/40 p-4 rounded-xl my-6">
                        <p className="text-red-400 text-base font-medium">{error}</p>
                    </div>
                ) : (
                    <>
                        {hasDues ? (
                            <div className="space-y-6">
                                <p className="text-xl text-gray-300 font-medium">Outstanding Balance:</p>
                                <div className="p-4 bg-red-900/30 rounded-xl border border-red-500/50 shadow-inner">
                                    <p className="text-6xl font-extrabold text-red-400">
                                        ৳{amountDue.toFixed(2)}
                                    </p>
                                </div>
                                <p className="text-sm text-gray-400 pt-2">Due set on: {dueData.date}</p>

                                <button 
                                    onClick={onPayClick} 
                                    disabled={paymentLoading || !hasDues}
                                    className="w-full mt-8 inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white font-extrabold text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {paymentLoading 
                                        ? (
                                            <>
                                                <FaSpinner className="animate-spin h-5 w-5 mr-3" />
                                                Processing Payment...
                                            </>
                                        )
                                        : (
                                            <>
                                                <FaBullhorn className="mr-3 text-xl" /> PAY DUES NOW
                                            </>
                                        )}
                                </button>
                            </div>
                        ) : (
                            <div className="py-10 text-green-400 bg-green-900/20 rounded-xl shadow-inner border border-green-500/50">
                                <p className="text-3xl font-bold mb-3">All Clear!</p>
                                <p className="text-base text-gray-300">You have no outstanding dues at this time.</p>
                            </div>
                        )}
                        
                        {message && (
                            <p className={`mt-6 text-sm p-3 rounded-lg ${isPaymentSuccess ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>{message}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-4">
                            * Payment is processed securely via SSLCommerz sandbox.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}