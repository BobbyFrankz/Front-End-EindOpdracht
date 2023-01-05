import React from 'react';
import {useState} from "react";
import {useNavigate} from "react-router-dom"


export const AuthContext = React.createContext({});

function AuthContextProvider({children, email})  {
    const [Auth, setAuth] = useState({
        isAuth: false,
        user: ''
    });
    const navigate = useNavigate();

    function login({email}) {
        setAuth({isAuth:true, user : email});
        console.log("Gebruiker is ingelogd!")
        navigate('/profile')
    }

    function logout() {
        setAuth({isAuth:false, user : ""});
        console.log("Gebruiker is uitgelogd!");
        navigate('/');
    }
    const data = {
        isAuth : Auth.isAuth,
        user: Auth.user,
        login: login,
        logout: logout
    };
    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>

    )
}
export default AuthContextProvider;