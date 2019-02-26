import React, {Component} from 'react'
import Topic from '../components/Topic'
import uuid from 'uuid'

class TopicContainer extends Component {

  render(){
    //console.log('in TopicContainer props are',this.props)
    return(
      <div>
      <h1> "In Topic Container" </h1>
      {this.props.topics.map(topic=>{
        return <Topic key={uuid()} topic={topic} handleClick={this.props.handleClick}/>
      })}
      </div>
    )
  }



}

export default TopicContainer
