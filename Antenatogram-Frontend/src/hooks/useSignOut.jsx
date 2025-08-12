import  useAuth  from "./useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const signOut = async () => {
        try {
           await axios.post("/auth/logout", {}, {withCredentials: true});
           navigate('/')
            
        } catch (error) {
            console.log(error);            
        }
        setAuth({role:"patient", loggedIn: false});
    };

    return signOut;
};

export default useSignOut;
