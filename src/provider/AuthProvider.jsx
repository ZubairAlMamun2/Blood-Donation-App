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
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme); // Persist theme in localStorage
  }, [theme]);
  const [userData, setUserData] = useState({
      name: '',
      email: '',
      photo: '',
      selecteddistrict: '',
      selectedupazila: '',
      bloodGroup: '',
      isActive: '',
      role: '',
    });
    console.log(userData)
    useEffect(()=>{
      axios.get(`https://blood-donation-xi-two.vercel.app/login/${user?.email}`)
      .then(res=>setUserData({
        name: res.data?.name,
        email: res.data?.email,
        photo: res.data?.photo,
        selecteddistrict: res.data?.selecteddistrict,
        selectedupazila: res.data?.selectedupazila,
        bloodGroup: res.data?.bloodGroup,
        isActive:res.data?.status,
        role:res.data?.role
      }))
     },[])
  const [isActive, setActive] = useState("false");

  const [loading, setLoading] = useState(true);



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

        const response = await axios.get(`https://blood-donation-xi-two.vercel.app/user/${user?.email}`);
        setUserData(response.data);
      
    };

    fetchUserData();
  }, [user]);

  // console.log(isActive)

  const UserInfo = {userData,theme,setTheme,setUserData,isActive,setActive, user, setUser, createNewUser, Logout, Login, loading,UpdateUserProfile,SignInWithGoogle,ResetUserPassword };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      if(currentuser?.email){
        const user={email:currentuser.email}
            axios.post('https://blood-donation-xi-two.vercel.app/jwt',user,{withCredentials:true})
            .then((res)=>{
                // console.log(res.data)
                setLoading(false);
            })
        }
        else{
            axios.post('https://blood-donation-xi-two.vercel.app/logout',{},{withCredentials:true})
            .then((res)=>{
                // console.log('logout',res.data)
                setLoading(false);
            }) 
        }
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
