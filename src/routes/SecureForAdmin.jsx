
import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';


const SecureForAdmin = ({children}) => {
    // const isAuthenticated = document.cookie.includes('token'); // Simple check for a token in cookies
    const{userData,loading}=useContext(AuthContext);
    const location =useLocation();
    // if (!isAuthenticated) {
    //     return <Navigate to="/auth/login" replace />;
    // }

    
   
    // console.log(location)
    if(loading){
        return <Loading />
    }
    if(userData?.role=='admin'){
        return children
    }

    return <Navigate state={location.pathname} to={`/`} />
}

export default SecureForAdmin

