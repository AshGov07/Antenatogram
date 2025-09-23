import axios from "../api/axios"


const useRefreshToken = async () => {
    
        try {
            const response = await axios.get('/refresh', {
                withCredentials: true
            });
            const newAccessToken = response.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
        } catch (error) {
            return(Promise.reject(error));            
        } 
    }

export default useRefreshToken