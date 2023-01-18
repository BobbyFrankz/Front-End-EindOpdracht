import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../GlobalCss.css';
import vocaly from '../../assets/vocaly.PNG'
import './Home.css';
import {AuthContext} from "../../context/AuthContext";
import VocalComponent from "../../components/VocalComponent";


function Home() {
    const {isAuth} = useContext(AuthContext)

    return (
        <>
            <img className={"vocaly-image"} src={vocaly} alt="vocaly.PNG"/>
            <section className={"outer-container"}>
            <div className={"inner-container"}>


            <h1>Welcome!</h1>
                <p>Many artists, producers and DJs are often looking for vocals (a cappella recordings) but
                    have no idea where to find them.
                    A producer can have the coolest beat,
                    but then he finds out that the beat still sounds very empty and he would like an artists voice over
                     his instrumentals.
                  </p>



                <p>
                    Artists sometimes have a hard time. They can write the best lyrics but have no producer
                    skills and thus never achieve a HIT.
                    That's why they can put their vocals online on this website and then they might become
                    picked up by good producers or other artists to maybe finally hit the charts
                    and go beyond dreams.

                </p>

                <p>If you`re logged in, Check your <Link to="/profile">Profile Page</Link></p>
                {!isAuth && <p>You can  <Link to="/signin">Log In</Link>, Or <Link to="/signup">Sign Up</Link> if you dont have an account.</p>}
<br/> <br/>
            <h1>Lets make music!</h1>
            </div>
            </section>
        </>
    );
}

export default Home;
