import React from 'react'
import { Link } from 'react-router-dom'
import { useLogOut } from '../hooks/UseLogOut'
import { useAuthContext } from '../hooks/UseAuthContext'

const Navbar = () => {
    const { logOut } = useLogOut()
    const { user } = useAuthContext()

    const handleClick = () => {
        logOut()
    }

    return (
        <header> 
            <div className='flex items-center justify-between bg-white max-w-[1400px] mx-auto py-3 px-16 shadow-lg'>
                <div className='flex items-center'>
                    <Link to='/' className='text-[#333] no-underline'>
                        <h1>Zeke Workout</h1>
                    </Link>
                </div>
            
                <div className='flex space-x-5 items-center'>
                <Link to='/home' className='text-gray-800 hover:text-gray-400 border-b-2 border-transparent hover:border-green-500'>Home</Link>
<Link to='/about' className='text-gray-800 hover:text-gray-400 border-b-2 border-transparent hover:border-green-500'>About Us</Link>
                    
                    
                    <div className="flex space-x-4 items-center">
                        {user && ( 
                            <div>
                                <span>{user.email}</span>
                                <button 
                                    onClick={handleClick}
                                    className='bg-green-800 ml-3 text-white p-2 rounded-lg font-bold border'
                                >
                                    Log out
                                </button>
                            </div>
                        )}

                        {!user && (    
                            <div className="space-x-5">
                                <Link to='/login' className='text-gray-800 hover:text-gray-400  hover:border-b-2 border-green-500'>Login</Link>
                                <Link to='/signup' className='border-r-2 border-l-2 rounded-md px-2 hover:border-b-2 border-green-500'>Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>                
            </div>
        </header>
    )
}

export default Navbar