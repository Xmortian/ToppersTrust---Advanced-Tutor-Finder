import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DuesView from '../view/DuesView'; 
import { 
    getAuthUser, 
    fetchTutorProfileByUserId, 
    fetchOutstandingDues, 
    initiateSSLCommerzPayment 
} from '../model/DuesModel';

export default function DuesController() {
    const navigate = useNavigate();
    const [tutorId, setTutorId] = useState(null);
    const [tutorName, setTutorName] = useState('');
    const [tutorEmail, setTutorEmail] = useState('');
    const [tutorPhone, setTutorPhone] = useState('');

    const [dueData, setDueData] = useState(null); 
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');

    const onBack = () => navigate('/tutor-dashboard');

    useEffect(() => {
        let mounted = true;
        async function loadTutorInfo() {
            try {
                const { user } = await getAuthUser();
                if (!user) {
                    navigate('/'); 
                    return;
                }
                
                const { profile, error: profileError } = await fetchTutorProfileByUserId(user.id);
                if (profileError || !profile) {
                    throw new Error('Tutor profile not found.');
                }
                
                if (mounted) {
                    setTutorId(profile.id);
                    setTutorName(profile.name);
                    setTutorEmail(profile.email || user.email); 
                    setTutorPhone(profile.phone || ''); 
                }
            } catch (e) {
                console.error('Auth/Profile Error:', e);
                if (mounted) {
                    setError('Failed to load tutor information.');
                    setLoading(false);
                }
            }
        }
        loadTutorInfo();
        return () => { mounted = false; };
    }, [navigate]);

    useEffect(() => {
        let mounted = true;
        if (!tutorId) return;

        async function loadDues() {
            setLoading(true);
            setError(null);
            setDueData(null);

            try {
                const { due, error: dueError } = await fetchOutstandingDues(tutorId);
                if (dueError) throw dueError;

                if (mounted) {
                    setDueData(due);
                }
            } catch (e) {
                console.error('Dues Fetch Error:', e);
                if (mounted) setError('Failed to fetch outstanding dues.');
            } finally {
                if (mounted) setLoading(false);
            }
        }
        loadDues();
        return () => { mounted = false; };
    }, [tutorId]);


    const handlePayClick = async () => {
        if (!dueData || dueData.amount <= 0 || !tutorId) {
            setPaymentMessage('No outstanding amount to pay.');
            return;
        }
        if (!tutorEmail) {
             setPaymentMessage('Error: User email is required for payment.');
             return;
        }

        setPaymentLoading(true);
        setPaymentMessage('Initiating payment via SSLCommerz...');
        setError(null);

        let result = {};
        try {
            result = await initiateSSLCommerzPayment(
                tutorId, 
                tutorName, 
                dueData.amount, 
                tutorEmail, 
                tutorPhone 
            );

            if (result.success && result.redirectUrl) {
                setPaymentMessage('Payment initiation successful. Redirecting...');
                window.location.href = result.redirectUrl; 
            } else {
                setPaymentMessage(result.message || 'Payment initiation failed.');
            }
        } catch (e) {
            console.error('Payment initiation error:', e);
            setPaymentMessage('An unexpected error occurred during payment.');
        } finally {
            if (!result || !result.success || !result.redirectUrl) {
                setPaymentLoading(false);
            }
        }
    };


    return (
        <DuesView
            dueData={dueData}
            loading={loading}
            error={error}
            paymentLoading={paymentLoading}
            paymentMessage={paymentMessage}
            tutorName={tutorName}
            onPayClick={handlePayClick}
            onBack={onBack}
        />
    );
}