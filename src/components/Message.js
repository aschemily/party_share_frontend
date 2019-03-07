import React from 'react'
import { Icon, List} from 'semantic-ui-react'


const Message = props => {

   const favoriteTitle = props.message ? props.message.sentUserFave : null
  // const sentMessage = props.message.sent_message ? props.message.sent_message : null

  // const receivedMessage = props.message.sent_message ? props.message.sent_message : 'no received messages'
  const receivedMessage = props.message.receivedmessages ? props.message.userSendingMsg : null
  // const sentMessages = props.message ? props.message.sentmessages : null
  // const sender = props.message ? props.message.senderusername : null
  console.log('receivedMessage', receivedMessage)
  const sentMessage = props.message.sentmessages ? props.message.senderusername : null
  console.log('sentMessage', sentMessage)
  console.log('props.message.sentmessages ', props.message.sentmessages )


  const receivedUserFave = props.message ? props.message.receivedUserFave : null

  // const sentMessage = props ? props.message.
  const allMessages = (sentMessage && receivedMessage) ? console.log('works') : null

   console.log(props.message.sent)
   console.log(props.message.received )

  return(
    <div>
      {props.message.sent ?
          <div className="container">
             <Icon name='comment icon' />
              <List.Content>
                <List.Header as='a'>{props.message.senderusername}</List.Header>
              </List.Content>

              <List.Description>
                <div className="text">
                  {props.message.sentmessages}
                </div>
              </List.Description>

              <List.Description>
                <div className="text">
                  {favoriteTitle}
                </div>
              </List.Description>
           </div>
           : null }

           {props.message.received ?
           <div className="container darker">
              <Icon name='comment icon' />
               <List.Content>
                 <List.Header as='a'>{props.message.userSendingMsg}</List.Header>
                   <div className="metadata">
                   </div>
               </List.Content>

               <List.Description>
                 <div className="text">
                 {props.message.receivedmessages}
                 </div>
               </List.Description>

               <List.Description>
                 <div className="text">
                   {receivedUserFave}
                 </div>
               </List.Description>
            </div>
            : null }



     </div>

    )
}



export default Message
