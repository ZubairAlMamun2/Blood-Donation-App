import {  createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
      name: '',
      email: '',
      photo: '',
      selecteddistrict: '',
      selectedupazila: '',
      bloodGroup: '',
      isActive: '',
    });
    useEffect(()=>{
      axios.get(`http://localhost:5000/login/${user?.email}`)
      .then(res=>setUser({
        name: res.data?.name,
        email: res.data?.email,
        photo: res.data?.photo,
        selecteddistrict: res.data?.selecteddistrict,
        selectedupazila: res.data?.selectedupazila,
        bloodGroup: res.data?.bloodGroup,
        isActive:res.data?.status
      }))
     },[])
  const [isActive, setActive] = useState("false");

  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
      localStorage.getItem("theme") || "light"
    );
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme); // Persist theme in localStorage
    }, [theme]);



  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const Logout = () => {
    setLoading(true);
    setActive("false")
    return signOut(auth);
  };

  const Login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const UpdateUserProfile=(updateddata)=>{
    return updateProfile(auth.currentUser,updateddata);
  }

  const ResetUserPassword=(Email)=>{
    return sendPasswordResetEmail(auth,Email);
  }

  const SignInWithGoogle=(auth,provider)=>{
    return signInWithPopup(auth, provider)
  }



  useEffect(() => {
    const fetchUserData = async () => {

        const response = await axios.get(`http://localhost:5000/user/${user?.email}`);
        setUserData(response.data);
      
    };

    fetchUserData();
  }, [user]);

  // console.log(isActive)

  const UserInfo = {userData,setUserData,isActive,setActive, user,setTheme,theme, setUser, createNewUser, Logout, Login, loading,UpdateUserProfile,SignInWithGoogle,ResetUserPassword };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      // if(currentuser?.email){
      //   const user={email:currentuser.email}
      //       axios.post('https://group-study-zeta.vercel.app/jwt',user,{withCredentials:true})
      //       .then((res)=>{
      //           // console.log(res.data)
      //           setLoading(false);
      //       })
      //   }
      //   else{
      //       axios.post('https://group-study-zeta.vercel.app/logout',{},{withCredentials:true})
      //       .then((res)=>{
      //           // console.log('logout',res.data)
      //           setLoading(false);
      //       }) 
      //   }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={UserInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
