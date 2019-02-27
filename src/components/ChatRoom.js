import React, {Component}  from 'react'
import { Icon, Button, List} from 'semantic-ui-react'

class  ChatRoom extends Component {

  //console.log('in ChatRoom props are',props)
  render(){
    return(
      <List>
        <List.Item>
        <div className="container">
          <Icon name='comment icon' />

          <List.Content>
            <List.Header as='a'>User Name</List.Header>
            <div className="metadata">
              <span className="date">Today at 5:42PM</span>
            </div>
          </List.Content>

          <List.Description>
          <div className="text">
            Message
          </div>
          </List.Description>
         </div>
        </List.Item>

        <form className="ui reply form">
          <div className="field">
            <input placeholder="send message"/>
          </div>
         <Button primary position="right">
           Send <Icon name='paper plane icon' />
         </Button>
         </form>
        </List>
    )
  }
}

export default ChatRoom
