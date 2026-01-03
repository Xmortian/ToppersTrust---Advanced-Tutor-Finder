import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase.js';
import { JobModel } from '../model/JobModel';

export const useJobCardController = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [unfilteredJobs, setUnfilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swipeFeedback, setSwipeFeedback] = useState(null);
    const [appliedJobId, setAppliedJobId] = useState(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTutorId, setCurrentTutorId] = useState(null);
    const [filters, setFilters] = useState({ location: '', gender: 'any' });

    const rightSwipeSoundRef = useRef(new Audio('/Right Swipe Sound.mp3'));
    const childRefs = useMemo(() => Array(jobs.length).fill(0).map(() => React.createRef()), [jobs.length]);

    // Initialize Tutor and Jobs
    useEffect(() => {
        const init = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                let tId = null;
                if (user) {
                    tId = await JobModel.fetchTutorProfile(user.id);
                    setCurrentTutorId(tId);
                }
                const rawJobs = await JobModel.fetchJobs(tId);
                setUnfilteredJobs(processJobData(rawJobs));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    // Filter Logic
    useEffect(() => {
        let filtered = [...unfilteredJobs];
        if (filters.location) {
            filtered = filtered.filter(j => j.location.toLowerCase().includes(filters.location.toLowerCase()));
        }
        if (filters.gender !== 'any') {
            filtered = filtered.filter(j => j.preferredTutor.toLowerCase() === filters.gender.toLowerCase());
        }
        setJobs(filtered);
        setCurrentIndex(filtered.length - 1);
    }, [unfilteredJobs, filters]);

    const handleSwipe = async (direction, job, index) => {
        setSwipeFeedback(direction);
        setTimeout(() => setSwipeFeedback(null), 700);
        setCurrentIndex(index - 1);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            childRefs[index]?.current?.restoreCard();
            setCurrentIndex(index);
            setShowLoginPrompt(true);
            return;
        }

        if (direction === 'right') {
            rightSwipeSoundRef.current.currentTime = 0;
            rightSwipeSoundRef.current.play().catch(e => console.error(e));
            setAppliedJobId(job.id);
            const { error } = await JobModel.applyForJob(job.id, currentTutorId);
            if (error) alert(error.message);
            setTimeout(() => setAppliedJobId(null), 1500);
        }
    };

    return {
        jobs, loading, error, swipeFeedback, appliedJobId, showLoginPrompt,
        currentIndex, filters, setFilters, childRefs, setShowLoginPrompt,
        handleSwipe, navigate, 
        manualSwipe: (dir) => childRefs[currentIndex]?.current?.swipe(dir)
    };
};

// Helper to map DB data to UI needs
const processJobData = (data) => data.map(job => ({
    ...job, // Keeps original fields
    // Map DB snake_case to UI camelCase
    postedDate: job.posted_date,
    daysPerWeek: job.daysperweek,
    noOfStudents: job.numberofstudents,
    tutoringTime: job.time, // DB column is 'time'
    studentGender: job.studentgender,
    preferredTutor: job.genderpreference,
    tuitionType: job.tuition_type,
    paymentBasis: job.paymentbasis === 'M' ? 'Monthly' : job.paymentbasis,
    
    // Custom logic
    title: `${job.medium || 'N/A'} tutor for ${job.class || 'N/A'} student`,
    location: job.area || job.location || 'Not Specified',
    subjects: job.subjects ? job.subjects.split(',').map(s => s.trim()) : [],
    logoUrl: "/previewremovebgpreview-1@2x.png"
}));