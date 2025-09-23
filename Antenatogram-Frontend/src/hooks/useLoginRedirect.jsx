import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth"; 
 
 const useLoginRedirect = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();
    navigate('/login');
    setAuth("");
    return;
 }
 
 export default useLoginRedirect