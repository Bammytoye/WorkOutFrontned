import { useState } from "react";
import { useAuthContext } from "./UseAuthContext";

export const UseSignUp = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Changed null to false for better initialization
    const { dispatch } = useAuthContext();

    const signUp = async (email, password) => {
        setIsLoading(true); // Corrected the spelling of isLoading
        setError(null);

        const response = await fetch('http://localhost:5010/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: email, password: password})
        });

        const json = await response.json();
        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        } 
    };    

    return { signUp, isLoading, error }; // Changed isloading to isLoading
};
