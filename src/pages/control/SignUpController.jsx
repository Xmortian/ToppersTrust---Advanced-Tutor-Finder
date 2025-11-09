// src/controllers/SignUpController.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpView, { GenderToggle } from '../views/SignUpView';
import { validateSignUpForm, signUpUserWithProfile } from '../models/SignUpModel';

/**
 * Controller component: manages state, handlers and connects Model <> View
 */
export default function SignUpController() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", phone: "", city: "", password: "", gender: "",
    email: "", location: "", confirmPassword: "", role: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");

  const handleInputChange = (e) => {
    // special-case checkbox 'terms' which may pass SyntheticEvent or boolean
    if (e && e.target && e.target.name === 'terms') {
      setAgreedToTerms(e.target.checked);
      setFormErrors(prev => ({ ...prev, terms: null }));
      setSignUpMessage("");
      return;
    }

    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: null }));
    setSignUpMessage("");
  };

  const handleGenderChange = (selectedGender) => {
    setFormData(prev => ({ ...prev, gender: selectedGender }));
    if (formErrors.gender) setFormErrors(prev => ({ ...prev, gender: null }));
    setSignUpMessage("");
  };

  const handleRoleChange = (selectedRole) => {
    setFormData(prev => ({ ...prev, role: selectedRole }));
    if (formErrors.role) setFormErrors(prev => ({ ...prev, role: null }));
    setSignUpMessage("");
  };

  const onTermsClick = () => {
    window.open("/terms-and-conditions", "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSignUpMessage("");
    setFormErrors({});

    const { valid, errors } = validateSignUpForm(formData, agreedToTerms);
    if (!valid) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const result = await signUpUserWithProfile(formData);
      if (!result.success) {
        setFormErrors(prev => ({ ...prev, submit: result.message }));
        setSignUpMessage(`Error: ${result.message}`);
      } else {
        setSignUpMessage(result.message);
        // redirect after a short delay so user can read message
        setTimeout(() => navigate("/"), 4000);
      }
    } catch (err) {
      setFormErrors(prev => ({ ...prev, submit: "An unexpected error occurred." }));
      setSignUpMessage("An unexpected error occurred during sign up.");
      console.error("Controller sign up error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignUpView
      formData={formData}
      formErrors={formErrors}
      agreedToTerms={agreedToTerms}
      isLoading={isLoading}
      signUpMessage={signUpMessage}
      onInputChange={handleInputChange}
      onGenderChange={handleGenderChange}
      onRoleChange={handleRoleChange}
      onTermsClick={onTermsClick}
      onSubmit={handleSubmit}
    />
  );
}
