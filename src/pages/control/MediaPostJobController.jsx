import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostJobView from '../view/MediaPostJobView';
import {
    getAuthUser,
    fetchMediaData,
    submitJobRequest,
    fetchUserJobRequests
} from '../model/MediaPostJobModel';

const PostJobController = () => {
    const navigate = useNavigate();
    const [mediaData, setMediaData] = useState({ mediaId: null, name: 'Loading...' });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    
    
    const [jobDescription, setJobDescription] = useState('');
    
    
    const [previousRequests, setPreviousRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(false);

    
    useEffect(() => {
        let mounted = true;
        
        async function initializePage() {
            setLoading(true);
            try {
                const { user, error: authError } = await getAuthUser();
                
                if (authError || !user) {
                    if (mounted) navigate('/');
                    return;
                }

                const data = await fetchMediaData(user.id);
                
                if (mounted) {
                    setMediaData({
                        mediaId: data.mediaId,
                        name: data.name,
                    });
                }
            } catch (e) {
                if (mounted) {
                    setError(e.message || 'Failed to load page');
                }
            } finally {
                if (mounted) setLoading(false);
            }
        }

        initializePage();
        return () => { mounted = false; };
    }, [navigate]);

    
    useEffect(() => {
        let mounted = true;
        
        if (!mediaData.mediaId || mediaData.mediaId === 'N/A') return;

        async function loadPreviousRequests() {
            setLoadingRequests(true);
            try {
                const requests = await fetchUserJobRequests(mediaData.mediaId);
                if (mounted) setPreviousRequests(requests);
            } catch (e) {
                console.error('Failed to load previous requests:', e);
            } finally {
                if (mounted) setLoadingRequests(false);
            }
        }

        loadPreviousRequests();
        return () => { mounted = false; };
    }, [mediaData.mediaId]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        
        if (!jobDescription.trim()) {
            setError('Please enter a job description');
            return;
        }

        if (!mediaData.mediaId || mediaData.mediaId === 'N/A') {
            setError('Media ID not found. Please refresh the page.');
            return;
        }

        setSubmitting(true);
        setError(null);
        setSuccessMessage('');

        try {
            const result = await submitJobRequest(
                parseInt(mediaData.mediaId),
                jobDescription.trim()
            );

            
            setSuccessMessage('Your tutor request has been submitted successfully!');
            setJobDescription(''); 
            
            
            setPreviousRequests(prev => [result, ...prev]);

            
            setTimeout(() => setSuccessMessage(''), 5000);
            
        } catch (e) {
            setError(e.message || 'Failed to submit request');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDescriptionChange = (e) => {
        setJobDescription(e.target.value);
        if (error) setError(null); 
    };

    const handleBack = () => {
        navigate('/media');
    };

    return (
        <PostJobView
            mediaData={mediaData}
            loading={loading}
            submitting={submitting}
            error={error}
            successMessage={successMessage}
            jobDescription={jobDescription}
            previousRequests={previousRequests}
            loadingRequests={loadingRequests}
            onDescriptionChange={handleDescriptionChange}
            onSubmit={handleSubmit}
            onBack={handleBack}
        />
    );
};

export default PostJobController;