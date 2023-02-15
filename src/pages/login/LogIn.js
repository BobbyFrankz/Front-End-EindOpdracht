import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './LogIn.css';
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";


function LogIn() {
    const navigate = useNavigate();
    const url = "http://localhost:8080"
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const {isAuth} = useContext(AuthContext)

    const signIn = async  (e) => {
        e.preventDefault();

        try {
            const  response  = await axios.post(`${url}/authenticate`,{
                username: username,
                password: password
        });
        if (response.status === 200){
            console.log(response)
            login(response.data.jwt);

        }

    } catch(e) {
        console.error(e);
        setError(true);
    }


}

    return (
        <>
            <form >
                <div className="form-container">
                    <h1>Log in</h1>
                    <p>Please fill in this form to Log In.</p>


                    <label htmlFor="username"><b>Username</b></label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                        required/>

                    <label htmlFor="psw"><b>Password</b></label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="psw"
                        id="psw"
                        onChange={(e) => setPassword(e.target.value)}
                        required/>



                    <p>By creating an account you agree to our <a href="src/pages/login/LogIn#">Terms & Privacy</a>.</p>
                    <button type="submit" onClick={signIn} className="registerbtn">Log In</button>
                </div>

                <div className="container signin">
                    <p>Dont have an account? <a href="/signup">Sign up</a>.</p>
                </div>
            </form>


        </>
    );
}

export default LogIn;