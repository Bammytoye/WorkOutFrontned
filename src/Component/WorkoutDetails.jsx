import React from 'react'
import { useWorkoutContext } from '../hooks/UseWorkoutContent'
import { useAuthContext } from '../hooks/UseAuthContext'

//date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutContext()
    const {user} = useAuthContext()


    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('http://localhost:5010/api/Workout/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}` 
            }
        })
        const json = await response.json()
        // console.log(json);

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }


    return (
        <div className='flex justify-between items-center bg-white rounded-md mx-auto my-3 p-5 shadow'>
            <div>
                <h4 className='mb-3 text-lg text-[#1aac83]'> 
                    {workout.title}
                </h4>

                <p className='text-sm text-[#555]'> <strong>Load (kg): </strong> {workout.load}</p>
                <p className='text-sm text-[#555]'> <strong>Reps: </strong> {workout.reps}</p>
                {/* <p className='text-sm text-[#555]'>{workout.createdAt}</p> */}
                <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
                        </div>

            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleClick}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>  
            </div>
        </div>
    )
}

export default WorkoutDetails