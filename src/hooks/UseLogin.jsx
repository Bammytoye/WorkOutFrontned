import { useState } from "react";
import { useAuthContext } from "./UseAuthContext";
import BaseUrl from "../BaseUrl";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch( BaseUrl +'/login' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
            } else {
                // Save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));

                // Update the auth context
                dispatch({ type: 'LOGIN', payload: json });
            }
        } catch (error) {
            setError('An error occurred while logging in');
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
