import React from 'react'
import Message from '../components/Message'
import uuid from 'uuid'
import MessageForm from '../components/MessageForm'

const ChatRoom = (props) => {

      //console.log('in ChatRoom props are',props)
    return(
        <div>
        <h1> In Chatroom </h1>
        {props.messages.map(message=>{
        //  console.log('in props.message message is',message)
          return (
            <Message key={uuid()} message={message}/>
          )
        })}

         <MessageForm sendnewmessage={props.sendnewmessage}/>

        </div>

    )

}

export default ChatRoom
