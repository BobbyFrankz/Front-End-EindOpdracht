import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import axios from "axios";





function SignUp() {
    const [accountData, setAccountData] = useState([]);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [enabled] = useState(true);
    const [apikey] = useState("");
    const [email, setEmail] = useState("");
    const url = "http://localhost:8080"


    async function fetchData() {

        try {
            const { data } = await axios.post(`${url}/users`, {
                username: username,
                password: password,
                enabled: enabled,
                apikey: apikey,
                email: email
            });
            setAccountData(data);
            console.log(data)
        } catch(e) {
            console.error(e);
            setError(true);
        }

    }

    return (
        <>
            <form action="signin">
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>

                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" id="username" value={username} onChange={ (e) => setUsername (e.target.value) } required/>
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Email" name="email" id="email" value={email} onChange={ (e) => setEmail (e.target.value) } required/>

                            <label htmlFor="psw"><b>Password</b></label>
                            <input type="password" placeholder="Enter Password" name="psw" id="psw" value={password} onChange={ (e) => setPassword (e.target.value) } required/>

                                <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                                <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat"
                                       required/>

                    {/*<p>Select if you are an Artist or a producer</p>*/}
                    {/*<div className="wrapper">*/}

                    {/*        <input type="radio" name="select" id="option-1" checked/>*/}
                    {/*            <label htmlFor="option-1" className="option option-1"/>*/}
                    {/*                <div className="dot"></div>*/}
                    {/*                <span>Artist</span>*/}

                    {/*    <input type="radio" name="select" id="option-2"/>*/}
                    {/*            <label htmlFor="option-2" className="option option-2"/>*/}
                    {/*                <div className="dot"></div>*/}
                    {/*                <span>Producer/DJ</span>*/}

                    {/*</div>*/}


                                        <p>By creating an account you agree to our <a href="src/pages/signup/SignUp#">Terms & Privacy</a>.</p>
                                        <button type="submit" className="registerbtn" onClick={fetchData}>Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <a href="SignIn">Log in</a>.</p>
                </div>
            </form>


        </>
    );
}

export default SignUp;