import React, { useState } from 'react';
import { useLogin } from '../hooks/UseLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin(); // Destructure login, error, and isLoading from useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password); // Call the login function with email and password
    };

    return (
        <form
            action=""
            onSubmit={handleSubmit}
            className='flex flex-col max-w-[400px] mx-auto my-20 p-16 bg-gray-100 rounded-md shadow-lg'
        >
            <h3 className='text-center mb-10 text-lg uppercase font-extrabold'>
                Login
            </h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Enter your email'
                className='p-2 mb-5 border-l-2 bg-transparent outline-none placeholder-italic border-b-2 border-black rounded-xl'
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Enter your correct password'
                className='p-2 mb-5 border-l-2 bg-transparent outline-none placeholder-italic border-b-2 border-black rounded-xl'
            />
            {error && <div className="text-red-500 mt-[-20px] text-sm text-center">{error}</div>}


            <button
                disabled={isLoading}
                type='submit'
                className='outline-none border mx-auto p-2 bg-green-700 text-white rounded-lg'
            >
                {isLoading ? 'Logging in...' : 'Login'} {/* Change button text based on isLoading */}
            </button>

            <p className='italic mx-auto mt-5'>
                Don't have an account yet
                <a href="/signup" className='text-blue-500'> Sign up here</a>
            </p>
        </form>
    );
};

export default Login;
