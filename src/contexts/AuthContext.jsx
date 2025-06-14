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

// LocalStorage keys
const STORAGE_KEYS = {
    USERS: 'posts_app_users',
    CURRENT_USER: 'posts_app_current_user',
    SESSION: 'posts_app_session',
    POSTS: 'posts_app_posts' // Add this line
};
// Add initial posts data
const initialPosts = [
    {
        postId: 1,
        userId: 1,
        userName: "Ali",
        userImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        createdAt: new Date().toISOString(),
        postTitle: "Hello World - My First Post",
        postDescription: "This is my first post on this amazing platform. I'm excited to share my thoughts and connect with everyone here. Looking forward to great discussions!",
        postImageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
    },
    {
        postId: 2,
        userId: 1,
        userName: "Ali",
        userImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        createdAt: new Date().toISOString(),
        postTitle: "Beautiful Sunset Photography Tips",
        postDescription: "Just captured this amazing sunset yesterday! Here are some tips for fellow photographers: use golden hour timing, adjust your white balance, and don't forget to experiment with different angles.",
        postImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",

    },
    {
        postId: 3,
        userId: 1,
        userName: "Ali",
        userImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
        createdAt: new Date().toISOString(),
        postTitle: "Coffee Culture Around the World",
        postDescription: "Exploring different coffee cultures during my travels. From Italian espresso to Ethiopian coffee ceremonies, each culture has its unique way of enjoying this beloved beverage. What's your favorite coffee style?",
        postImageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",

    }

];

// Helper functions for localStorage operations
const storageHelpers = {
    // Get data from localStorage
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Error getting ${key} from localStorage:`, error);
            return null;
        }
    },

    // Set data to localStorage
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error setting ${key} to localStorage:`, error);
            return false;
        }
    },

    // Remove data from localStorage
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing ${key} from localStorage:`, error);
            return false;
        }
    }
};

// Validation helper functions
const validators = {
    // Email validation
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Password validation
    isValidPassword: (password) => {
        return password && password.length >= 6;
    },
    // Name validation
    isValidName: (name) => {
        return name && name.trim().length >= 2;
    }
};

// Generate unique ID
const generateId = () => {
    return 'user_' + Date.now();
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    // State management
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [posts, setPosts] = useState([]);

    // Initialize auth state on component mount
    useEffect(() => {
        initializeAuth();
    }, []);

    // Initialize authentication state from localStorage
    const initializeAuth = () => {
        try {
            setLoading(true);

            // Load users from localStorage
            const storedUsers = storageHelpers.getItem(STORAGE_KEYS.USERS) || [];
            setUsers(storedUsers);

            // Load current user session
            const storedCurrentUser = storageHelpers.getItem(STORAGE_KEYS.CURRENT_USER);
            const sessionData = storageHelpers.getItem(STORAGE_KEYS.SESSION);

            if (storedCurrentUser && sessionData && sessionData.isActive) {
                setCurrentUser(storedCurrentUser);
                setIsLoggedIn(true);
            }
            const storedPosts = storageHelpers.getItem(STORAGE_KEYS.POSTS);
            if (storedPosts) {
                setPosts(storedPosts);
            } else {
                // Save initial posts if none exist
                storageHelpers.setItem(STORAGE_KEYS.POSTS, initialPosts);
                setPosts(initialPosts);
            }

            setLoading(false);
        } catch (error) {
            console.error('Error initializing auth:', error);
            setError('Failed to initialize authentication');
            setLoading(false);
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

    // Register new user
    const register = async (userData) => {
        try {
            setLoading(true);
            setError('');

            const { email, password, fullName, profileImage, bio = '' } = userData;

            // Validation
            if (!validators.isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }

            if (!validators.isValidPassword(password)) {
                throw new Error('Password must be at least 6 characters long');
            }


            if (!validators.isValidName(fullName)) {
                throw new Error('Last name must be at least 2 characters long');
            }

            // Check if user already exists
            const existingUser = users.find(
                user => user.email.toLowerCase() === email.toLowerCase()
            );

            if (existingUser) {
                if (existingUser.email.toLowerCase() === email.toLowerCase()) {
                    throw new Error('An account with this email already exists');
                }
            }

            // Create new user
            const newUser = {
                id: generateId(),
                email: email.toLowerCase().trim(),
                password: password, // In real app, this should be hashed
                fullName: fullName.trim(),
                profileImage: profileImage.trim(),
                bio: bio.trim(),
                createdAt: new Date().toISOString()
            };

            // Update users array
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);

            // Save to localStorage
            storageHelpers.setItem(STORAGE_KEYS.USERS, updatedUsers);

            // Auto-login the new user
            loginUser(newUser);

            setLoading(false);
            return { success: true, user: newUser };

        } catch (error) {
            setError(error.message);
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    // Login user
    const login = async (email, password) => {
        try {
            setLoading(true);
            setError('');

            // Validation
            if (!email || !password) {
                throw new Error('Please enter both email and password');
            }

            if (!validators.isValidEmail(email)) {
                throw new Error('Please enter a valid email address');
            }

            // Find user
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

            if (!user) {
                throw new Error('No account found with this email address');
            }

            // Check password
            if (user.password !== password) {
                throw new Error('Incorrect password');
            }

            // Login user
            loginUser(user);

            setLoading(false);
            return { success: true, user };

        } catch (error) {
            setError(error.message);
            setLoading(false);
            return { success: false, error: error.message };
        }
    };

    // Helper function to login user (used by both login and register)
    const loginUser = (user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);

        // Save to localStorage
        storageHelpers.setItem(STORAGE_KEYS.CURRENT_USER, user);
        storageHelpers.setItem(STORAGE_KEYS.SESSION, {
            isActive: true,
            loginTime: new Date().toISOString(),
            userId: user.id
        });
    };

    // Logout user
    const logout = () => {
        try {
            setCurrentUser(null);
            setIsLoggedIn(false);
            setError('');

            // Clear localStorage
            storageHelpers.removeItem(STORAGE_KEYS.CURRENT_USER);
            storageHelpers.removeItem(STORAGE_KEYS.SESSION);

            return { success: true };

        } catch (error) {
            console.error('Error during logout:', error);
            return { success: false, error: 'Failed to logout' };
        }
    };


    // Check if email exists
    const checkEmailExists = (email) => {
        return users.some(user => user.email.toLowerCase() === email.toLowerCase());
    };

    // Clear error manually
    const clearError = () => {
        setError('');
    };

    const createPost = (postData) => {
        try {
            if (!currentUser) {
                throw new Error('You must be logged in to create a post');
            }

            const now = new Date();
            const newPost = {
                ...postData,
                postId: now.getTime(),
                userId: currentUser.id,
                userName: currentUser.fullName,
                userImageUrl: currentUser.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
                createdAt: now.toISOString(),
            };

            const updatedPosts = [newPost, ...posts];
            setPosts(updatedPosts);
            storageHelpers.setItem(STORAGE_KEYS.POSTS, updatedPosts);

            return { success: true, post: newPost };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    const updatePost = (postId, postData) => {
        try {
            const updatedPosts = posts.map(post =>
                post.postId === postId ? { ...post, ...postData, updatedAt: new Date().toISOString() } : post
            );

            setPosts(updatedPosts);
            storageHelpers.setItem(STORAGE_KEYS.POSTS, updatedPosts);

            return { success: true, posts: updatedPosts };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };

    const deletePost = (postId) => {
        try {
            const updatedPosts = posts.filter(post => post.postId !== postId);
            setPosts(updatedPosts);
            storageHelpers.setItem(STORAGE_KEYS.POSTS, updatedPosts);

            return { success: true, posts: updatedPosts };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        }
    };


    // Context value object
    const value = {
        // State
        currentUser,
        isLoggedIn,
        users,
        loading,
        error,

        // Authentication functions
        register,
        login,
        logout,


        // Utility functions
        checkEmailExists,
        clearError,


        // Add posts values
        posts,
        createPost,
        updatePost,
        deletePost,

        // Validation helpers (useful for forms)
        validators
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;