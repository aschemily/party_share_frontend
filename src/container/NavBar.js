import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from "semantic-ui-react"
import { BrowserRouter as Router, Route, NavLink, Link, withRouter } from 'react-router-dom';

const NavBar = (props) =>{
  console.log('navbar props',props)
  return (

  <Menu>

      {!props.currentuser ?
        <Menu.Menu position="right">
        <Link className="item" to="/login"> Log In </Link>
        <Link className="item" to="/signup"> Sign Up</Link>
        </Menu.Menu>
    :
      <Menu.Menu>
      <Link className="item" to="/"> Home</Link>
      <Link className="item" to="/topics"> Topics</Link>

      <Link className="item" to="/profile">Profile</Link>
      <Link className="item" to="/myfavorites" onClick={()=>props.fetchUserFaves()}> My Favorites </Link>
      <Link className="item" to="/" onClick={props.logout}>Logout</Link>
      </Menu.Menu>
    }
  </Menu>


  )

}

export default withRouter(NavBar)
