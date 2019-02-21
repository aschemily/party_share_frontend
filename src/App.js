import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopicContainer from './container/TopicContainer'
import Favorites from './container/Favorites'


class App extends Component {
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

  onSwipeMove = (position, event)=>{
    console.log('position', position.x, 'event', event)
    console.log('position', position.y, 'event', event)
  }




  render() {
    console.log('in state topics',this.state.topics)
    console.log('in state favorites',this.state.favorites)
    return (
      <div>
      <h1>In APP</h1>
      {this.state.topicClicked ?
       <Favorites favorites={this.favoriteToDisplay()} handleNextFavorite={this.handleNextFavorite} onSwipe={this.onSwipeMove}/>
      : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>

        }
      </div>
    );
  }
}

export default App;
