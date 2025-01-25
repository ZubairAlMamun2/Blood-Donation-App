import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';


const PrivetRoute = ({children}) => {
    // Simple check for a token in cookies
    const{user,loading}=useContext(AuthContext);
    const location =useLocation();
   
    if(loading){
        return <Loading />
    }
    if(user&&user?.email){
        return children
    }

    return <Navigate state={location.pathname} to={`/auth/login`} />
}

export default PrivetRoute