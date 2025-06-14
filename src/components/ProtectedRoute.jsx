import { useContext } from 'react';
import { Navigate } from 'react-router';
import AuthContext from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {

    const { isLoggedIn } = useContext(AuthContext);
    // setIsLoggedIn(true);
    // If user is not logged in, redirect to home page
    if (!isLoggedIn) {

        return <Navigate to="/login" />;
    }

    // If user is logged in, render the protected component
    return children;
};

export default ProtectedRoute;