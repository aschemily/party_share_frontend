import React, {Component} from 'react'
import LoginPage from '../components/LoginPage'
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import { BrowserRouter as Router, Route, NavLink,Switch } from 'react-router-dom';
import TopicContainer from './TopicContainer'
import Favorites from './Favorites'
import LandingPage from './LandingPage'
import { connect } from 'react-redux'


class UserProfile extends Component {
  state = {
    topics: [],
    topicClicked: false,
    displayOne: '',
    favorites:[],
    favoriteIndex: 0,
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/topics")
    .then(r => r.json())
    .then(data => this.setState({topics: data}))
  }

  clickTopic = (topicName) =>{
    //console.log('in clickTopic event',topicName)
   return this.state.topics.map(topic =>{
     //console.log(topicFavorites)
      //console.log('in clickTopic topic is',topic.favorites)
      if (topicName === topic.topic_name){
        this.setState({favorites: topic.favorites, topicClicked:true})
      } else {
        return topicName
      }
      //console.log('topicFavorites', topicFavorites)
    })
  }

  handleNextFavorite = ()=>{
    this.setState({favoriteIndex: this.state.favoriteIndex + 1})
  }

  favoriteToDisplay = () =>{
    return this.state.favorites.slice(
      this.state.favoriteIndex, this.state.favoriteIndex + 1
    )
  }

  render(){
    console.log('do i have props',this.props)
    return(
      <div>
      <h1> coming from user profile </h1>
      <Router>
      <React.Fragment>
      <NavBar/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/login" component={LoginPage}/>

      <Route exact path="/topics" component={()=>this.state.topicClicked ? <Favorites favorites={this.favoriteToDisplay()} handleNextFavorite={this.handleNextFavorite} onSwipe={this.onSwipeMove}/> : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>}/>

       </React.Fragment>
       </Router>


      </div>
    )
  }
}

// function mapStateToProps(state){
//   console.log('in userprofile mapStateToProps state',state)
//
// }

//export default connect(mapStateToProps)(UserProfile)
export default UserProfile
