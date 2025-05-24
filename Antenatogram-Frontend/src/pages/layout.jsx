import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/bars/navbar";
import useAuth from "../hooks/useAuth";

const Layout = () => {

    const { auth } = useAuth();
    const location = useLocation();

    let gradientClasses = "font-Inter flex flex-col h-screen";

    if (auth.role === 'doctor') {
        gradientClasses += " bg-gradient-to-b from-blue-800 via-blue-900 to-blue-900";
    } else {
        gradientClasses += " bg-gradient-to-b from-gradstart to-gradend";
    }

    return (
        <main className={gradientClasses}>
            {/* Remove current route debug message */}
            {!(location.pathname === "/register" || location.pathname === "/login") && (
                <div className="h-1/12">
                    <Navbar />
                </div>
            )}
            <div className="flex-1 h-full overflow-x-hidden">
                <Outlet />
            </div>
        </main>
    );
};

export default Layout;
