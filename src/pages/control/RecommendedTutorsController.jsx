import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RecommendedTutorsModel from '../model/RecommendedTutorsModel';
import RecommendedTutorsView from '../view/RecommendedTutorsView';
import { supabase } from '../../supabase.js';

const RecommendedTutorsController = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const model = new RecommendedTutorsModel();

    const isBrowsePage = location.pathname === '/browse-tutors';

    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swipeFeedback, setSwipeFeedback] = useState(null);
    const [uiFeedbackMessage, setUiFeedbackMessage] = useState(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentGuardianDbId, setCurrentGuardianDbId] = useState(null);
    const [showAcceptConfirmModal, setShowAcceptConfirmModal] = useState(false);
    const [tutorToConfirm, setTutorToConfirm] = useState(null);
    const [pendingSwipeAction, setPendingSwipeAction] = useState(null);

    const swipeSoundRef = useRef(null);

    useEffect(() => {
        swipeSoundRef.current = new Audio('/Right Swipe Sound.mp3');
    }, []);

    const childRefs = useMemo(() => Array(tutors.length).fill(0).map(() => React.createRef()), [tutors.length]);

    useEffect(() => {
        if (tutors.length > 0) setCurrentIndex(tutors.length - 1);
        else setCurrentIndex(0);
    }, [tutors]);

    useEffect(() => {
        const fetchGuardianId = async () => {
            try {
                const id = await model.getCurrentGuardianDbId();
                setCurrentGuardianDbId(id);
            } catch (e) {
                setError('Could not retrieve your guardian profile information.');
            }
        };
        fetchGuardianId();
    }, []);

    useEffect(() => {
        const init = async () => {
            const fetchRecommendedTutors = async () => {
                setLoading(true);
                setError(null);
                setTutors([]);
                try {
                    let alreadyAcceptedTutorIds = new Set();
                    if (currentGuardianDbId) {
                        const { data: acceptedData, error: acceptedError } = await supabase
                            .from('recc_tutors_accepted').select('tutor_id').eq('guardian_id', currentGuardianDbId);
                        if (acceptedError) { console.error("Error fetching already accepted tutors:", acceptedError); }
                        else if (acceptedData) { acceptedData.forEach(item => alreadyAcceptedTutorIds.add(item.tutor_id)); }
                    }

                    const { data: recommendedData, error: recError } = await supabase.from('recommendedtutors').select('id2');
                    if (recError) throw recError;
                    if (!recommendedData || recommendedData.length === 0) { setTutors([]); setLoading(false); return; }

                    const recommendedTutorIntIDs = recommendedData.map(r => r.id2).filter(id => id != null);
                    if (recommendedTutorIntIDs.length === 0) { setTutors([]); setLoading(false); return; }

                    const { data: tutorsDetails, error: fetchError } = await supabase
                        .from('recommendedtutors')
                        .select('id, tutorname')
                        .in('id', recommendedTutorIntIDs)
                        .order('rating', { ascending: false, nullsFirst: false });
                    if (fetchError) throw fetchError;

                    const filteredTutors = tutorsDetails.filter(tutor => !alreadyAcceptedTutorIds.has(tutor.id));

                    const mappedTutors = filteredTutors.map(tutor => {
                        let imageUrl = null;
                        if (tutor.photo) {
                            const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(tutor.photo);
                            imageUrl = publicUrlData.publicUrl;
                        }
                        return {
                            id: tutor.id,
                            name: tutor.tutorname || 'N/A', 
                            university: tutor.uni || 'N/A',
                            grade: tutor.uni_grade || 'N/A', 
                            department: tutor.qualification || 'N/A',
                            location: Array.isArray(tutor.preferred_areas) ? tutor.preferred_areas.join(', ') : (tutor.preferred_areas || 'Not specified'),
                            rating: tutor.rating ? parseFloat(tutor.rating) : null,
                            sscInfo: `SSC Grade: ${tutor.ssc_grade || 'N/A'}`, 
                            hscInfo: `HSC Grade: ${tutor.hsc_grade || 'N/A'}`,
                            profileImageUrl: imageUrl, 
                            experience_years: tutor.experience_years,
                            expectedSalary: tutor.expected_salary,
                            availableTime: tutor.available_time,
                        };
                    });
                    setTutors(mappedTutors);
                } catch (err) {
                    setError(err.message || 'Failed to fetch recommended tutors.');
                } finally { setLoading(false); }
            };

            const fetchAllTutors = async () => {
                setLoading(true);
                setError(null);
                setTutors([]);
                try {
                    let alreadyAcceptedTutorIds = new Set();
                    if (currentGuardianDbId) {
                        const { data: acceptedData, error: acceptedError } = await supabase
                            .from('recc_tutors_accepted').select('tutor_id').eq('guardian_id', currentGuardianDbId);
                        if (acceptedError) { console.error("Error fetching already accepted tutors:", acceptedError); }
                        else if (acceptedData) { acceptedData.forEach(item => alreadyAcceptedTutorIds.add(item.tutor_id)); }
                    }

                    const { data: tutorsDetails, error: fetchError } = await supabase
                        .from('recommendedtutors')
                        .select('id, tutorname, uni, uni_grade, qualification, preferred_areas, rating, ssc_grade, ssc_school, hsc_grade, hsc_school, photo, experience_years, expected_salary, available_time')
                        .order('rating', { ascending: false, nullsFirst: false });
                    if (fetchError) throw fetchError;

                    const filteredTutors = tutorsDetails.filter(tutor => !alreadyAcceptedTutorIds.has(tutor.id));

                    const mappedTutors = filteredTutors.map(tutor => {
                        let imageUrl = null;
                        if (tutor.photo) {
                            const { data: publicUrlData } = supabase.storage.from('photo').getPublicUrl(tutor.photo);
                            imageUrl = publicUrlData.publicUrl;
                        }
                        return {
                            id: tutor.id,
                            name: tutor.tutorname || 'N/A', 
                            university: tutor.uni || 'N/A',
                            grade: tutor.uni_grade || 'N/A', 
                            department: tutor.qualification || 'N/A',
                            location: Array.isArray(tutor.preferred_areas) ? tutor.preferred_areas.join(', ') : (tutor.preferred_areas || 'Not specified'),
                            rating: tutor.rating ? parseFloat(tutor.rating) : null,
                            sscInfo: `SSC Grade: ${tutor.ssc_grade || 'N/A'}`, 
                            hscInfo: `HSC Grade: ${tutor.hsc_grade || 'N/A'}`,
                            profileImageUrl: imageUrl, 
                            experience_years: tutor.experience_years,
                            expectedSalary: tutor.expected_salary,
                            availableTime: tutor.available_time,
                        };
                    });
                    setTutors(mappedTutors);
                } catch (err) {
                    setError(err.message || 'Failed to fetch tutors.');
                } finally { setLoading(false); }
            };

            const user = await checkAuth();
            if (currentGuardianDbId !== null || !user) {
                if (isBrowsePage) {
                    fetchAllTutors();
                } else {
                    fetchRecommendedTutors();
                }
            } else {
                setLoading(false);
            }
        };
        init();
    }, [currentGuardianDbId, isBrowsePage]);

    const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    };

    const playSwipeSound = () => {
        if (swipeSoundRef.current) swipeSoundRef.current.play().catch(() => {});
    };

    const handleAcceptAction = (tutor, index, actionType) => {
        setTutorToConfirm(tutor);
        setPendingSwipeAction({ direction: 'right', tutorId: tutor.id, tutorName: tutor.name, index, actionType });
        setShowAcceptConfirmModal(true);
    };

    const swiped = async (direction, tutorId, tutorName, index) => {
        setSwipeFeedback(null);
        setUiFeedbackMessage(null);
        if (direction === 'right' && showAcceptConfirmModal) return;
        const user = await checkAuth();
        if (!user) { setShowLoginPrompt(true); childRefs[index]?.current?.restoreCard(); return; }
        if (!currentGuardianDbId) { setError('Your profile could not be identified. Please complete your profile or re-login.'); childRefs[index]?.current?.restoreCard(); return; }

        setCurrentIndex(prevIndex => prevIndex - 1);

        if (direction === 'right') {
            const swipedTutor = tutors.find(t => t.id === tutorId);
            if (swipedTutor) handleAcceptAction(swipedTutor, index, 'swipe');
        } else if (direction === 'left') {
            setSwipeFeedback('left');
            setTimeout(() => setSwipeFeedback(null), 700);
        }
    };

    const triggerSwipe = async (dir) => {
        const user = await checkAuth();
        if (!user) { setShowLoginPrompt(true); return; }
        if (!currentGuardianDbId) { setError('Your profile could not be identified. Please complete your profile or re-login.'); return; }

        if (currentIndex >= 0 && currentIndex < tutors.length) {
            const tutorForAction = tutors[currentIndex];
            if (dir === 'right') handleAcceptAction(tutorForAction, currentIndex, 'button');
            else childRefs[currentIndex]?.current?.swipe('left');
        }
    };

    const confirmAcceptTutor = async () => {
        if (!pendingSwipeAction || !currentGuardianDbId || !tutorToConfirm) return;
        const { tutorId, tutorName, index, actionType } = pendingSwipeAction;
        setShowAcceptConfirmModal(false);

        playSwipeSound();

        setSwipeFeedback('right');
        setTimeout(() => setSwipeFeedback(null), 700);
        setUiFeedbackMessage({ type: 'success', text: `${tutorName} has been added to your accepted list!` });
        setTimeout(() => setUiFeedbackMessage(null), 2000);
        try {
            await model.acceptTutor(currentGuardianDbId, tutorId);
            setTutors(prevTutors => prevTutors.filter(t => t.id !== tutorId));
        } catch (e) {
            setError(`Failed to save choice: ${e.message || e}`);
        }
        if (actionType === 'button') childRefs[index]?.current?.swipe('right');
        setPendingSwipeAction(null);
        setTutorToConfirm(null);
    };

    const cancelAcceptTutor = () => {
        setShowAcceptConfirmModal(false);
        setPendingSwipeAction(null);
        setTutorToConfirm(null);
    };

    const outOfFrame = (tutorId, tutorName, index) => { console.log(`${tutorName} (ID: ${tutorId}) at index ${index} left the screen!`); };
    const handleLoginRedirect = () => { setShowLoginPrompt(false); navigate('/'); };
    const tutorProfileImageFallback = (name) => `https://placehold.co/150x150/B8860B/FFFFFF?text=${name ? name.split(' ').map(n => n[0]).join('') : 'T'}`;

    return (
        <RecommendedTutorsView
            tutors={tutors}
            loading={loading}
            error={error}
            childRefs={childRefs}
            onSwipe={swiped}
            outOfFrame={outOfFrame}
            triggerSwipe={triggerSwipe}
            currentIndex={currentIndex}
            showLoginPrompt={showLoginPrompt}
            handleLoginRedirect={handleLoginRedirect}
            showAcceptConfirmModal={showAcceptConfirmModal}
            tutorToConfirm={tutorToConfirm}
            confirmAcceptTutor={confirmAcceptTutor}
            cancelAcceptTutor={cancelAcceptTutor}
            uiFeedbackMessage={uiFeedbackMessage}
            tutorProfileImageFallback={tutorProfileImageFallback}
            isBrowsePage={isBrowsePage}
        />
    );
};

export default RecommendedTutorsController;
