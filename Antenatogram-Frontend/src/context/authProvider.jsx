// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";
// import { createContext, useEffect, useRef, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({ loggedIn: false, role: "patient", accessToken: null });
//     const refreshInterval = useRef();
//     const navigate = useNavigate();

//     const refreshAccessToken = async () => {
//         try {
//             const response = await axios.post('/auth/refresh', {}, {
//                 withCredentials: true,
//                 headers: { 'Content-Type': 'application/json' },
//             });
//             setAuth({ ...auth, "accesstoken": response.data.accesstoken, loggedIn: true });
//             if(response.data.pregnancyid) setAuth({...auth, "pregnancyid": response.data.pregnancyid});
//             console.log("Token refreshed:", response.data.accesstoken);
//             console.log("Pregnancy_id:", response.data.pregnancyid);
//         } catch (error) {
//             console.log("Refresh failed", error);
//             setAuth({ loggedIn: false, role: "patient", accesstoken: null });
//             clearInterval(refreshInterval.current);
//             navigate('/login');
//         }
//     };

//     useEffect(() => {
//         // Debug: log cookies
//         console.log("Document cookies:", document.cookie);
//         // Only try refresh if a refreshtoken cookie exists
//         if (document.cookie.includes("refreshtoken")) {
//             refreshAccessToken();
//         } else {
//             console.log("No refreshtoken cookie found, skipping refreshAccessToken");
//         }
//     }, []);

//     useEffect(() => {
//         if (auth.loggedIn) {
//             refreshInterval.current = setInterval(refreshAccessToken, 2000);
//         }

//         return () => {
//             if (refreshInterval.current) {
//                 clearInterval(refreshInterval.current);
//             }
//         };
//     }, [auth.loggedIn]);

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;


// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";
// import { createContext, useEffect, useRef, useState } from "react";
// import jwt_decode from "jwt-decode";
// const decoded = jwt_decode(token);

//  // ✅ make sure this is installed

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ loggedIn: false, role: "patient", accessToken: null, pregnancyId: null });
//   const refreshInterval = useRef();
//   const navigate = useNavigate();

//   const refreshAccessToken = async () => {
//     try {
//       const response = await axios.post('/auth/refresh', {}, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const decoded = jwtDecode(response.data.accesstoken); // ✅ get patientId
//       const patientId = decoded.sub;

//       const pregnancyRes = await axios.get(`/api/pregnancy/${patientId}`);
//       const pregnancyId = pregnancyRes.data.pregnancy_id;

//       setAuth({
//         loggedIn: true,
//         role: decoded.role,
//         accessToken: response.data.accesstoken,
//         pregnancyId: pregnancyId,
//       });

//       console.log("✅ Token refreshed:", response.data.accesstoken);
//       console.log("📌 Pregnancy ID set:", pregnancyId);
//     } catch (error) {
//       console.log("❌ Refresh failed", error);
//       setAuth({ loggedIn: false, role: "patient", accessToken: null });
//       clearInterval(refreshInterval.current);
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     if (document.cookie.includes("refreshtoken")) {
//       refreshAccessToken();
//     } else {
//       console.log("⛔ No refreshtoken cookie found");
//     }
//   }, []);

//   useEffect(() => {
//     if (auth.loggedIn) {
//       refreshInterval.current = setInterval(refreshAccessToken, 1000 * 60 * 10);
//     }
//     return () => {
//       clearInterval(refreshInterval.current);
//     };
//   }, [auth.loggedIn]);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;


// authProvider.jsx
// import { createContext, useContext, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "../api/axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ loggedIn: false, role: "patient", accessToken: null });
//   const refreshInterval = useRef();
//   const navigate = useNavigate();

//   const refreshAccessToken = async () => {
//     try {
//       const response = await axios.post('/auth/refresh', {}, {
//         withCredentials: true,
//         headers: { 'Content-Type': 'application/json' },
//       });

//       const updatedAuth = {
//         ...auth,
//         accessToken: response.data.accesstoken,
//         loggedIn: true,
//         pregnancyId: response.data.pregnancyid, // Inject pregnancyId here
//       };

//       setAuth(updatedAuth);
//       console.log("Token refreshed:", response.data.accesstoken);
//       console.log("Pregnancy_id:", response.data.pregnancyid);
//     } catch (error) {
//       console.error("Refresh failed", error);
//       setAuth({ loggedIn: false, role: "patient", accessToken: null });
//       clearInterval(refreshInterval.current);
//       navigate("/login");
//     }
//   };

//   useEffect(() => {
//     if (document.cookie.includes("refreshtoken")) {
//       refreshAccessToken();
//     }
//   }, []);

//   useEffect(() => {
//     if (auth.loggedIn) {
//       refreshInterval.current = setInterval(refreshAccessToken, 1000 * 60 * 5); // every 5 mins
//     }
//     return () => clearInterval(refreshInterval.current);
//   }, [auth.loggedIn]);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // ✅ Export this hook to fix the error
// export const useAuth = () => useContext(AuthContext);

// export default AuthContext;



import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const AuthContext = createContext();

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

      const updatedAuth = {
        ...auth,
        accessToken: response.data.accesstoken,
        loggedIn: true,
        pregnancyId: response.data.pregnancyid, // Injected as plain string
      };

      setAuth(updatedAuth);
      console.log("Token refreshed:", response.data.accesstoken);
      console.log("Pregnancy_id:", response.data.pregnancyid);
    } catch (error) {
      console.error("Refresh failed", error);
      setAuth({ loggedIn: false, role: "patient", accessToken: null });
      clearInterval(refreshInterval.current);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (document.cookie.includes("refreshtoken")) {
      refreshAccessToken();
    }
  }, []);

  useEffect(() => {
    if (auth.loggedIn) {
      refreshInterval.current = setInterval(refreshAccessToken, 1000 * 60 * 5); // every 5 mins
    }
    return () => clearInterval(refreshInterval.current);
  }, [auth.loggedIn]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Exported custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;