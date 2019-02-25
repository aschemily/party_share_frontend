import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopicContainer from './container/TopicContainer'
import Favorites from './container/Favorites'
import LandingPage from './container/LandingPage'
import NavBar from './container/NavBar'
import UserProfile from './container/UserProfile'
import LoginPage from './components/LoginPage'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Route, NavLink,Switch, withRouter, Redirect } from 'react-router-dom';


class App extends Component {
  state = {
    currentUser: null,
  }

  componentDidMount(){
    let token = localStorage.getItem("token")

    if (token){
      fetch(`http://localhost:3000/api/v1/current_user`,{
        headers:{
          "Authorization": token
        }
      })
      .then(r => r.json())
      .then((response)=>{
        this.setState({
          currentUser: response
        })
      })
    }
  }

  signup = (username, email, password, confirmation)=>{

    if (password === confirmation){
      //console.log('hitting')
      fetch("http://localhost:3000/api/v1/users",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      })
      .then(r => r.json())
      .then((response)=>{
        if (response.errors){
          alert(response.errors)
        } else{
          localStorage.setItem("token", response.token)
          this.setState({
            currentUser: response.user
          })
          this.props.history.push(`/users/${response.user.id}`)
        }
      })
    } else{
      alert("Passwords do not match!")
    }
  }

  login = (username, email, password)=>{
      fetch("http://localhost:3000/api/v1/login",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      })
      .then(r => r.json())
      .then((response)=>{
        //console.log('in login fetch resposne',response)
        if (response.errors){
          alert(response.errors)
        } else{
          localStorage.setItem("token", response.token)
          this.setState({
            currentUser: response.user
          })
          this.props.history.push(`/users/${response.user.id}`)
        }
      })
     }


  logOut = ()=>{
    //console.log("log out")
    this.setState({
      currentUser: null
    })
    localStorage.removeItem("user_id")
    this.props.history.push("/")
  }

  render() {
    console.log('current user', this.state.currentUser)
    console.log('app props', this.props)
    // console.log('in state topics',this.state.topics)
    // console.log('in state favorites',this.state.favorites)
   //<Route exact path="/topics" component={()=>this.state.topicClicked ? <Favorites favorites={this.favoriteToDisplay()} handleNextFavorite={this.handleNextFavorite} onSwipe={this.onSwipeMove}/> : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>}/>
    return (
      <div>
      <h1>In APP</h1>
      <Router>
      <React.Fragment>
      <Route exact path="/" component={LandingPage}/>
      <Switch>
      <Route exact path="/login" render={()=><LoginPage login={this.login}/>}/>
      <Route exact path="/signup" render={()=><SignUp signup={this.signup}/>}/>
      <Route exact path="/users/:id" render={(routerProps)=><UserProfile currentUser={this.state.currentUser} logOut={this.logOut} {...routerProps}/>}/>
      <Redirect from="/login" to="/users/:id"/>
      </Switch>
       </React.Fragment>
       </Router>
      </div>
    );
  }
}

export default withRouter(App);
