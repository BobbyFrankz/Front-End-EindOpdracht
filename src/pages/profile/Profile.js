import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import './Profile.css';
import vocaly from '../../assets/vocaly.PNG'
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
        const { user , fetchUserData, data} = useContext(AuthContext);
        const jwt = localStorage.getItem("token")
        const decodedToken = jwt_decode(jwt);
        let imageUrl = '';
        if (data && data.image && data.image.data) {
            imageUrl = `data:image/*;base64,${(data.image.data)}`;
        } else {
            imageUrl = vocaly;
        }


        useEffect(() => {fetchUserData(jwt, decodedToken.sub )}, [decodedToken.sub] )


            return (
                <>
                    <div className={"container-profile"}>
                    <h1>Profile Page</h1>
                    <section>
                        <p><strong>UserName:</strong>{user.username}</p>
                        <p><strong>Email:</strong>{user.email}</p>
                        <picture>
                            {imageUrl ? <img  src={imageUrl} alt={vocaly}/> : null}
                        </ picture>
                    </section>
                    </div>

                </>
            );
    }
export default Profile;