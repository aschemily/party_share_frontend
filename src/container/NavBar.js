import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom';

const NavBar = (props) =>{
  return (
    <div>

    <NavLink to="/"> Home</NavLink>
    <NavLink to="/topics"> Topics</NavLink>
    <Link to="/" onClick={()=>props.logOut()}>Logout</Link>


    </div>
  )

}

export default NavBar
