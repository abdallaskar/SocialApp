import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import { useEffect } from 'react';

export default function Register() {
    const navigate = useNavigate();
    const { register, loading, error, clearError } = useAuth(); // Use AuthContext

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }

        // Clear AuthContext error when user starts typing
        if (error) {
            clearError();
        }
    };

    useEffect(() => {
        if (!window.uploadcare) {
            const script = document.createElement('script');
            script.src = 'https://ucarecdn.com/libs/widget/3.x/uploadcare.full.min.js';
            script.async = true;
            script.onload = () => {
                initializeUploadcare();
            };
            document.head.appendChild(script);
        } else {
            initializeUploadcare();
        }
    }, []);

    const initializeUploadcare = () => {
        if (window.uploadcare) {
            window.uploadcare.start({
                publicKey: 'd6499efc521a6a295718',
                tabs: 'file camera url  drive ',
                imagesOnly: true,
            });

            const widget = window.uploadcare.Widget('[role=uploadcare-uploader]');
            if (widget) {
                widget.onUploadComplete((info) => {
                    setImageUrl(info.cdnUrl);
                    setUploading(false);
                });

                widget.onChange((file) => {
                    if (file) {
                        setUploading(true);
                        file.done(() => {
                            setUploading(false);
                        });
                    } else {
                        setImageUrl('');
                        setUploading(false);
                    }
                });
            }
        }
    };

    const registerUserHandler = async (e) => {
        e.preventDefault();

        // Clear previous errors and messages
        setErrors({ name: '', email: '', password: '', confirmPassword: '' });
        setSuccessMessage('');
        clearError();

        const { name, email, password, confirmPassword } = formData;

        let hasErrors = false;
        let newErrors = {};

        // Validate name
        if (!name || name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
            hasErrors = true;
        }

        // Validate email (basic validation, AuthContext will do more detailed validation)
        if (!email || !email.includes('@')) {
            newErrors.email = 'Please enter a valid email address';
            hasErrors = true;
        }

        // Validate password (basic validation, AuthContext will do more detailed validation)
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            hasErrors = true;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            hasErrors = true;
        }

        // If there are validation errors, don't proceed
        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            // Use AuthContext register function
            const result = await register({
                fullName: name.trim(),
                email: email.trim(),
                password: password,
                profileImage: imageUrl || '' // Ensure imageUrl is never undefined
            });

            if (result.success) {
                // Registration successful
                setSuccessMessage('Account created successfully! Redirecting to home...');

                // Clear the form
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });

                // Redirect to home after a delay
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                // Registration failed - AuthContext error will be displayed
                // The error is already set in the AuthContext
                console.log("faild to regestration");
            }
        } catch (err) {
            console.error('Registration error:', err);
            setErrors((prev) => ({
                ...prev,
                email: 'An unexpected error occurred. Please try again.'
            }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center pt-14">
            <div className="max-w-lg mx-auto">
                <div className="card bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/20">
                    <div className="card-body">
                        {/* Header */}
                        <div className="text-center mb-2">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ">Create Account</h1>
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="alert alert-success mb-6 bg-green-50 border-green-200">
                                <svg className="stroke-green-500 shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-green-700 font-medium">{successMessage}</span>
                            </div>
                        )}

                        {/* AuthContext Error Message */}
                        {error && (
                            <div className="alert alert-error mb-6 bg-red-50 border-red-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-red-500 shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-red-700 font-medium">{error}</span>
                            </div>
                        )}

                        {/* Registration Form */}
                        <div className="space-y-2">
                            {/* Name Field */}
                            <div className="form-control">
                                <label className="label" htmlFor="name">
                                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Full Name
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name || ''}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                    className={`input input-bordered w-full text-black bg-white/70 backdrop-blur-sm transition-all duration-300 border-2 focus:border-indigo-400 focus:bg-white ${errors.name
                                        ? 'border-red-400 focus:border-red-400'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {errors.name}
                                        </span>
                                    </label>
                                )}
                            </div>

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
                                    value={formData.email || ''}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                    className={`input input-bordered w-full text-black bg-white/70 backdrop-blur-sm transition-all duration-300 border-2 focus:border-indigo-400 focus:bg-white ${errors.email
                                        ? 'border-red-400 focus:border-red-400'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {errors.email}
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
                                    value={formData.password || ''}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                    className={`input input-bordered w-full text-black bg-white/70 backdrop-blur-sm transition-all duration-300 border-2 focus:border-indigo-400 focus:bg-white ${errors.password
                                        ? 'border-red-400 focus:border-red-400'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Create a strong password"
                                />
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {errors.password}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-control">
                                <label className="label" htmlFor="confirmPassword">
                                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5-4v6m0 0l-3 3m3-3l3 3" />
                                        </svg>
                                        Confirm Password
                                    </span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword || ''}
                                    onChange={handleInputChange}
                                    required
                                    disabled={loading}
                                    className={`input input-bordered w-full text-black bg-white/70 backdrop-blur-sm transition-all duration-300 border-2 focus:border-indigo-400 focus:bg-white ${errors.confirmPassword
                                        ? 'border-red-400 focus:border-red-400'
                                        : 'border-gray-200 hover:border-indigo-300'
                                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-red-500 font-medium flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {errors.confirmPassword}
                                        </span>
                                    </label>
                                )}
                            </div>

                            {/* Upload Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Profile Image (Optional)
                                    </span>
                                </label>

                                <div className="border-2 border-dashed border-indigo-200 rounded-lg p-6 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 bg-white/50 backdrop-blur-sm">
                                    <input
                                        className="hover:cursor-pointer"
                                        type="hidden"
                                        role="uploadcare-uploader"
                                        data-public-key="d6499efc521a6a295718"
                                        data-tabs="file camera url facebook gdrive gphotos dropbox instagram"
                                        data-crop="free"
                                        data-preview-step="true"
                                        data-clearable="true"
                                        data-multiple="false"
                                        data-images-only="true"
                                        value={imageUrl}
                                    />

                                    {uploading && (
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium">
                                                <span className="loading loading-spinner loading-md text-indigo-600"></span>
                                                Uploading image...
                                            </div>
                                        </div>
                                    )}

                                    {imageUrl && !uploading && (
                                        <div className="text-center">
                                            <div className="alert alert-success mb-4 bg-green-50 border-green-200">
                                                <svg className="stroke-green-500 shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-green-700 font-medium">Image uploaded successfully</span>
                                            </div>
                                            <figure className="inline-block">
                                                <img
                                                    src={imageUrl}
                                                    alt="Profile preview"
                                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-200 shadow-lg"
                                                />
                                            </figure>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Register Button */}
                            <div className="form-control mt-2">
                                <button
                                    onClick={registerUserHandler}
                                    disabled={loading}
                                    className={`btn w-full font-semibold text-lg py-1 transition-all duration-300 shadow-lg ${loading
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] border-none'
                                        }`}>
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-3">
                                            <span className="loading loading-spinner loading-sm"></span>
                                            Creating Account...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center ">
                                            <span>Create Account</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* Footer Links */}
                        <div className="divider "></div>
                        <div className="text-center">
                            <p className="text-gray-600 font-medium">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="font-bold text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:underline">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}