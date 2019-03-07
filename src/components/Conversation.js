import React from 'react';
import { List, Icon} from 'semantic-ui-react'


const Conversation = (props) =>{
  // console.log('conversation',props.conversation.cid)
   // console.log('props in conversation', props)
   // console.log('cid', props.conversation.cid)
   // console.log('rid',props.conversation.rid)
   // console.log('sid',props.conversation.sid)
  return (

      <List>
        <List.Item position="center">
          <Icon name='linechat'/>
          <List.Content>
            <List.Header as='a' onClick={()=>props.clickConversation(props.conversation.cid, props.conversation.rid, props.conversation.sid)}>{props.conversation.conversation_name}</List.Header>
        </List.Content>
        </List.Item>

      </List>




  )

}

export default Conversation
