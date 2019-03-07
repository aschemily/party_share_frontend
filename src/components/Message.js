import React from 'react'
import { Icon, List} from 'semantic-ui-react'


const Message = props => {

   const favoriteTitle = props.message ? props.message.sentUserFave : null
  // const sentMessage = props.message.sent_message ? props.message.sent_message : null

  // const receivedMessage = props.message.sent_message ? props.message.sent_message : 'no received messages'
  const receivedMessage = props ? props.message.userSendingMsg : null
  // const sentMessages = props.message ? props.message.sentmessages : null
  // const sender = props.message ? props.message.senderusername : null

  const sentMessage = props ? props.message.userReceivingMsg : null

  const receivedUserFave = props.message ? props.message.receivedUserFave : null

  // const sentMessage = props ? props.message.

  console.log('in message component props are ', props.message)


    //  <span className="date">Time</span>
  return(
    <div>
      <List>
        {!sentMessage ?
        <List.Item>
          <div className="container">
             <Icon name='comment icon' />
              <List.Content>
                <List.Header as='a'>{props.message.senderusername}</List.Header>
                  <div className="metadata">
                  </div>
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
         </List.Item>
      : null }

         {receivedMessage ?
         <List.Item>
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
          </List.Item>
         : null  }

       </List>

     </div>

    )
}



export default Message
