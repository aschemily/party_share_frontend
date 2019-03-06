import React, {Component} from 'react'
import Conversation from '../components/Conversation'
import uuid from 'uuid'

class UserConversationsContainer extends Component {

  render(){
  // console.log('in UserConversationsContainer props are',this.props)
    return(
      <div>
      <h1> User Conversations </h1>
      {this.props.conversations.map(conversation=>{
        return <Conversation key={uuid()} conversation={conversation} clickConversation={this.props.clickConversation}/>
      })}

      </div>
    )
  }

}

export default UserConversationsContainer
