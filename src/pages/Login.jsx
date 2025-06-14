import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Use the useAuth hook to get auth functions and state
    const { login, loading, error, clearError } = useAuth();

    const loginUserHandler = async (event) => {
        event.preventDefault();

        // Clear previous errors
        setEmailError('');
        setPasswordError('');
        clearError(); // Clear any existing auth errors

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        let hasErrors = false;

        // Basic validation
        if (!email || !email.trim()) {
            setEmailError('Email is required');
            hasErrors = true;
        }

        if (!password || !password.trim()) {
            setPasswordError('Password is required');
            hasErrors = true;
        }

        // If there are validation errors, don't proceed
        if (hasErrors) {
            return;
        }

        setIsLoading(true);

        try {
            // Use the login function from AuthContext
            const result = await login(email.trim(), password);

            if (result.success) {
                // Navigate to dashboard or home page on successful login
                navigate('/'); // or wherever you want to redirect
            } else {
                // Handle login failure - the error will be set in the context
                // You can also set specific field errors based on the error message
                if (result.error.toLowerCase().includes('email')) {
                    setEmailError(result.error);
                } else if (result.error.toLowerCase().includes('password')) {
                    setPasswordError(result.error);
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setEmailError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
            <div className="max-w-md mx-auto">
                <div className="card bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
                    <div className="card-body">
                        {/* Header with modern icon */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Sign in </h1>
                        </div>
                        {/* Display general auth error if exists */}
                        {error && !emailError && !passwordError && (
                            <div className="alert alert-error mb-6 bg-red-50 border-red-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-red-500 shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-red-700 font-medium">{error}</span>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={loginUserHandler} className="space-y-6">
                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Email Address
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    disabled={isLoading || loading}
                                    className={`input input-bordered w-full text-black bg-white/70 backdrop-blur-sm transition-all duration-300 border-2 focus:border-indigo-400 focus:bg-white ${emailError
                                        ? 'border-red-400 focus:border-red-400'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        } ${(isLoading || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Enter your email address"
                                />
                                {emailError && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {emailError}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label" htmlFor="password">
                                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    disabled={isLoading || loading}
                                    className={`input input-bordered w-full text-black bg-white/70 backdrop-blur-sm transition-all duration-300 border-2 focus:border-indigo-400 focus:bg-white ${passwordError
                                        ? 'border-red-400 focus:border-red-400'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        } ${(isLoading || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Enter your password"
                                />
                                {passwordError && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {passwordError}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Login Button */}
                            <div className="form-control mt-8">
                                <button
                                    type="submit"
                                    disabled={isLoading || loading}
                                    className={`btn w-full font-semibold text-lg py-4 transition-all duration-300 shadow-lg ${(isLoading || loading)
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] border-none'
                                        }`}
                                >
                                    {(isLoading || loading) ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Signing you in...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2">
                                            <span>Sign In</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Footer Links */}
                        <div className="divider my-6"></div>
                        <div className="text-center">
                            <p className="text-gray-600 font-medium">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="font-bold text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:underline"
                                >
                                    Create your account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}