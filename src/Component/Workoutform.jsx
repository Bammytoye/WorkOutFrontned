import React, { useState, useEffect } from 'react'
import { useWorkoutContext } from '../hooks/UseWorkoutContent';
import { useAuthContext } from '../hooks/UseAuthContext'


const Workoutform = () => {
    const {user} = useAuthContext()

    const { dispatch} = useWorkoutContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setError(null);
        }, 5000); // 5 seconds

        return () => {
            clearTimeout(timeout);
        };
    }, [error]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:5010/api/Workout', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            console.log('error', json.error)
        } 

        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added successfully', json);
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }
    return (
        <div className=''>
            <form action="" 
                className='flex flex-col mt-3' 
                onSubmit={handleSubmit}
                >
                <h3 className='flex uppercase items-center justify-center underline font-bold'>
                    Create a New Workout
                </h3>

                <label className='italic'>
                    Workout Title: 
                </label>
                <input 
                    className={`p-2 mt-1 mb-2 w-full bg-transparent border-b-2 border-r-2 outline-none ${emptyFields.includes('title') ? 'border-red-500':'border-black'} border-black rounded-md placeholder:text-gray-500 placeholder:italic`}
                    type="text" 
                    placeholder='Title' 
                    onChange={(e) => setTitle(e.target.value)} value={title}
                />
            
                <label className='italic'>
                    Load (in kg):
                </label>
                <input 
                    className={`p-2 mt-1 mb-2 w-full bg-transparent border-b-2 border-r-2 outline-none ${emptyFields.includes('load') ? 'border-red-500':'border-black'} border-black rounded-md placeholder:text-gray-500 placeholder:italic`}
                    type="number" 
                    placeholder='Load' 
                    onChange={(e) => setLoad(e.target.value)} value={load}
                />

                <label className='italic'>
                    Reps: 
                </label>
                <input 
                    className={`p-2 mt-1 mb-2 w-full bg-transparent border-b-2 border-r-2 outline-none ${emptyFields.includes('reps') ? 'border-red-500':'border-black'} border-black rounded-md placeholder:text-gray-500 placeholder:italic`}
                    type="text" 
                    placeholder='Reps' 
                    onChange={(e) => setReps(e.target.value)} value={reps}
                />
            
                <button 
                    className='bg-[#1aac83] text-white py-2 px-4 rounded cursor-pointer'
                    >
                    Submit New Workout
                </button>
                {error && 
                    <div className='p-2 bg-red-100 text-center border-red-500 rounded-md my-2 font-italic: italic'
                        >
                            {error}
                        </div>}
            </form>
        </div>
    )
}

export default Workoutform