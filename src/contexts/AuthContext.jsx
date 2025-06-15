import { createContext, useContext, useState, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the Auth Context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// API Base URL - adjust this to match your backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API helper functions
const apiHelpers = {
    // Generic API request function
    request: async (endpoint, options = {}) => {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = sessionStorage.getItem('auth_token');

        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options.headers,
            },
            ...options,
        };


        if (config.body && typeof config.body === 'object') {
            config.body = JSON.stringify(config.body);
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();


            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error(`API request failed for ${endpoint}:`, error);
            throw error;
        }
    },

    // GET request
    get: (endpoint) => apiHelpers.request(endpoint),

    // POST request
    post: (endpoint, data) => apiHelpers.request(endpoint, {
        method: 'POST',
        body: data,
    }),

    // PUT request
    put: (endpoint, data) => apiHelpers.request(endpoint, {
        method: 'PUT',
        body: data,
    }),

    // DELETE request
    delete: (endpoint) => apiHelpers.request(endpoint, {
        method: 'DELETE',
    }),
};

// Token management with debug
const tokenHelpers = {
    get: () => {
        const token = sessionStorage.getItem('auth_token');
        return token;
    },
    set: (token) => {
        console.log('Setting token in sessionStorage:', token ? 'Token provided' : 'No token');
        sessionStorage.setItem('auth_token', token);
    },
    remove: () => {
        console.log('Removing token from sessionStorage');
        sessionStorage.removeItem('auth_token');
    },
};

// Validation helper functions
const validators = {
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isValidPassword: (password) => {
        return password && password.length >= 6;
    },
    isValidName: (name) => {
        return name && name.trim().length >= 2;
    }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    // State management
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);

    // Initialize auth state on component mount
    useEffect(() => {
        initializeAuth();
    }, []);

    // Initialize authentication state from token
    const initializeAuth = async () => {
        try {
            setLoading(true);
            const token = tokenHelpers.get();
            await loadPosts();
            if (token) {
                try {
                    // Verify token and get user data
                    const userData = await apiHelpers.get('/auth/verify-token');
                    console.log('Token verification successful:', userData);

                    setCurrentUser(userData.user);
                    setIsLoggedIn(true);

                    // Load posts after authentication
                    await loadPosts();
                } catch (tokenError) {
                    console.error('Token verification failed:', tokenError);
                    // Token is invalid, remove it
                    tokenHelpers.remove();
                    setCurrentUser(null);
                    setIsLoggedIn(false);
                }
            } else {
                console.log('No token found, user not logged in');
            }
        } catch (error) {
            console.error('Error initializing auth:', error);
            tokenHelpers.remove();
            setCurrentUser(null);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    // Load posts from backend
    const loadPosts = async () => {
        try {

            const response = await apiHelpers.get('/posts');
            setPosts(response.posts || []);
        } catch (error) {
            console.error('Error loading posts:', error);
            setError('Failed to load posts');
        }
    };

    // Clear error after some time
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Login user
    const login = async (email, password) => {
        try {
            setLoading(true);
            setError('');

            // Client-side validation
            if (!email || !password) {
                throw new Error('Please enter both email and password');
            }

            if (!validators.isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Make API request
            const response = await apiHelpers.post('/auth/login', {
                email: email.toLowerCase().trim(),
                password,
            });

            // Handle successful login
            if (response.token) {
                tokenHelpers.set(response.token);
                setCurrentUser(response.user);
                setIsLoggedIn(true);

                // Load posts after successful login
                await loadPosts();
            }

            setLoading(false);
            return { success: true, user: response.user };

        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    // Register new user
    const register = async (userData) => {
        try {
            setLoading(true);
            setError('');

            const { email, password, fullName, profileImage, bio = '' } = userData;

            console.log('Attempting registration for:', email);

            // Client-side validation
            if (!validators.isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }

            if (!validators.isValidPassword(password)) {
                throw new Error('Password must be at least 6 characters long');
            }

            if (!validators.isValidName(fullName)) {
                throw new Error('Full name must be at least 2 characters long');
            }

            // Make API request
            const response = await apiHelpers.post('/auth/register', {
                email: email.toLowerCase().trim(),
                password,
                fullName: fullName.trim(),
                profileImage: profileImage?.trim() || '',
                bio: bio.trim(),
            });

            console.log('Registration successful:', response);

            // Handle successful registration
            if (response.token) {
                tokenHelpers.set(response.token);
                setCurrentUser(response.user);
                setIsLoggedIn(true);

                // Load posts after successful registration
                await loadPosts();
            }

            setLoading(false);
            return { success: true, user: response.user };

        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message);
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    // Logout user
    const logout = async () => {
        try {
            setLoading(true);
            console.log('Logging out user');

            // Clear local state
            setCurrentUser(null);
            setIsLoggedIn(false);
            setError('');
            // setPosts([]);

            // Clear token
            tokenHelpers.remove();

            setLoading(false);
            return { success: true };

        } catch (error) {
            console.error('Error during logout:', error);
            setLoading(false);
            return { success: false, error: 'Failed to logout' };
        }
    };

    // Create new post
    const createPost = async (postData) => {
        try {

            const token = tokenHelpers.get();

            if (!currentUser) {
                throw new Error('You must be logged in to create a post');
            }

            if (!token) {
                throw new Error('Authentication token not found. Please log in again.');
            }

            const response = await apiHelpers.post('/posts', postData);

            console.log('Post created successfully:', response);

            // Add the new post to the beginning of the posts array
            const newPost = response.post;
            setPosts(prevPosts => [newPost, ...prevPosts]);

            return { success: true, post: newPost };
        } catch (error) {


            // If it's an auth error, might need to re-login
            if (error.message.includes('Token verification failed') ||
                error.message.includes('Unauthorized')) {
                console.log('Authentication failed, clearing user session');
                setCurrentUser(null);
                setIsLoggedIn(false);
                tokenHelpers.remove();
                setError('Your session has expired. Please log in again.');
            } else {
                setError(error.message);
            }

            return { success: false, error: error.message };
        }
    };

    // Update existing post
    const updatePost = async (postId, postData) => {
        try {
            const response = await apiHelpers.put(`/posts/${postId}`, postData);

            // Update the post in the posts array using the correct field name
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.postId === postId ? response.post : post
                )
            );

            return { success: true, post: response.post };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    // Delete post
    const deletePost = async (postId) => {
        try {
            await apiHelpers.delete(`/posts/${postId}`);

            // Remove the post from the posts array using the correct field name
            setPosts(prevPosts =>
                prevPosts.filter(post => post.postId !== postId)
            );

            return { success: true };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    // Refresh posts
    const refreshPosts = async () => {
        await loadPosts();
    };

    // Check if email exists
    const checkEmailExists = async (email) => {
        try {
            const response = await apiHelpers.post('/auth/check-email', { email });
            return response.exists;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    // Clear error manually
    const clearError = () => {
        setError('');
    };

    // Update user profile
    const updateProfile = async (profileData) => {
        try {
            const response = await apiHelpers.put('/users/profile', profileData);
            setCurrentUser(response.user);
            return { success: true, user: response.user };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    // Debug function to check auth state
    const debugAuthState = () => {
        console.log('=== AUTH STATE DEBUG ===');
        console.log('Current user:', currentUser);
        console.log('Is logged in:', isLoggedIn);
        console.log('Loading:', loading);
        console.log('Error:', error);
        console.log('Token:', tokenHelpers.get() ? 'Exists' : 'Not found');
        console.log('Posts count:', posts.length);
    };

    // Context value object
    const value = {
        // State
        currentUser,
        isLoggedIn,
        loading,
        error,
        posts,

        // Authentication functions
        register,
        login,
        logout,

        // Post functions
        createPost,
        updatePost,
        deletePost,
        refreshPosts,

        // User functions
        updateProfile,
        checkEmailExists,

        // Utility functions
        clearError,
        validators,
        debugAuthState, // Add debug function

        // API helpers
        apiHelpers,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;