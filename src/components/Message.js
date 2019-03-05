import React from 'react'
import { Icon, Button, List} from 'semantic-ui-react'
import MessageForm from './MessageForm'

const Message = props => {

  const favoriteTitle = props.message.favorite ? props.message.favorite.title : null

  console.log('in message', props)
      //console.log('in Message props are',props.message.favorite.title)
  return(
    <div>
      <List>
        <List.Item>
          <div className="container">
             <Icon name='comment icon' />
              <List.Content>
                <List.Header as='a'>{props.message.sender.username}</List.Header>
                  <div className="metadata">
                    <span className="date">Time</span>
                  </div>
              </List.Content>

              <List.Description>
                <div className="text">
                  {props.message.messages}
                </div>
              </List.Description>

              <List.Description>
                <div className="text">
                  {favoriteTitle}
                </div>
              </List.Description>
           </div>
         </List.Item>

         <List.Item>
           <div className="container darker">
              <Icon name='comment icon' />
               <List.Content>
                 <List.Header as='a'>{props.message.receiver.username}</List.Header>
                   <div className="metadata">
                     <span className="date">Time</span>
                   </div>
               </List.Content>

               <List.Description>
                 <div className="text">
                   {props.message.messages}
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
