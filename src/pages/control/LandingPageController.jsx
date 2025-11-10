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
                const expectedRole = role === "tutor" ? "guardian" : "teacher";

                if (storedUserRole === expectedRole) {
                    if (expectedRole === "guardian") {
                        navigate("/guardian-dashboard");
                    } else if (expectedRole === "teacher") {
                        navigate("/tutor-dashboard");
                    } else {
                        console.warn("User has unexpected role:", storedUserRole);
                        navigate("/");
                    }
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