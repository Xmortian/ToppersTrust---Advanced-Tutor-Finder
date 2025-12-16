// View: PreviousJobView - contains presentational + existing logic for previously posted jobs
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase.js';
import { formatDate } from '../model/PreviousJobModel';

// Icons
import {
  FaCalendarAlt,
  FaUsers,
  FaMoneyBillWave,
  FaBook,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCommentDots,
  FaPaperPlane,
  FaStar,
  FaTrashAlt,
  FaHome,
  FaExclamationTriangle,
  FaCheckCircle as FaCheckCircleSolid,
} from 'react-icons/fa';

// formatDate is imported from the model to keep view presentational

const StarRating = ({ rating, onRating, readOnly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`transition-colors ${!readOnly ? 'cursor-pointer' : ''} ${
            (hoverRating || rating) >= star ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-300 hover:text-gray-400'
          }`}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
          onClick={() => !readOnly && onRating(star)}
          size={20}
        />
      ))}
      {rating > 0 && <span className="text-xs text-gray-500 ml-2">({rating}/5)</span>}
    </div>
  );
};

const JobItem = ({ job, feedbackState, onToggleFeedback, onFeedbackChange, onRatingChange, onSubmitFeedback, onDeleteJob }) => {
  const jobTitle = job.title || `${job.medium || 'N/A'} tutor for ${job.class || 'N/A'}`;
  const currentFeedback = feedbackState[job.id] || { showInput: false, feedbackText: '', rating: 0, feedbackSubmitted: false };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gray-200 px-4 py-3 text-center border-b border-gray-300">
        <span className="text-base font-semibold text-purple-700">Assigned Tutor : </span>
        <span className={`text-base font-bold ${job.assigned_tutor_name ? 'text-green-600' : 'text-red-600'}`}>{job.assigned_tutor_name || 'NO ONE'}</span>
      </div>

      <div className="bg-[#3b394d] text-white p-5 sm:p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 leading-tight flex-grow pr-2">{jobTitle}</h2>
          {!job.assigned_tutor_user_id && (
            <button onClick={() => onDeleteJob(job.id)} className="flex-shrink-0 p-2 text-red-400 hover:text-red-200 transition-colors" title="Delete Job Post">
              <FaTrashAlt size={18} />
            </button>
          )}
        </div>
        <div className="flex justify-between items-center text-xs text-gray-300 mb-4">
          <span>Code : {job.code || 'N/A'}</span>
          <span>Posted Date : {formatDate(job.posted_date)}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-gray-400" />
            <span>
              Days / Week: <strong className="text-gray-100">{job.daysperweek || 'N/A'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaUsers className="text-gray-400" />
            <span>
              No. of Students: <strong className="text-gray-100">{job.numberofstudents || 'N/A'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-gray-400" />
            <span>
              Salary: <strong className="text-gray-100">{job.salary ? `BDT ${job.salary}` : 'N/A'}</strong>
            </span>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <FaBook className="text-gray-400 mt-0.5 flex-shrink-0" />
            <span>
              Subjects: <strong className="text-gray-100">{job.subjects || 'N/A'}</strong>
            </span>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <FaMapMarkerAlt className="text-gray-400 mt-0.5 flex-shrink-0" />
            <span>
              Location: <strong className="text-gray-100">{job.area || 'N/A'}, {job.city || 'N/A'}</strong>
            </span>
          </div>
          <div className="flex items-start gap-2 sm:col-span-2">
            <FaMapMarkerAlt className="text-gray-400 mt-0.5 flex-shrink-0" />
            <span>
              Full Address: <strong className="text-gray-100">{job.location || 'N/A'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaCreditCard className="text-gray-400" />
            <span>
              Payment Basis: <strong className="text-gray-100">{job.paymentbasis || 'N/A'}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaHome className="text-gray-400" />
            <span>
              Tuition Type: <strong className="text-gray-100">{job.tuition_type || 'N/A'}</strong>
            </span>
          </div>
        </div>
      </div>

      {job.assigned_tutor_user_id && (
        <div className="bg-[#e1e3f0] px-4 py-3">
          {currentFeedback.feedbackSubmitted ? (
            <p className="text-center text-sm font-semibold text-gray-600 py-2">Feedback submitted.</p>
          ) : !currentFeedback.showInput ? (
            <button onClick={() => onToggleFeedback(job.id)} className="w-full text-center text-sm font-semibold text-[#3b394d] hover:text-black cursor-pointer py-2">
              Leave Feedback or Complaint
            </button>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Rate Tutor (1-5 Stars):</label>
                <StarRating rating={currentFeedback.rating || 0} onRating={(newRating) => onRatingChange(job.id, newRating)} />
              </div>
              <div>
                <label htmlFor={`feedback-${job.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                  Feedback/Complaint:
                </label>
                <textarea
                  id={`feedback-${job.id}`}
                  rows="3"
                  placeholder={`Enter your feedback or complaint regarding ${job.assigned_tutor_name || 'the assigned tutor'}... (optional)`}
                  value={currentFeedback.feedbackText || ''}
                  onChange={(e) => onFeedbackChange(job.id, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-[#6344cc] focus:outline-none text-gray-800"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => onToggleFeedback(job.id)} className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={() => onSubmitFeedback(job.id)} className="flex items-center gap-1 px-3 py-1 bg-[#008000] text-white text-xs font-medium rounded-md hover:bg-[#5238a8] transition-colors">
                  <FaPaperPlane size={10} /> Submit Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const PreviousJobView = () => {
  const navigate = useNavigate();
  const [postedJobs, setPostedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackState, setFeedbackState] = useState({});
  const [currentAuthUser, setCurrentAuthUser] = useState(null);
  const [currentGuardianIntegerId, setCurrentGuardianIntegerId] = useState(null);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [jobToDeleteId, setJobToDeleteId] = useState(null);
  const [uiMessage, setUiMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (uiMessage.text) {
      const timer = setTimeout(() => {
        setUiMessage({ text: '', type: '' });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [uiMessage]);

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoading(true);
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        setError('Could not fetch user session. Please log in again.');
        setLoading(false);
        navigate('/');
        return;
      }
      if (user) {
        setCurrentAuthUser(user);
      } else {
        setError('No user session. Please log in.');
        setLoading(false);
        navigate('/');
      }
    };
    getCurrentUser();
  }, [navigate]);

  useEffect(() => {
    if (!currentAuthUser) return;
    const fetchGuardianIntegerId = async () => {
      try {
        const { data: guardianProfile, error: profileError } = await supabase
          .from('guardian')
          .select('id')
          .eq('user_id', currentAuthUser.id)
          .single();
        if (profileError) {
          if (profileError.code === 'PGRST116') {
            setError('Guardian profile not found. Cannot fetch posted jobs.');
          } else {
            throw profileError;
          }
          setLoading(false);
        } else if (guardianProfile) {
          setCurrentGuardianIntegerId(guardianProfile.id);
        } else {
          setError('Guardian profile data is missing.');
          setLoading(false);
        }
      } catch (err) {
        setError(`Failed to get guardian details: ${err.message}`);
        setLoading(false);
      }
    };
    fetchGuardianIntegerId();
  }, [currentAuthUser]);

  useEffect(() => {
    if (!currentGuardianIntegerId) {
      if (currentAuthUser && !loading && !error) setLoading(false);
      if (!loading && !currentAuthUser) setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const { data: jobsData, error: jobsError } = await supabase
          .from('job')
          .select('*')
          .eq('guardianid', currentGuardianIntegerId)
          .order('posted_date', { ascending: false });
        if (jobsError) throw jobsError;
        if (!jobsData || jobsData.length === 0) {
          setPostedJobs([]);
          setLoading(false);
          return;
        }
        const jobIds = jobsData.map((job) => job.id);
        const { data: acceptedJobs, error: acceptedJobsError } = await supabase
          .from('accepted_jobs')
          .select('job_id, tutor_id')
          .in('job_id', jobIds);
        if (acceptedJobsError) throw acceptedJobsError;
        const jobToTutorMap = acceptedJobs.reduce((map, item) => {
          map[item.job_id] = item.tutor_id;
          return map;
        }, {});
        const tutorIds = [...new Set(acceptedJobs.map((item) => item.tutor_id).filter((id) => id != null))];
        let tutorIdToNameMap = {};
        if (tutorIds.length > 0) {
          const { data: tutorsData, error: tutorsError } = await supabase
            .from('tutor_card')
            .select('id, name')
            .in('id', tutorIds);
          if (tutorsError) throw tutorsError;
          tutorIdToNameMap = tutorsData.reduce((map, tutor) => {
            map[tutor.id] = tutor.name;
            return map;
          }, {});
        }
        const jobsWithTutorNames = jobsData.map((job) => {
          const tutorId = jobToTutorMap[job.id];
          const tutorName = tutorId ? tutorIdToNameMap[tutorId] : null;
          return { ...job, assigned_tutor_name: tutorName, assigned_tutor_user_id: tutorId || job.assigned_tutor_user_id };
        });

        let submittedFeedbackJobIds = new Set();
        const jobsWithAssignedTutors = jobsWithTutorNames.filter((job) => job.assigned_tutor_user_id);
        const relevantJobIdsForComplaints = jobsWithAssignedTutors.map((job) => job.id);
        if (relevantJobIdsForComplaints.length > 0) {
          const { data: existingComplaints, error: complaintsError } = await supabase
            .from('complaint')
            .select('job_id')
            .eq('guardian_id', currentGuardianIntegerId)
            .in('job_id', relevantJobIdsForComplaints);
          if (!complaintsError && existingComplaints) {
            existingComplaints.forEach((c) => submittedFeedbackJobIds.add(c.job_id));
          }
        }
        const initialFeedbackState = {};
        jobsWithTutorNames.forEach((job) => {
          initialFeedbackState[job.id] = { showInput: false, feedbackText: '', rating: 0, feedbackSubmitted: submittedFeedbackJobIds.has(job.id) };
        });
        setFeedbackState(initialFeedbackState);
        setPostedJobs(jobsWithTutorNames);
      } catch (err) {
        setError((prevError) => prevError || `Failed to load your posted jobs: ${err.message}`);
        setPostedJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [currentGuardianIntegerId]);

  const toggleFeedbackInput = useCallback((jobId) => {
    setFeedbackState((prev) => ({
      ...prev,
      [jobId]: { ...prev[jobId], showInput: !prev[jobId]?.showInput, feedbackText: !prev[jobId]?.showInput ? '' : prev[jobId]?.feedbackText, rating: !prev[jobId]?.showInput ? 0 : prev[jobId]?.rating },
    }));
  }, []);

  const handleFeedbackChange = useCallback((jobId, text) => {
    setFeedbackState((prev) => ({ ...prev, [jobId]: { ...prev[jobId], feedbackText: text } }));
  }, []);

  const handleRatingChange = useCallback((jobId, newRating) => {
    setFeedbackState((prev) => ({ ...prev, [jobId]: { ...prev[jobId], rating: newRating } }));
  }, []);

  const submitFeedback = async (jobId) => {
    if (!currentAuthUser || !currentGuardianIntegerId) {
      setUiMessage({ text: 'You must be logged in to submit feedback.', type: 'error' });
      return;
    }
    const currentJob = postedJobs.find((job) => job.id === jobId);
    if (!currentJob || !currentJob.assigned_tutor_user_id) {
      setUiMessage({ text: 'Cannot submit feedback: Tutor not assigned.', type: 'error' });
      return;
    }
    const currentFeedback = feedbackState[jobId];
    const feedbackText = currentFeedback?.feedbackText?.trim();
    const rating = currentFeedback?.rating;
    if (!rating || rating === 0) {
      setUiMessage({ text: 'Please select a star rating (1-5).', type: 'error' });
      return;
    }
    const { data: existingComplaints, error: fetchError } = await supabase
      .from('complaint')
      .select('id')
      .eq('guardian_id', currentGuardianIntegerId)
      .eq('tutor_id', currentJob.assigned_tutor_user_id)
      .eq('job_id', jobId);
    if (fetchError) {
      setUiMessage({ text: `Error checking feedback: ${fetchError.message}`, type: 'error' });
      return;
    }
    if (existingComplaints && existingComplaints.length > 0) {
      setUiMessage({ text: 'You have already submitted feedback for this job.', type: 'error' });
      setFeedbackState((prev) => ({ ...prev, [jobId]: { ...prev[jobId], showInput: false, feedbackSubmitted: true } }));
      return;
    }
    try {
      const { error: insertError } = await supabase
        .from('complaint')
        .insert({ guardian_id: currentGuardianIntegerId, tutor_id: currentJob.assigned_tutor_user_id, rating: rating, complaint_text: feedbackText || null, job_id: jobId });
      if (insertError) throw insertError;
      setUiMessage({ text: 'Feedback submitted successfully!', type: 'success' });
      setFeedbackState((prev) => ({ ...prev, [jobId]: { ...prev[jobId], showInput: false, feedbackSubmitted: true } }));
    } catch (err) {
      setUiMessage({ text: `Failed to submit feedback: ${err.message}`, type: 'error' });
    }
  };

  const handleDeleteJob = (jobId) => {
    setJobToDeleteId(jobId);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteJob = async () => {
    if (!jobToDeleteId) return;
    try {
      const { error: deleteError } = await supabase.from('job').delete().eq('id', jobToDeleteId).eq('guardianid', currentGuardianIntegerId);
      if (deleteError) throw deleteError;
      setUiMessage({ text: 'Job deleted successfully!', type: 'success' });
      setPostedJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobToDeleteId));
      setFeedbackState((prev) => {
        const newState = { ...prev };
        delete newState[jobToDeleteId];
        return newState;
      });
    } catch (err) {
      setUiMessage({ text: `Failed to delete job: ${err.message}`, type: 'error' });
    } finally {
      setShowDeleteConfirmModal(false);
      setJobToDeleteId(null);
    }
  };

  const cancelDeleteJob = () => {
    setShowDeleteConfirmModal(false);
    setJobToDeleteId(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-xl text-gray-100">Loading Your Posted Jobs...</div>;
  }
  if (error) {
    return <div className="flex flex-col justify-center items-center min-h-screen text-xl text-red-500 p-4 text-center">Error: {error}</div>;
  }

  return (
    <div className="w-full min-h-screen bg-slate-800 p-4 sm:p-6 lg:p-8 font-roboto text-gray-100">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-100">My Posted Jobs</h1>

        {uiMessage.text && (
          <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] p-4 rounded-md shadow-lg text-white text-sm ${uiMessage.type === 'error' ? 'bg-red-600' : 'bg-green-600'} transition-all duration-300 ease-out ${uiMessage.text ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
            <div className="flex items-center">
              {uiMessage.type === 'error' && <FaExclamationTriangle className="mr-2" />}
              {uiMessage.type === 'success' && <FaCheckCircleSolid className="mr-2" />}
              {uiMessage.text}
            </div>
          </div>
        )}

        {showDeleteConfirmModal && (
          <div className="fixed inset-0 bg-purple bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <div className="flex items-center mb-4">
                <FaExclamationTriangle className="text-red-500 text-2xl mr-3 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-gray-800">Confirm Deletion</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this job? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button onClick={cancelDeleteJob} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white-200 hover:bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400">
                  Cancel
                </button>
                <button onClick={confirmDeleteJob} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {postedJobs.length === 0 ? (
          <p className="text-center text-gray-400 py-10">You haven't posted any jobs yet.</p>
        ) : (
          <div className="space-y-6 mt-4">
            {postedJobs.map((job) => (
              <JobItem key={job.id} job={job} feedbackState={feedbackState} onToggleFeedback={toggleFeedbackInput} onFeedbackChange={handleFeedbackChange} onRatingChange={handleRatingChange} onSubmitFeedback={submitFeedback} onDeleteJob={handleDeleteJob} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousJobView;
