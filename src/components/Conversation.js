import React from 'react';
import { List, Card, Icon} from 'semantic-ui-react'


const Conversation = (props) =>{
  // console.log('conversation',props.conversation.cid)
   console.log('props in conversation', props)
   console.log('cid', props.conversation.cid)
   console.log('rid',props.conversation.rid)
   console.log('sid',props.conversation.sid)
  return (
    <Card color='green'>
      <Card.Content>
      <Icon id='topicicon' name='linechat' size='large'/>
      <Card.Header as='a' onClick={()=>props.clickConversation(props.conversation.cid, props.conversation.rid, props.conversation.sid)}>{props.conversation.conversation_name}</Card.Header>
      </Card.Content>
      </Card>

  )

}

export default Conversation
