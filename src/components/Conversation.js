import React from 'react';
import { List, Icon} from 'semantic-ui-react'


const Conversation = (props) =>{
  //console.log('conversation',props)
  return (

      <List>
        <List.Item position="center">
          <Icon name='linechat'/>
          <List.Content>
            <List.Header as='a' onClick={()=>props.clickConversation(props.conversation.id)}>{props.conversation.conversation_name}</List.Header>
        </List.Content>
        </List.Item>

      </List>




  )

}

export default Conversation
