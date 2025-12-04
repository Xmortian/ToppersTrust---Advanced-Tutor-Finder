import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageModel from "../model/LandingPageModel";
import LandingPageView from "../view/LandingPageView";

const LandingPageController = () => {
    const [role, setRole] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signInError, setSignInError] = useState("");

    const navigate = useNavigate();
    const model = new LandingPageModel();

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setSignInError("");
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Helper function to map the selected role (button label) to the expected Supabase stored role
    const getExpectedStoredRole = (selectedRole) => {
        switch (selectedRole) {
            case "tutor":
                return "guardian"; // 'I Want a Tutor' maps to 'guardian'
            case "teacher":
                return "teacher"; // 'I Want to Teach' maps to 'teacher' (tutor profile)
            case "media":
                return "media"; // 'Find a Tutor' maps to 'media'
            default:
                return null;
        }
    };

    // Helper function to get the dashboard route based on the stored role
    const getDashboardRoute = (storedRole) => {
        switch (storedRole) {
            case "guardian":
                return "/guardian-dashboard";
            case "teacher":
                return "/tutor-dashboard";
            case "media":
                return "/media-dashboard"; 
            default:
                return "/"; 
        }
    };

    const handleSignIn = async () => {
        if (!role) {
            setSignInError("Please select your role.");
            return;
        }
        if (!email || !password) {
            setSignInError("Please enter both email and password.");
            return;
        }

        setIsLoading(true);
        setSignInError("");

        try {
            const { data, error } = await model.signInWithPassword(email, password);

            if (error) {
                setSignInError(error.message);
                setIsLoading(false);
                return;
            }

            if (data.user) {
                console.log("Successfully signed in:", data.user);
                const storedUserRole = data.user.user_metadata?.user_role;
                const expectedRole = getExpectedStoredRole(role);

                if (storedUserRole === expectedRole) {
                    const dashboardRoute = getDashboardRoute(storedUserRole);
                    navigate(dashboardRoute);
                } else {
                    setSignInError(`Incorrect role selected. This account is registered as a ${storedUserRole || 'user'}.`);
                    await model.signOut();
                }
            } else {
                setSignInError("Sign in failed. Please try again.");
            }
        } catch (error) {
            setSignInError("An unexpected error occurred. Please try again.");
            console.error("Sign in catch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LandingPageView
            role={role}
            email={email}
            password={password}
            showPassword={showPassword}
            isLoading={isLoading}
            signInError={signInError}
            handleRoleSelect={handleRoleSelect}
            handleEmailChange={handleEmailChange}
            handlePasswordChange={handlePasswordChange}
            toggleShowPassword={toggleShowPassword}
            handleSignIn={handleSignIn}
        />
    );
};

export default LandingPageController;