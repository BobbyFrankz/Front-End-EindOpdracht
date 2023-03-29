import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import '../uploadGood.css';
import vocaly from '../../assets/vocaly.PNG'
import './Home.css';
import {AuthContext} from "../../context/AuthContext";


function Home() {
    const {isAuth} = useContext(AuthContext)

    return (
        <>
            <main>
                <header>
                    <img
                        className={"vocaly-image"}
                        src={vocaly}
                        alt="Photo with microphone"/>
                </header>
                <section
                    className={"outer-container"}>
                    <div
                        className={"inner-container-home"}>


                        <div
                            className={"inner-text-home"}>
                            <h1>Welcome!</h1>
                            <article>
                                <p> Many<strong> artists</strong>, <strong>producers</strong> and <strong>DJs</strong> are
                                    often looking for <strong>vocals</strong> (a cappella recordings) but
                                    have no idea where to find them.
                                    A producer can have the coolest beat,
                                    but then he finds out that the beat still sounds very empty and he would like an
                                    artists voice over
                                    his <strong>instrumentals</strong>.
                                </p>
                            </article>


                            <article>
                                <p>
                                    <strong>Artists</strong> sometimes have a hard time. They can write the best lyrics
                                    but have no producer
                                    skills and thus never achieve a <strong>HIT.</strong>
                                    That's why they can put their vocals online on this website and then they might
                                    become
                                    picked up by good producers or other artists to maybe finally hit the charts
                                    and go beyond <strong>dreams.</strong>
                                </p>
                            </article>
                            <article>
                                <p>If you`re logged in, Check your <Link to="/profile">Profile Page</Link></p>
                                {!isAuth &&
                                    <p>You can <Link to="/signin">Log In</Link>, Or <Link to="/signup">Sign Up</Link> if
                                        you dont have an account.</p>}
                            </article>
                            <br/> <br/>

                        </div>
                    </div>
                </section>
                <section>
                    <h1>Lets make music!</h1>
                </section>

            </main>
        </>

    );
}

export default Home;
