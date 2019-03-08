import React, { Component } from 'react';
import { Menu } from "semantic-ui-react"
import { Link } from 'react-router-dom';

class NavBar extends Component {
  // const username = this.props.currentuser.map(user =>{
  //   console.log('user', user)
  // })

  render(){
    //console.log('in nav bar current user', this.props.currentuser)


    return (

    <Menu>
      <Menu.Menu position="left">
        WeShare
      </Menu.Menu>
        {!this.props.currentuser ?
          <Menu.Menu position="right">
            <Link className="item" to="/login"> Log In </Link>
            <Link className="item" to="/signup"> Sign Up</Link>
          </Menu.Menu>
      :
        <Menu.Menu>
          <Link className="item" to="/"> Home</Link>
          <Link className="item" to="/topics" onClick={this.props.fetchTopics}> Topics</Link>
          <Link className="item" to="/favorites" onClick={this.props.fetchUserFaves}> My Favorites </Link>
          <Link className="item" to="/conversations" onClick={this.props.fetchUserConversations}> My Conversations </Link>
          <Link className="item" to="/" onClick={this.props.logout}>Logout</Link>
        </Menu.Menu>
      }
    </Menu>

    )
  }
}

export default NavBar
