import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'

export default function Navbar() {
    const { logout, currentUser, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // or '/login' if you have a separate login page
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home after logout
    };

    return (
        <div className="navbar fixed top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300" href='/'>
                    SocialApp
                </a>
            </div>
            <div className="flex gap-2">
                {isLoggedIn && currentUser ? (
                    // Show user profile dropdown when logged in
                    <div className="flex items-center">
                        <span className="text-sm font-medium mx-3 text-gray-700 hidden sm:block">{currentUser.fullName}</span>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-indigo-50 transition-colors duration-200">
                                <div className="w-10 rounded-full ring-2 ring-indigo-100 hover:ring-indigo-200 transition-all duration-200">
                                    <img
                                        alt={currentUser.fullName || "User Avatar"}
                                        src={currentUser.profileImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white/90 backdrop-blur-sm rounded-box z-[1] mt-3 w-52 p-2 shadow-xl border border-white/20">
                                <li className="menu-title">
                                </li>
                                <li><a className="text-sm text-gray-600 hover:text-gray-800 hover:bg-indigo-50 transition-colors duration-200">{currentUser.email}</a></li>
                                <li><a onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-200">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    // Show login button when not logged in
                    <button
                        onClick={handleLogin}
                        className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mx-2"
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    )
}