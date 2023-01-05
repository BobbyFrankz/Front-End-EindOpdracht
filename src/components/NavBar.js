import React, {useState} from 'react';
import './NavBar.css'
import {Link, NavLink} from "react-router-dom";



function NavBar() {

    const [mobileMenu, toggleMobileMenu] = useState(true)

    function showMobileMenu() {
        toggleMobileMenu(prev => !prev)
    }

    return (
        <header>
            <div className="outer-container navbar">
                <nav className="inner-container">
                    <button className="toggle-menu" type="button" onClick={showMobileMenu}>
                        {
                            mobileMenu
                                ? <span className="material-symbols-outlined">menu</span>

                                : <span className="material-symbols-outlined">close</span>
                        }

                    </button>

                    <ul className={mobileMenu ? "menu" : "mobile-menu"}>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "link--active" : "link--default"}
                                     to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "link--active" : "link--default"}
                                     to="/about">About</NavLink>
                        </li>
                        <li>
                            <NavLink className={({isActive}) => isActive ? "link--active" : "link--default"}
                                     to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <ul>
                        <Link  className="login" to="signin">Login</Link>
                        <Link className="mobile-login" to="signin">
                            <span className="material-symbols-outlined">person</span>
                        </Link>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;