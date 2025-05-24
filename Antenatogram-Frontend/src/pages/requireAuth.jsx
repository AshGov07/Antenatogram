/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles, requiredAuthParams }) => {
    const { auth } = useAuth();
    const location = useLocation();

    let isAllowed = allowedRoles.includes(auth.role) && auth.loggedIn;
    let authparams = true;
    if (requiredAuthParams) authparams = requiredAuthParams.every(param => auth[param] != null);

    // Prevent infinite redirect loop
    if (isAllowed && !authparams && location.pathname === "/profile") {
        // Already on /profile, don't redirect again
        return <Outlet />;
    }

    return (
        isAllowed ? (
            authparams ? (
                <Outlet />
            ) : (
                <Navigate to="/profile" state={{ from: location }} replace />
            )
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default RequireAuth;
