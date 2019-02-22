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
import { BrowserRouter as Router, Route, NavLink,Switch, withRouter } from 'react-router-dom';


class App extends Component {


  render() {
    // console.log('in state topics',this.state.topics)
    // console.log('in state favorites',this.state.favorites)
    return (
      <div>
      <h1>In APP</h1>
      <Router>
      <React.Fragment>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/login" component={LoginPage}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/userprofile" component={UserProfile}/>
      <Route exact path="/topics" component={()=>this.state.topicClicked ? <Favorites favorites={this.favoriteToDisplay()} handleNextFavorite={this.handleNextFavorite} onSwipe={this.onSwipeMove}/> : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>}/>

       </React.Fragment>
       </Router>
      </div>
    );
  }
}

export default withRouter(App);
