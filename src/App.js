import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopicContainer from './container/TopicContainer'
import Favorites from './container/Favorites'


class App extends Component {
  state = {
    topics: [],
    topicClicked: false,
    favorites:[],
  }

  componentDidMount(){
    fetch("http://localhost:3000/api/v1/topics")
    .then(r => r.json())
    .then(data => this.setState({topics: data}))
  }

  clickTopic = (topicName)=>{
    //console.log('in clickTopic event',topicName)
    return this.state.topics.map(topic =>{
      console.log('in clickTopic topic is',topic)
      if (topicName === topic.topic_name){
        fetch("http://localhost:3000/api/v1/favorites")
        .then(r => r.json())
        .then(data => this.setState(
          {favorites: data,
          topicClicked:true}))
      } else {
        return topicName
      }
    })
  }


  render() {

    return (
      <div>
      <h1>In APP</h1>
      {this.state.topicClicked ?
        <Favorites favorites={this.state.favorites}/>
      : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>
        }
      </div>
    );
  }
}

export default App;
