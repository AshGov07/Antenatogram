import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { createContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ loggedIn: false, role: "patient", accessToken: null });
    const refreshInterval = useRef();
    const navigate = useNavigate();

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('/auth/refresh', {}, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            });
            setAuth({ ...auth, "accesstoken": response.data.accesstoken, loggedIn: true });
            if(response.data.pregnancyid) setAuth({...auth, "pregnancyid": response.data.pregnancyid});
            console.log("Token refreshed:", response.data.accesstoken);
            console.log("Pregnancy_id:", response.data.pregnancyid);
        } catch (error) {
            console.log("Refresh failed", error);
            setAuth({ loggedIn: false, role: "patient", accesstoken: null });
            clearInterval(refreshInterval.current);
            navigate('/login');
        }
    };

    useEffect(() => {
        // Debug: log cookies
        console.log("Document cookies:", document.cookie);
        // Only try refresh if a refreshtoken cookie exists
        if (document.cookie.includes("refreshtoken")) {
            refreshAccessToken();
        } else {
            console.log("No refreshtoken cookie found, skipping refreshAccessToken");
        }
    }, []);

    useEffect(() => {
        if (auth.loggedIn) {
            refreshInterval.current = setInterval(refreshAccessToken, 2000);
        }

        return () => {
            if (refreshInterval.current) {
                clearInterval(refreshInterval.current);
            }
        };
    }, [auth.loggedIn]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
