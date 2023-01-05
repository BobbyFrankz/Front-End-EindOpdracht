
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import LogIn from "./pages/login/LogIn";
import SignUp from "./pages/signup/SignUp";
import NavBar from "./components/NavBar";
import {useContext} from "react";
import {AuthContext} from "./context/AuthContext";
import Contact from "./pages/Contact/Contact";
import About from "./pages/about/About";

function App() {
    const {isAuth} = useContext(AuthContext)

  return (
      <>
        <NavBar />
        <div className="content">
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/profile" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
              <Route  path="/signin" element={<LogIn/>}/>
              <Route  path="/signup" element={<SignUp/>}/>
              <Route  path="/contact" element={<Contact/>}/>

          </Routes>
        </div>
          <footer>
              <p className={"footer-text"}>Vocaly</p>
          </footer>
      </>
  );
}

export default App;
