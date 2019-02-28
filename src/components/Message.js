import React from 'react'
import { Icon, Button, List} from 'semantic-ui-react'

const Message = props => {

  const favoriteTitle = props.message.favorite ? props.message.favorite.title : null

      //console.log('in Message props are',props.message.favorite.title)
    return(
      <List>
        <List.Item>
        <div className="container">
          <Icon name='comment icon' />

          <List.Content>
            <List.Header as='a'>{props.message.username}</List.Header>
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

export default Message
