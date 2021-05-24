import React, {useContext} from 'react';
import  {NavLink} from 'react-router-dom';
import {UserContext} from '../App';


const  Navbar = () => {
  const {state, dispatch} = useContext(UserContext);

  const RenderMenu = () =>
  {
    if(state)
    {
      return(
        <>
        <li className="nav-item">
        <NavLink className="nav-link" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/pages/About">About</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/pages/Contact">Contact</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/pages/Logout">Logout</NavLink>
      </li>
      </>

      )
    }
    else
    {
      return(
        <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pages/About">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pages/Contact">Contact</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pages/Login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/pages/Registration">Register</NavLink>
                </li>

        </>
      )

    }
  }
    return (
    
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light header">
  <NavLink className="navbar-brand" to="#">
    <span className="header-logo">WOLF</span>
  </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
     
      <RenderMenu />

    </ul>
  </div>
</nav>
    </> 
    )
}

export default Navbar
