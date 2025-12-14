// View: ShortListView - contains presentational + existing logic for shortlisted applicants
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase.js';
import { tutorProfileImageFallback } from '../model/ShortListModel';

// Icons
import { FaStar, FaCheckCircle, FaRegTrashAlt, FaRegCalendarAlt, FaUserFriends, FaMoneyBillWave, FaBookOpen, FaHome, FaBriefcase } from 'react-icons/fa';

const JobDetailItem = ({ icon, label, value }) => (
  <div className="flex items-center text-sm mb-3">
    <span className="mr-3 text-gray-300">{icon}</span>
    <span className="text-gray-400">
      {label}: <span className="font-semibold text-gray-100">{value || 'N/A'}</span>
    </span>
  </div>
);

const TutorDetailCard = ({ value, label = '' }) => (
  <div className="w-full text-center">
    <p className="text-xs sm:text-sm text-gray-300 leading-snug break-words py-1 px-1.5 bg-white/5 rounded-md shadow-sm">
      {label}
      {value || <span className="italic text-gray-500">N/A</span>}
    </p>
  </div>
);

const LoadingSpinner = ({ message }) => (
  <div className="flex justify-center items-center min-h-screen text-xl bg-[#302f40] text-gray-300">
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    {message}...
  </div>
);

const ErrorDisplay = ({ error, onRetry }) => (
  <div className="flex flex-col justify-center items-center min-h-screen text-xl text-red-400 bg-[#302f40]">
    <p>An Error Occurred: {error}</p>
    <button onClick={onRetry} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded">
      Try Again
    </button>
  </div>
);

const TutorCard = () => {
  const [status, setStatus] = useState({ isLoading: true, error: null, message: 'Initializing' });
  const [guardianId, setGuardianId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [appointedTutor, setAppointedTutor] = useState(null);

  useEffect(() => {
    const fetchGuardian = async () => {
      setStatus({ isLoading: true, error: null, message: 'Authenticating' });
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase.from('guardian').select('id').eq('user_id', user.id).single();
        if (error) setStatus({ isLoading: false, error: 'Could not find your guardian profile.', message: '' });
        else if (data) setGuardianId(data.id);
        else setStatus({ isLoading: false, error: 'Guardian profile not found for the logged-in user.', message: '' });
      } else {
        setStatus({ isLoading: false, error: 'You must be logged in to view this page.', message: '' });
      }
    };
    fetchGuardian();
  }, []);

  useEffect(() => {
    if (!guardianId) return;

    const fetchJobsAndTheirStatus = async () => {
      setStatus({ isLoading: true, error: null, message: 'Fetching your jobs and statuses' });
      try {
        const { data: jobsData, error: jobsError } = await supabase
          .from('job')
          .select('*, apply_job(count), accepted_jobs(tutor_id)')
          .eq('guardianid', guardianId)
          .order('posted_date', { ascending: false });

        if (jobsError) throw jobsError;
        if (!jobsData) {
          setJobs([]);
          setStatus({ isLoading: false, error: null, message: '' });
          return;
        }

        const jobIds = jobsData.map((job) => job.id);
        let acceptedStatuses = {};

        if (jobIds.length > 0) {
          const { data: acceptedData, error: acceptedError } = await supabase
            .from('accepted_jobs')
            .select('job_id, tutor_id')
            .in('job_id', jobIds);

          if (acceptedError) {
            console.warn('DEBUG: Could not fetch accepted statuses, proceeding without:', acceptedError);
          } else if (acceptedData) {
            acceptedData.forEach((acc) => {
              if (acc.tutor_id) {
                acceptedStatuses[acc.job_id] = { tutor_id: acc.tutor_id };
              }
            });
          }
        }

        const combinedJobs = jobsData.map((job) => ({
          ...job,
          accepted_jobs: acceptedStatuses[job.id] ? [acceptedStatuses[job.id]] : [],
        }));

        setJobs(combinedJobs);
        setStatus({ isLoading: false, error: null, message: '' });
      } catch (error) {
        console.error('DEBUG (Initial Job Fetch Error):', error);
        setStatus({ isLoading: false, error: `Failed to load job data. ${error.message}`, message: '' });
      }
    };

    if (!selectedJob) {
      fetchJobsAndTheirStatus();
    }
  }, [guardianId, selectedJob]);

  const fetchApplicantsForJob = async (job) => {
    setStatus({ isLoading: true, error: null, message: `Loading applicants` });
    setSelectedJob(job);
    try {
      const { data: applications, error: appError } = await supabase.from('apply_job').select('tutor_id').eq('job_id', job.id);
      if (appError) throw appError;
      if (applications.length === 0) {
        setApplicants([]);
      } else {
        const tutorIds = applications.map((app) => app.tutor_id);
        const { data: tutors, error: tutorError } = await supabase.from('tutor_card').select('*').in('id', tutorIds);
        if (tutorError) throw tutorError;

        const mappedTutors = (tutors || []).map((t) => {
          let imageUrl = null;
          if (t.photo) {
            const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(t.photo);
            imageUrl = publicUrlData.publicUrl;
          }
          return {
            id: t.id,
            name: t.name || 'N/A',
            university: t.uni || 'N/A',
            grade: t.uni_grade || 'N/A',
            qualification: t.qualification || 'N/A',
            rating: t.rating ? parseFloat(t.rating) : null,
            ssc_grade: t.ssc_grade,
            ssc_school: t.ssc_school,
            hsc_grade: t.hsc_grade,
            hsc_school: t.hsc_school,
            photo: imageUrl,
            experience_years: t.experience_years,
          };
        });

        setApplicants(mappedTutors);
      }
    } catch (error) {
      setStatus({ isLoading: false, error: `Failed to fetch applicants. ${error.message}`, message: '' });
    } finally {
      setStatus({ isLoading: false, error: null, message: '' });
    }
  };

  const handleAssignTutor = async (tutor) => {
    if (appointedTutor) return;
    if (!window.confirm(`Are you sure you want to assign ${tutor.name} as your tutor?`)) return;
    setStatus({ isLoading: true, error: null, message: `Assigning ${tutor.name}` });
    const assignmentData = { job_id: selectedJob.id, guardian_id: guardianId, tutor_id: tutor.id };
    const { error } = await supabase.from('accepted_jobs').upsert(assignmentData, { onConflict: 'job_id' });
    if (error) {
      setStatus({ isLoading: false, error: `Failed to assign tutor. ${error.message}`, message: '' });
    } else {
      setAppointedTutor(tutor);
      setJobs((prevJobs) => prevJobs.map((j) => (j.id === selectedJob.id ? { ...j, accepted_jobs: [{ tutor_id: tutor.id }] } : j)));
      setStatus({ isLoading: false, error: null, message: '' });
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to permanently delete this job posting?')) return;
    const { error } = await supabase.from('job').delete().eq('id', jobId);
    if (error) alert('Failed to delete job: ' + error.message);
    else setJobs((prevJobs) => prevJobs.filter((j) => j.id !== jobId));
  };

  const handleReturnToJobList = () => {
    setSelectedJob(null);
    setApplicants([]);
    setAppointedTutor(null);
  };

  const renderJobCard = (job, isLockedView = false) => {
    if (!job || typeof job.id === 'undefined') {
      console.warn('DEBUG: Attempted to render a job card with invalid job or job.id', job);
      return null;
    }

    const applicantCount = job.apply_job?.[0]?.count || 0;
    const isJobFilled = job.accepted_jobs && job.accepted_jobs.length > 0 && job.accepted_jobs[0]?.tutor_id != null;

    return (
      <div className={`relative bg-[#3e3d5a] p-6 rounded-lg shadow-lg ${isLockedView ? 'mb-12' : ''}`}>
        {applicantCount > 0 && !isJobFilled && !isLockedView && (
          <div className="absolute top-0 left-0 -mt-3 -ml-3 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-gray-800">{applicantCount}</div>
        )}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold text-gray-100">Code : {job.code || `TUITION-${job.id}`}</h2>
          <div className="text-right flex-shrink-0 ml-4">
            {!isJobFilled && !isLockedView && (
              <button onClick={() => handleDeleteJob(job.id)} className="text-red-400 hover:text-red-600 transition-colors" aria-label="Delete job">
                <FaRegTrashAlt size={20} />
              </button>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Posted Date : {job.posted_date ? new Date(job.posted_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap border-t border-gray-700/50 pt-4">
          <div className="w-full md:w-1/2 md:pr-4">
            <JobDetailItem icon={<FaRegCalendarAlt />} label="Days / Week" value={job.daysperweek} />
            <JobDetailItem icon={<FaMoneyBillWave />} label="Salary" value={`BDT ${job.salary}`} />
            <JobDetailItem icon={<FaBookOpen />} label="Subjects" value={job.subjects} />
          </div>
          <div className="w-full md:w-1/2 md:pr-4">
            <JobDetailItem icon={<FaUserFriends />} label="No. of Students" value={job.numberofstudents} />
            <JobDetailItem icon={<FaHome />} label="Tuition Type" value={job.tuition_type} />
          </div>
        </div>
        {!isLockedView && (
          <button onClick={() => fetchApplicantsForJob(job)} disabled={isJobFilled} className="mt-6 w-full text-white font-semibold rounded-lg shadow py-3 text-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed bg-[#6344cc] hover:bg-[#5238a8]">
            {isJobFilled ? 'Tutor Appointed' : 'Review Applicants'}
          </button>
        )}
      </div>
    );
  };

  if (status.isLoading) return <LoadingSpinner message={status.message} />;
  if (status.error) return <ErrorDisplay error={status.error} onRetry={() => { setStatus({ isLoading: true, error: null, message: 'Retrying...' }); setGuardianId((id) => id); setSelectedJob(null); }} />;

  return (
    <div className="w-full min-h-screen bg-[#302f40] flex flex-col items-center p-4 sm:p-6">
      {selectedJob ? (
        <div className="w-full max-w-4xl">
          <button onClick={handleReturnToJobList} className="mb-8 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 z-30">
            ← Back to All Jobs
          </button>
          {renderJobCard(selectedJob, true)}
          <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Applicants for this Job</h2>
          {applicants.length > 0 ? (
            <div className="flex flex-row justify-center items-start gap-4 md:gap-6 lg:gap-8 pb-8 flex-wrap">
              {applicants.map((tutor) => (
                <div
                  key={tutor.id}
                  className={`bg-[#2c2b38] text-white rounded-2xl shadow-xl p-4 w-72 flex flex-col transition-all duration-500 ease-in-out ${
                    appointedTutor && appointedTutor.id !== tutor.id ? 'opacity-30 pointer-events-none' : 'opacity-100'
                  } ${appointedTutor && appointedTutor.id === tutor.id ? 'border-4 border-green-400 scale-105' : 'border-2 border-transparent'}`}
                  style={{ minHeight: '520px' }}
                >
                  <div className="flex flex-col items-center pt-2 pb-3">
                    <img
                      src={tutor.photo || tutorProfileImageFallback(tutor.name)}
                      alt={tutor.name}
                      className="w-36 h-36 rounded-full object-cover border-4 border-gray-500 shadow-lg mb-3"
                    />
                  </div>
                  <div className="flex-grow flex flex-col items-center text-center space-y-1.5 px-1">
                    <h2 className="text-xl font-bold text-gray-50 mb-1">{tutor.name}</h2>
                    <TutorDetailCard value={`${tutor.university}`} />
                    <TutorDetailCard value={`${tutor.qualification} -- GPA : ${tutor.grade}`} />
                    <TutorDetailCard label="Rating : " value={tutor.rating ? `${tutor.rating.toFixed(2)} / 5.00` : 'Not Rated'} />
                    <TutorDetailCard value={`SSC GPA : ${tutor.ssc_grade || 'N/A'} - ${tutor.ssc_school || 'N/A'}`} />
                    <TutorDetailCard value={`HSC GPA : ${tutor.hsc_grade || 'N/A'} - ${tutor.hsc_school || 'N/A'}`} />
                    <TutorDetailCard label="Total Experience : " value={tutor.experience_years ? `${tutor.experience_years} years` : 'N/A'} />
                  </div>
                  {!appointedTutor && (
                    <div className="mt-auto pt-4 flex justify-around items-center">
                      <button onClick={() => handleAssignTutor(tutor)} className="p-3 bg-green-500/80 hover:bg-green-600 rounded-full text-white transition-colors shadow-md" aria-label="Select Tutor">
                        <FaCheckCircle size={18} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 text-xl p-8 bg-gray-800/20 rounded-lg">
              <p>No one has applied for this job yet.</p>
            </div>
          )}
          {appointedTutor && (
            <div className="mt-8 text-center">
              <p className="text-green-400 font-semibold text-lg animate-pulse">Tutor {appointedTutor.name} has been appointed!</p>
              <button onClick={handleReturnToJobList} className="mt-4 inline-block px-6 py-2 bg-[#6344cc] text-white font-semibold rounded-lg shadow hover:bg-[#5238a8] transition-colors">
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-8 mt-4 text-center">Your Posted Jobs</h1>
          {jobs.length > 0 ? (
            <div className="space-y-8">
              {jobs.map((job) => (job && typeof job.id !== 'undefined' ? <div key={job.id}>{renderJobCard(job)}</div> : null))}
            </div>
          ) : (
            <p className="text-center text-gray-400 text-xl p-4">You have not posted any jobs yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TutorCard;
