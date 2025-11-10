import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResetPassModel from "../model/ResetPassModel";
import ResetPassView from "../view/ResetPassView";

const ResetPassController = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const model = new ResetPassModel();

    useEffect(() => {
        const authListener = model.setupAuthListener((event) => {
            if (event === "PASSWORD_RECOVERY") {
                console.log("Password recovery event detected, session set.");
            }
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [navigate]);

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        if (newPassword.length < 6) {
            setMessage("Password must be at least 6 characters long.");
            setIsLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            const { data, error } = await model.updateUserPassword(newPassword);

            if (error) {
                setMessage(`Error updating password: ${error.message}`);
            } else {
                setMessage("Password updated successfully! You can now sign in with your new password.");
                setNewPassword("");
                setConfirmPassword("");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            setMessage("An unexpected error occurred. Please try again.");
            console.error("Password reset error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ResetPassView
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            message={message}
            isLoading={isLoading}
            showNewPassword={showNewPassword}
            showConfirmPassword={showConfirmPassword}
            handleNewPasswordChange={handleNewPasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            toggleShowNewPassword={toggleShowNewPassword}
            toggleShowConfirmPassword={toggleShowConfirmPassword}
            handleSubmit={handleSubmit}
        />
    );
};

export default ResetPassController;