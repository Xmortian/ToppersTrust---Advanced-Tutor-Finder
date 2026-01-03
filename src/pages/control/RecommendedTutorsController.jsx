import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RecommendedTutorsModel from '../model/RecommendedTutorsModel';
import RecommendedTutorsView from '../view/RecommendedTutorsView';

const RecommendedTutorsController = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const model = useMemo(() => new RecommendedTutorsModel(), []);

    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uiFeedbackMessage, setUiFeedbackMessage] = useState(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentGuardianDbId, setCurrentGuardianDbId] = useState(null);
    const [showAcceptConfirmModal, setShowAcceptConfirmModal] = useState(false);
    const [tutorToConfirm, setTutorToConfirm] = useState(null);
    const [pendingSwipeAction, setPendingSwipeAction] = useState(null);

    const isBrowsePage = location.pathname === '/browse-tutors';
    const swipeSoundRef = useRef(null);

    useEffect(() => {
        swipeSoundRef.current = new Audio('/Right Swipe Sound.mp3');
    }, []);

    const childRefs = useMemo(() => 
        Array(tutors.length).fill(0).map(() => React.createRef()), 
    [tutors.length]);

    useEffect(() => {
        setCurrentIndex(tutors.length - 1);
    }, [tutors]);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const gId = await model.getCurrentGuardianDbId();
                setCurrentGuardianDbId(gId);
                const data = await model.fetchTutors(gId, !isBrowsePage);
                setTutors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [isBrowsePage, model]);

    const swiped = async (direction, tutorId, tutorName, index) => {
        if (direction === 'right' && showAcceptConfirmModal) return;
        
        // FIX: access auth via model.supabase
        const { data: { user } } = await model.supabase.auth.getUser();
        
        if (!user) { 
            setShowLoginPrompt(true); 
            childRefs[index]?.current?.restoreCard(); 
            return; 
        }

        setCurrentIndex(prev => prev - 1);

        if (direction === 'right') {
            const swipedTutor = tutors.find(t => t.id === tutorId);
            if (swipedTutor) {
                setTutorToConfirm(swipedTutor);
                setPendingSwipeAction({ direction: 'right', tutorId, tutorName, index, actionType: 'swipe' });
                setShowAcceptConfirmModal(true);
            }
        }
    };

    const confirmAcceptTutor = async () => {
        if (!pendingSwipeAction || !currentGuardianDbId) return;
        const { tutorId, tutorName, index, actionType } = pendingSwipeAction;
        
        setShowAcceptConfirmModal(false);
        if (swipeSoundRef.current) swipeSoundRef.current.play().catch(() => {});

        try {
            // Updated: This now sends the correct tutor_id to the DB
            await model.acceptTutor(currentGuardianDbId, tutorId);
            
            setUiFeedbackMessage({ type: 'success', text: `${tutorName} selected!` });
            setTimeout(() => setUiFeedbackMessage(null), 2000);
            
            if (actionType === 'button') childRefs[index]?.current?.swipe('right');
            setTutors(prev => prev.filter(t => t.id !== tutorId));
        } catch (e) {
            console.error("Database Error:", e);
            setError(`Failed to save: ${e.message}`);
        }
        setPendingSwipeAction(null);
        setTutorToConfirm(null);
    };

    // ... (rest of your triggerSwipe, cancelAcceptTutor, etc. functions)

    return (
        <RecommendedTutorsView
            tutors={tutors}
            loading={loading}
            error={error}
            childRefs={childRefs}
            onSwipe={swiped}
            outOfFrame={(id, name) => console.log(`${name} out of frame`)}
            triggerSwipe={(dir) => {
                if (currentIndex >= 0) {
                    const t = tutors[currentIndex];
                    if (dir === 'right') {
                        setTutorToConfirm(t);
                        setPendingSwipeAction({ direction: 'right', tutorId: t.id, tutorName: t.name, index: currentIndex, actionType: 'button' });
                        setShowAcceptConfirmModal(true);
                    } else {
                        childRefs[currentIndex]?.current?.swipe('left');
                    }
                }
            }}
            currentIndex={currentIndex}
            showLoginPrompt={showLoginPrompt}
            handleLoginRedirect={() => navigate('/login')}
            showAcceptConfirmModal={showAcceptConfirmModal}
            tutorToConfirm={tutorToConfirm}
            confirmAcceptTutor={confirmAcceptTutor}
            cancelAcceptTutor={() => {
                setShowAcceptConfirmModal(false);
                if (pendingSwipeAction?.actionType === 'swipe') {
                    childRefs[pendingSwipeAction.index]?.current?.restoreCard();
                }
                setPendingSwipeAction(null);
            }}
            uiFeedbackMessage={uiFeedbackMessage}
            tutorProfileImageFallback={(name) => `https://placehold.co/150?text=${name?.[0]}`}
            isBrowsePage={isBrowsePage}
        />
    );
};

export default RecommendedTutorsController;