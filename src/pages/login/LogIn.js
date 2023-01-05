import React from 'react';
import { Link } from 'react-router-dom';
import './LogIn.css';

function LogIn() {
    return (
        <>
            <form action="profile">
                <div className="container">
                    <h1>Log in</h1>
                    <p>Please fill in this form to Log In.</p>


                    <label htmlFor="username"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="username" id="username" required/>

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" id="psw" required/>


                    <p>By creating an account you agree to our <a href="src/pages/login/LogIn#">Terms & Privacy</a>.</p>
                    <button type="submit" className="registerbtn">Log In</button>
                </div>

                <div className="container signin">
                    <p>Dont have an account? <a href="/signup">Sign up</a>.</p>
                </div>
            </form>


        </>
    );
}

export default LogIn;