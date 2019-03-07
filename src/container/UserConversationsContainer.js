import React, {Component} from 'react'
import Conversation from '../components/Conversation'
import uuid from 'uuid'

class UserConversationsContainer extends Component {

  render(){
   //console.log('in UserConversationsContainer props are',this.props)
   // const uniqueConversations = this.props.conversations.reduce((accumulator, convo) => {
   //   if (!accumulator[JSON.stringify(convo)]) {
   //     accumulator[JSON.stringify(convo)] = convo;
   //     console.log('%c sad sad hack', 'color: blue', accumulator[JSON.stringify(convo)]);
   //   }
   // }, {})
   // console.log('%c uniqueConversations', 'color: magenta', uniqueConversations);
   // const convoArray = Object.keys(uniqueConversations).map(key => JSON.parse(key));
   // console.log('%c convoArray', 'color: orange', convoArray);

   //console.log('%c sad sad hack', 'color: blue', this.props.conversations);
   const uniqueConversations = [...new Set(this.props.conversations.map(convo => JSON.stringify(convo)))].map(convo => JSON.parse(convo));
   //const uniqueConversations = (this.props.conversations) =>[...new Set(this.props.conversations)]
   //const uniqueConversations = [...new Set(this.props.conversations.map(convo => convo.cid))]
   //document.write(JSON.stringify(uniqueConversations))

   console.log('conversation props', this.props.conversations)
    console.log('uniqueConversations', uniqueConversations);

   // let uniqIds = {}, source = this.props.conversations
   //  let filtered = source.filter(obj => !uniqIds[obj.id] && (uniqIds[obj.id] = true));
   //
   //  console.log('please work filtered', filtered)
    return(
      <div>
      <h1> User Conversations </h1>
        {uniqueConversations.map(conversation=>{
          return <Conversation key={uuid()} conversation={conversation} clickConversation={this.props.clickConversation}/>
        })}

      </div>
    )
  }

}

export default UserConversationsContainer
