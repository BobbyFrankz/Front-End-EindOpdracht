import React, {useContext, useState} from 'react';
import './NavBar.css'
import {Link, NavLink} from "react-router-dom";
import AuthContextProvider, {AuthContext} from "../context/AuthContext";
import Search from "./Search";




function NavBar() {

    const [mobileMenu, toggleMobileMenu] = useState(true)
    const {isAuth, logout} = useContext(AuthContext)


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
                            {isAuth && <NavLink className={({isActive}) => isActive ? "link--active" : "link--default"}
                                     to="/contact">Contact</NavLink>}
                        </li>
                        <li>
                            {isAuth && <NavLink className={({isActive}) => isActive ? "link--active" : "link--default"}
                                     to="/vocals">Vocals</NavLink>}
                        </li>
                        <li>
                            {isAuth && <NavLink className={({isActive}) => isActive ? "link--active" : "link--default"}
                                     to="/profile">Profile</NavLink>}
                        </li>
                        <li className={"upload-text"}>
                            {isAuth && <NavLink className={({isActive}) => isActive ? "link--active" : "link--default"}
                                                to="/upload">Upload</NavLink>}
                        </li>


                        {isAuth && <Search>

                        </Search> }


                    </ul>
                    <ul>
                        {!isAuth && <Link  className="logbutton" to="signin">Log in </Link>}
                        {isAuth && <button className="logbutton" type="button" onClick={logout}>Log out</button>}
                        <Link className="mobile-login" to="signin"><span className="material-symbols-outlined">person</span></Link>
                     </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;