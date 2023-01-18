import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Profile.css';
import jwt_decode from "jwt-decode";
const jwToken = localStorage.getItem('token')
const authAxios = axios.create( {
    baseURL : 'http://localhost:8080',
    headers : {
        Authorization: `Bearer ${jwToken}`,
    },
});


    function Profile() {

        const url = "http://localhost:8080"
        const [name, setName] = useState("");
        const [lastName, setLastName] = useState("");
        const [accountData, setAccountData] = useState([]);
        const [error, setError] = useState(false);
        const { username , fetchUserData, data} = useContext(AuthContext);
        const jwt = localStorage.getItem("token")
        const decodedToken = jwt_decode(jwt);
        console.log(jwt)
        console.log(decodedToken)
        console.log(data)

        // const FetchProfile = async () => {
        //     try {
        //         const response = await authAxios.get(`/users/${username}`, {});
        //         setAccountData(response.data);
        //
        //     } catch (e) {
        //         console.error(e);
        //         setError(true);
        //     }
        // }
            useEffect(() => {fetchUserData(jwt, decodedToken.sub )}, [] )
            return (
                <>
                    <div className={"container-profile"}>
                    <h1>Profile Page</h1>
                    <section>
                        <p><strong>UserName:</strong>{data.username}</p>
                        <p><strong>Email:</strong>{data.email}</p>
                    </section>
                    </div>

                </>
            );
    }
export default Profile;