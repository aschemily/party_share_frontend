import React, {Component}  from 'react'
import { Icon, Button, List} from 'semantic-ui-react'
import Message from '../components/Message'
import uuid from 'uuid'

class  ChatRoom extends Component {


  render(){
      console.log('in ChatRoom props are',this.props.messages)
    return(
        <div>
        <h1> In Chatroom </h1>
        {this.props.messages.map(message=>{
          return <Message key={uuid()} message={message}/>
        })}
        </div>

    )
  }
}

export default ChatRoom
