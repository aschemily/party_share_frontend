import React from 'react'
import Message from '../components/Message'
import uuid from 'uuid'
import MessageForm from '../components/MessageForm'

const ChatRoom = (props) => {

  // const findcid = props.messages.map(message =>{
  //   return message.cid
  // })
  //
  // 

      console.log('in ChatRoom props are',props)
    return(
        <div>
        <h1> In Chatroom </h1>
        {props.messages.map(message=>{
          return (
            <Message key={uuid()} message={message}/>
          )
        })}

         <MessageForm sendnewmessage={props.sendnewmessage}/>

        </div>

    )

}

export default ChatRoom
