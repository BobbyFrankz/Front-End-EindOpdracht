import React, {createContext, useEffect, useState} from 'react';
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const url = "http://localhost:8080"
    const [data, setData] = useState([])
    const [auth, setAuth] = useState({

        isAuth: false,
        user: null,
        status: "pending"
    });

    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        // haal de JWT token op uit de local Storage
        const storedToken = localStorage.getItem("token")


        // als er WEL een token is, haal dan opnieuw de gebruikers data op
        if (storedToken) {
            const decodedToken = jwt_decode(storedToken)
            if (storedToken && Math.floor(Date.now()/1000) < decodedToken.exp) {
                console.log("De gebruiker is nog steeds ingelogd")
                const decodedToken = jwt_decode(storedToken)
                void fetchUserData(storedToken, decodedToken.sub)

            } else {
                console.log("De token is verlopen")
                localStorage.removeItem("token")
            }

        } else {
            //als er geen token is doen we niks
            setAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            })
        }
    },[])

    async function fetchUserData(jwt, id, redirect) {
        try {
            const response = await axios.get(`${url}/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                }

            })
            setData(response.data)
            setAuth({
                ...auth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    id: response.data.id,
                    username: response.data.username,
                    artistOrProducer: response.data.artistOrProducer
                },
                status: "done"
            })
            if (redirect) {
                navigate(redirect)
            }
        } catch(e) {
            console.error(e)
            setAuth( {
                ...auth,
                status: "done"
            })
        }
    }

    function login( jwt ) {
        console.log('Gebruiker is ingelogd!');
        const decodedToken = jwt_decode(jwt)
        void fetchUserData(jwt, decodedToken.sub, "/profile" )
        localStorage.setItem('token', jwt)


    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        setAuth({
            isAuth: false,
            user: null,
            status: "done"
        });
        navigate('/');
    }

    const contextData = {
        status: auth.status,
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
        fetchUserData,
        user: auth.user,
        data
    };

    return (
        <AuthContext.Provider value={contextData}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;