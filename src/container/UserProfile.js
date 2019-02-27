import React, {Component} from 'react'
import LoginPage from '../components/LoginPage'
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
import { BrowserRouter as Router, Route, NavLink,Switch } from 'react-router-dom';
import TopicContainer from './TopicContainer'
import Favorites from './Favorites'
import LandingPage from './LandingPage'
import MyFavoritesContainer from './MyFavoritesContainer'
import { connect } from 'react-redux'



class UserProfile extends Component {
  state = {
    topics: [],
    topicClicked: false,
    displayOne: '',
    favorites:[],
    favoriteIndex: 0,
    user: null,
    myFavorites:[],
  }

  componentDidMount(){
    //console.log('mount in userprofile')

    fetch("http://localhost:3000/api/v1/topics")
    .then(r => r.json())
    .then(data => this.setState({topics: data},()=>console.log('topics state',this.state)))

    fetch(`http://localhost:3000/api/v1/users/${localStorage.getItem("user_id")}`,{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })
    .then(r => r.json())
    .then(data =>{
      //console.log('user', data)
      if (data.errors){
        alert(data.errors)
      } else {
        this.setState({
          user: data
        })
      }
    })
    // fetch(`http://localhost:3000/api/v1/render_favorites/${localStorage.getItem("user_id")}`,{
    //       headers:{
    //         "Authorization":localStorage.getItem("token")
    //       }
    //     })
    //     .then(r => r.json())
    //     .then(data => this.setState({myFavorites: data},()=>console.log('my favorites state',this.state.myFavorites)))

  }

  //
  // componentDidMount(){
  //
  // }

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

  handleNextFavorite = (favoriteId) =>{
    //console.log('in handleNextFavorite id',favoriteId)
    //let userId = this.state.user
    this.setState({favoriteIndex: this.state.favoriteIndex + 1})
    return this.state.favorites.map(favorite=>{

        if (favorite.id === favoriteId){
          fetch("http://localhost:3000/api/v1/user_favorites",{
              method:"POST",
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                user_id: this.state.user.id,
                favorite_id: favoriteId
              })
            })
          .then(r => r.json())
          .then(data => this.setState(prevState=>({
            myFavorites:[...prevState.myFavorites, data]
         })))
      }
    })
  }

  favoriteToDisplay = () =>{
    return this.state.favorites.slice(
      this.state.favoriteIndex, this.state.favoriteIndex + 1
    )
  }

  // fetchUserFaves = () =>{
  //   fetch(`http://localhost:3000/api/v1/render_favorites/${localStorage.getItem("user_id")}`,{
  //       headers:{
  //         "Authorization":localStorage.getItem("token")
  //       }
  //     })
  //     .then(r => r.json())
  //     .then(data => this.setState({myFavorites: data},()=>console.log('my favorites state',this.state.myFavorites)))
  //  }


  render(){
    // console.log('user profile favorites array',this.state.favorites)
    console.log('user profile my favorites',this.state.myFavorites)
    // console.log('user profile props',this.props)
    // console.log('user profile state',this.state.user)
  //  <Route exact path="/topics" component={()=>this.state.topicClicked ? <Favorites favorites={this.favoriteToDisplay()} handleNextFavorite={this.handleNextFavorite} onSwipe={this.onSwipeMove}/> : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>}/>
//  <Route exact path ="/myfavorites" render={()=><MyFavoritesContainer/>}/>
//  <Route exact path="/topics" render={()=><TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>}/>

    return(
      <div>
        {this.state.user ?
          <h1> Welcome {this.state.user.username} </h1>
        : null }

      {this.state.topicClicked ? <Favorites favorites={this.favoriteToDisplay()} handleNextFavorite={this.handleNextFavorite} onSwipe={this.onSwipeMove}/>
       : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>
      }

       <MyFavoritesContainer/>

      </div>
    )
  }
}




export default UserProfile
