import React, {Component} from 'react'
import LoginPage from '../components/LoginPage'
import { Link } from 'react-router-dom';



class LandingPage extends Component {

  render(){

    return(
      <div>
      <h1> coming from LandingPage </h1>
      <Link to="/login" className="btn btn-link"> Log In </Link>
      <Link to="/signup" className="btn btn-link"> Sign Up </Link>

      </div>
    )
  }



}

export default LandingPage
