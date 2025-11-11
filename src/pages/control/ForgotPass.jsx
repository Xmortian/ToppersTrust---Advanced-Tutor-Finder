import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPassModel } from '../model/ForgotPassModel.jsx';
import ForgotPassView from '../view/ForgotPassView.jsx';

/**
 * ForgotPass Controller - Handles business logic and state management
 */
const ForgotPass = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const primaryColor = "bg-[#6344cc]";
    const hoverColor = "hover:bg-[#5238a8]";
    const focusRingColor = "focus:ring-[#6344cc]";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        
        if (!ForgotPassModel.validateEmail(email)) {
            setMessage("Please enter your email address.");
            return;
        }

        setIsLoading(true);

        const result = await ForgotPassModel.sendPasswordResetEmail(email);
        
        setMessage(result.message);
        if (result.success) {
            setEmail("");
        }
        
        setIsLoading(false);
    };

    return (
        <ForgotPassView
            email={email}
            setEmail={setEmail}
            isLoading={isLoading}
            message={message}
            handleSubmit={handleSubmit}
            primaryColor={primaryColor}
            hoverColor={hoverColor}
            focusRingColor={focusRingColor}
        />
    );
};

export default ForgotPass;
