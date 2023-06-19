import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSession } from '@descope/react-sdk'


const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useSession()

    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }

    return children;
};


export default ProtectedRoute
