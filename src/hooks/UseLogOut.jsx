import { useAuthContext } from "./UseAuthContext"; 
import { useWorkoutContext } from '../hooks/UseWorkoutContent'


export const useLogOut = () => { 
    const { dispatch } = useAuthContext(); 
    const { dispatch: workoutsDispatch } = useWorkoutContext(); 

    const logOut = () => {
        // remove user from storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" }); // Removed payload: json as json is not defined here
        workoutsDispatch({
            type: 'SET_WORKOUTS', payload: null
        })
    };
    return { logOut }; // Return logOut as an object
};