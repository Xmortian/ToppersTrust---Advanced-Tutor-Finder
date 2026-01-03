import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import PostJobView from '../view/PostJobView';
import {
  studentCountOptions,
  mediumOptions,
  classOptions,
  paymentOptions,
  daysOptions,
  cityOptions,
  tuitionTypeOptions,
  subjectOptions,
  locationData,
  initialFormState,
} from '../model/PostJobModel';

const PostJobController = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialFormState });
  const [availableLocations, setAvailableLocations] = useState(locationData[formData.city] || ['']);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [subjectToAdd, setSubjectToAdd] = useState('');
  const [subjectError, setSubjectError] = useState('');

  useEffect(() => {
    const cityLocations = locationData[formData.city] || [''];
    setAvailableLocations(cityLocations);
    if (!cityLocations.includes(formData.location)) {
      setFormData((prev) => ({ ...prev, location: '' }));
    }
  }, [formData.city]);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value, maxLength } = e.target;
      if (maxLength && value.length > maxLength) {
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (message.text) setMessage({ type: '', text: '' });
    },
    [message.text]
  );

  const handleStudentGenderChange = useCallback(
    (value) => {
      setFormData((prev) => ({ ...prev, studentGender: value }));
      if (message.text) setMessage({ type: '', text: '' });
    },
    [message.text]
  );

  const handleTutorGenderChange = useCallback(
    (value) => {
      setFormData((prev) => ({ ...prev, tutorGenderPref: value }));
      if (message.text) setMessage({ type: '', text: '' });
    },
    [message.text]
  );

  const addSubject = useCallback(() => {
    setSubjectError('');
    if (subjectToAdd && !formData.subjects.includes(subjectToAdd)) {
      if (formData.subjects.length < 5) {
        setFormData((prev) => ({ ...prev, subjects: [...prev.subjects, subjectToAdd] }));
        setSubjectToAdd('');
      } else {
        setSubjectError('You can select up to 5 subjects only.');
      }
    } else if (formData.subjects.includes(subjectToAdd)) {
      setSubjectError(`"${subjectToAdd}" is already selected.`);
    }
  }, [subjectToAdd, formData.subjects]);

  const removeSubject = useCallback((subjectToRemove) => {
    setFormData((prev) => ({ ...prev, subjects: prev.subjects.filter((subject) => subject !== subjectToRemove) }));
    setSubjectError('');
  }, []);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    setSubjectError('');

    if (!formData.city) {
      setMessage({ type: 'error', text: 'Please select a city.' });
      setIsLoading(false);
      return;
    }
    if (!formData.location) {
      setMessage({ type: 'error', text: 'Please select a location (Thana/Area).' });
      setIsLoading(false);
      return;
    }
    if (!formData.address.trim()) {
      setMessage({ type: 'error', text: 'Please enter the full address.' });
      setIsLoading(false);
      return;
    }
    if (formData.subjects.length === 0) {
      setSubjectError('Please select at least one subject.');
      setIsLoading(false);
      return;
    }
    if (!formData.studentGender) {
      setMessage({ type: 'error', text: "Please select the student's gender." });
      setIsLoading(false);
      return;
    }
    if (!formData.salary || parseFloat(formData.salary) <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid salary.' });
      setIsLoading(false);
      return;
    }
    if (!formData.tutoringTime.trim()) {
      setMessage({ type: 'error', text: 'Please enter the tutoring time.' });
      setIsLoading(false);
      return;
    }
    if (!formData.tuitionType) {
      setMessage({ type: 'error', text: 'Please select a tuition type.' });
      setIsLoading(false);
      return;
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      setMessage({ type: 'error', text: 'You must be logged in to post a job. Redirecting to login...' });
      setIsLoading(false);
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    let guardianId;
    try {
      const { data: guardianData, error: guardianError } = await supabase
        .from('guardian')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (guardianError) {
        if (guardianError.code === 'PGRST116') {
          throw new Error('No guardian profile found linked to your account. Please ensure your guardian profile is set up.');
        }
        throw guardianError;
      }
      if (!guardianData) {
        throw new Error('Guardian profile not found for the current user.');
      }
      guardianId = guardianData.id;
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to verify guardian status: ${error.message}` });
      setIsLoading(false);
      return;
    }

    const jobDataToInsert = {
      job_id: `Job-${Date.now().toString().slice(-7)}`,
      guardianid: guardianId,
      numberofstudents: parseInt(formData.noOfStudents, 10),
      genderpreference: formData.tutorGenderPref,
      salary: parseFloat(formData.salary),
      tuition_type: formData.tuitionType,
      studentgender: formData.studentGender,
      location: formData.address,
      city: formData.city,
      area: formData.location,
      medium: formData.category,
      subjects: formData.subjects.join(', '),
      daysperweek: parseInt(formData.daysPerWeek.split(' ')[0], 10),
      posted_date: new Date().toISOString(),
      paymentbasis: formData.paymentType,
      class: formData.classCourse,
      time: formData.tutoringTime,
      code: `TUITION-${Date.now().toString().slice(-6)}`,
    };

    try {
      const { error } = await supabase.from('job').insert([jobDataToInsert]).select();
      if (error) throw error;
      setMessage({ type: 'success', text: 'Job posted successfully!' });
      setFormData({ ...initialFormState });
    } catch (error) {
      setMessage({ type: 'error', text: `Failed to post job: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostJobView
      formData={formData}
      availableLocations={availableLocations}
      message={message}
      isLoading={isLoading}
      subjectToAdd={subjectToAdd}
      subjectError={subjectError}
      handlers={{
        handleCancel,
        handleSubmit,
        handleInputChange,
        handleTutorGenderChange,
        handleStudentGenderChange,
        addSubject,
        removeSubject,
        setSubjectToAdd,
      }}
      dataSources={{
        studentCountOptions,
        cityOptions,
        paymentOptions,
        mediumOptions,
        classOptions,
        tuitionTypeOptions,
        daysOptions,
        subjectOptions,
      }}
    />
  );
};

export default PostJobController;
