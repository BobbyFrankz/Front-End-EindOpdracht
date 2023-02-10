import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';

import './SignUp.css';
import axios from "axios";
import logIn from "../login/LogIn";
import {useForm} from "react-hook-form";
import vocaly from '../../assets/vocaly.PNG'


function SignUp() {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState([]);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [enabled] = useState(true);
    const [apikey] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [artistOrProducer, setArtistOrProducer] = useState(false);
    const [artistOrProducerError, setArtistOrProducerError] = useState("");
    const [file, setFile] = useState(null);
    const {handleSubmit} = useForm();
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadMessageArtistOrProducer, setUploadMessageArtistOrProducer] = useState('');
    const [uploadMessageUserName, setUploadMessageUserName] = useState('');
    const [preview, setPreview] = useState('')
    const [artistSelected, setArtistSelected] = useState(false);
    const [producerSelected, setProducerSelected] = useState(false);
    const url = "http://localhost:8080"

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            setEmailError("Invalid email address");
            return false;
        }
        setEmailError("");
        return true;
    };

    const handleArtistChange = () => {
        setArtistSelected(true);
        setProducerSelected(false);
    };

    const handleProducerChange = () => {
        setArtistSelected(false);
        setProducerSelected(true);
    };

    async function onSubmit(event) {
        event.preventDefault();
        if (password !== repeatPassword) {
            setUploadMessage('Passwords do not match!');
            return;
        } else if (!password) {
                setUploadMessage('Please fill in a password');
                return;
        } else if (!username) {
            setUploadMessageUserName('Please fill in a username');
            return;
        } else if (!artistSelected && !producerSelected) {
        setUploadMessageArtistOrProducer("Please Select if you are a artist or producer!")
            return;
        } else {
            setError(false);
            setUploadMessage('');
        }

        try {
            const {data} = await axios.post(`${url}/users`, {
                    username: username,
                    password: password,
                    enabled: enabled,
                    apikey: apikey,
                    email: email,
                    artistOrProducer: artistOrProducer

            });
            void await HandleImageSubmit()
            setAccountData(data);
            console.log(data)
           navigate("/signin")

        } catch (e) {
            console.error(e);
            setError(true);
        }

    }


    async function HandleImageSubmit() {
        try {
            // Create a FormData object to store the file data
            const formData = new FormData();
            formData.append("file", file);

            // Send the post request using axios
            let response = await axios.post(`${url}/users/${username}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response)
            setData(response.data);
            setUploadMessage("File uploaded successfully!");

        } catch (error) {
            setUploadMessage("Error: " + error);
            console.error(error);
        }
    }

    function handleImageChange(e) {
        let file = e.target.files[0]
            setFile(file)
        setPreview(URL.createObjectURL(file))

    }

    return (
        <>
            <form>
                <div className="form-container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>

                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text"
                           placeholder="Enter Username"
                           name="username" id="username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)} required/>
                    {uploadMessageUserName && <div style={{ color: "red" }}>{uploadMessageUserName}</div>}

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email"
                           placeholder="Enter Email"
                           name="email" id="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           onBlur={validateEmail}
                           required />
                    {emailError && <div style={{ color: "red" }}>{emailError}</div>}

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password"
                           placeholder="Enter Password"
                           name="psw" id="psw"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>


                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password"
                           placeholder="Repeat Password"
                           name="psw-repeat"
                           id="psw-repeat"
                           value={repeatPassword}
                           onChange={(e) => setRepeatPassword(e.target.value)} required/>
                    {uploadMessage ? <div style={{ color: "red" }}>{uploadMessage}</div> : null}

                    <section className={"upload-image"}>
                        <h2>Upload a Profile photo (OPTIONAL)</h2>
                        <input onChange={handleImageChange}
                               type="file"
                               name="file" />
                        {preview && <img src={preview} alt="vocaly"/>}
                    </section>
                    <h2>Select if you are an Artist or a producer</h2>
                    <div className="wrapper">
                        <input
                            type="radio"
                            name="select"
                            id="option-1"
                            checked={artistSelected}
                            onChange={handleArtistChange}
                            required
                        />
                        <label htmlFor="option-1" className="option option-1" />
                        <div className="dot" />
                        <span>Artist</span>

                        <input
                            type="radio"
                            name="select"
                            id="option-2"
                            checked={producerSelected}
                            onChange={handleProducerChange}
                            required
                        />
                        <label htmlFor="option-2" className="option option-2" />
                        <div className="dot" />
                        <span>Producer</span>
                        {uploadMessageArtistOrProducer ? <div style={{ color: "red" }}>{uploadMessageArtistOrProducer}</div> : null}
                    </div>
                    <p>By creating an account, you agree to our <a href="#">Terms & Privacy</a>.</p>
                    <button type="submit" onClick={onSubmit} className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <a href={"signin"}>Sign in</a>.</p>
                </div>
            </form>
        </>
    );
}

export default SignUp;