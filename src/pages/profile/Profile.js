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
        const [encodedString, setEncodedString] = useState('');
        const [decodedString, setDecodedString] = useState('');
        const [name, setName] = useState("");
        const [lastName, setLastName] = useState("");
        const [accountData, setAccountData] = useState([]);
        const [error, setError] = useState(false);
        const { user , fetchUserData, data} = useContext(AuthContext);
        const jwt = localStorage.getItem("token")
        const decodedToken = jwt_decode(jwt);
        const imageUrl = `data:image/*;base64,${(data.image.data)}`;

        useEffect(() => {fetchUserData(jwt, decodedToken.sub )}, [decodedToken.sub] )

        function utf8_to_b64(str) {
            return window.btoa(unescape(encodeURIComponent(str)));
        }

        function b64_to_utf8(str) {
            return decodeURIComponent(escape(window.atob(str)));
        }

        // Usage:
        utf8_to_b64("✓ à la mode"); // "4pyTIMOgIGxhIG1vZGU="
        b64_to_utf8("4pyTIMOgIGxhIG1vZGU="); // "✓ à la mode"

        function handleConversion() {
            const newEncodedString = utf8_to_b64("✓ à la mode");
            setEncodedString(newEncodedString);
            const newDecodedString = b64_to_utf8(newEncodedString);
            setDecodedString(newDecodedString);
        }
        useEffect(() => {
            const newEncodedString = utf8_to_b64("✓ à la mode");
            setEncodedString(newEncodedString);
            const newDecodedString = b64_to_utf8(newEncodedString);
            setDecodedString(newDecodedString);
        }, []);


            return (
                <>
                    <div className={"container-profile"}>
                    <h1>Profile Page</h1>
                    <section>
                        <p><strong>UserName:</strong>{user.username}</p>
                        <p><strong>Email:</strong>{user.email}</p>
                        <picture>
                            {imageUrl && <img  src={imageUrl} alt="profile-image1"/>}
                        </picture>
                    </section>
                    </div>

                </>
            );
    }
export default Profile;