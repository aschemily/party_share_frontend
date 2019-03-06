import React from 'react'
import { Icon, List} from 'semantic-ui-react'


const Message = props => {

  const favoriteTitle = props.message.favorite ? props.message.favorite.title : null
  const sentMessage = props.message.sent_message ? props.message.sent_message : null

  const receivedMessage = props.message.sent_message ? props.message.sent_message : 'no received messages'

  console.log('in message', props)
      //console.log('in Message props are',props.message.favorite.title)
  return(
    <div>
      <List>
        <List.Item>
          <div className="container">
             <Icon name='comment icon' />
              <List.Content>
                <List.Header as='a'>{props.message.senderusername}</List.Header>
                  <div className="metadata">
                    <span className="date">Time</span>
                  </div>
              </List.Content>

              <List.Description>
                <div className="text">
                  {sentMessage}
                </div>
              </List.Description>

              <List.Description>
                <div className="text">
                  {props.message.favoritetitle}
                </div>
              </List.Description>
           </div>
         </List.Item>

         <List.Item>
           <div className="container darker">
              <Icon name='comment icon' />
               <List.Content>
                 <List.Header as='a'>{props.message.receiverusername}</List.Header>
                   <div className="metadata">
                     <span className="date">Time</span>
                   </div>
               </List.Content>

               <List.Description>
                 <div className="text">
                 {receivedMessage}
                 </div>
               </List.Description>

               <List.Description>
                 <div className="text">
                   {favoriteTitle}
                 </div>
               </List.Description>
            </div>
          </List.Item>
       </List>

     </div>

    )
}

export default Message
