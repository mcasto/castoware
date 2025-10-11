// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/UserStore';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react'; // Type-only import

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const { isAuthenticated } = useUserStore();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authenticated = await isAuthenticated();
                setIsAuth(authenticated);
            } catch (error) {
                console.error(error)
                setIsAuth(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkAuth();
    }, [isAuthenticated]);

    if (isChecking) {
        return <div>Loading...</div>;
    }

    return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};
