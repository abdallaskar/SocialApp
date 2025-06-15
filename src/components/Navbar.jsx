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
        <div className="navbar sticky top-0 z-50 bg-gradient-to-r from-white via-slate-50 to-blue-50 backdrop-blur-xl border-b border-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

            <div className="flex-1 relative z-10">
                <a className="group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105" href='/'>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                    <span className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-purple-700 group-hover:to-pink-700 transition-all duration-300">
                        ✨ SocialApp
                    </span>
                </a>
            </div>

            <div className="flex gap-3 relative z-10">
                {isLoggedIn && currentUser ? (
                    // Show user profile dropdown when logged in
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100/80 to-blue-100/80 rounded-full shadow-md border border-slate-200/50">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-sm"></div>
                            <span className="text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-600 bg-clip-text text-transparent">
                                {currentUser.fullName}
                            </span>
                        </div>

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                                <div className="relative w-12 h-12 rounded-full ring-4 ring-white shadow-xl overflow-hidden hover:scale-110 transition-all duration-300 cursor-pointer">
                                    <img
                                        alt={currentUser.fullName || "User Avatar"}
                                        src={currentUser.profileImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-lg"></div>
                            </div>

                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-gradient-to-br from-white/95 via-slate-50/95 to-blue-50/95 backdrop-blur-xl rounded-2xl z-[1] mt-3 w-64 p-3 shadow-2xl border border-slate-200/50">
                                <li className="mb-2">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-100/50 to-blue-100/50 border border-slate-200/30">
                                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-200">
                                            <img
                                                src={currentUser.profileImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800 text-sm">{currentUser.fullName}</div>
                                            <div className="text-xs text-slate-500">{currentUser.email}</div>
                                        </div>
                                    </div>
                                </li>

                                <div className="divider my-2"></div>

                                <li>
                                    <a onClick={handleLogout} className="flex items-center gap-3 p-3 text-rose-500 hover:text-rose-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 rounded-xl transition-all duration-200 group font-medium">
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    // Show login button when not logged in
                    <button
                        onClick={handleLogin}
                        className="relative group px-6 py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-blue-400/30 hover:border-purple-400/50 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        <div className="relative flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign In
                        </div>
                    </button>
                )}
            </div>
        </div>
    )
}