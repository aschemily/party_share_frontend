import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

const NavBar = () =>{
  return (
    <div>

    <NavLink to="/"> LandingPage</NavLink>
    <NavLink to="/topics"> Topics</NavLink>


    </div>
  )

}

export default NavBar
