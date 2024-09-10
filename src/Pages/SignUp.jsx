import React, { useState } from 'react';
import { UseSignUp } from '../hooks/UseSignUp'; 

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, error, isLoading } = UseSignUp(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(email, password)
        await signUp(email, password);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col max-w-[400px] mx-auto my-20 p-5 bg-gray-100 rounded-lg shadow-lg'
        >
            <h3 className='text-center mb-10 text-lg uppercase font-extrabold'>
                Sign Up
            </h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Enter your email'
                className='p-2 mb-5 bg-transparent outline-none placeholder-italic border-b-2 border-black rounded-xl'
            />
            {error && <div className='text-red-500 mt-[-20px] italic text-sm mx-auto'>{error}</div>}


            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Enter your password'
                className='p-2 mb-5 bg-transparent outline-none placeholder-italic border-b-2 border-black rounded-xl'
            />

            <button
                disabled={isLoading} 
                type='submit'
                className='outline-none border mx-auto p-2 bg-green-700 text-white rounded-lg'
            >
                Sign Up
            </button>

            <p className='italic mx-auto mt-5'>
                Already have an account with me 
                <a href="/login" className='text-blue-700'> login here</a>
            </p>
        </form>
    );
};

export default SignUp;
