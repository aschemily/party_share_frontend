import React, {Component} from 'react'
import { Icon, Button} from 'semantic-ui-react'

class MessageForm extends Component {

  state = {
    message:''
  }

  inputChange = (event) => {
    //const {message} = event.target
    //console.log('inputting change', event.target.value)
    this.setState({message: event.target.value})
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    this.props.sendnewmessage(this.state.message)
  }


  render(){
    console.log('in MessageForm props are',this.props)
    return(
      <div className='message-form'>
      <form className="ui reply form" onSubmit={this.handleSubmit}>
        <div className="field">
          <input placeholder="send message" onChange={this.inputChange} value={this.state.message}  name='message' type='text'/>
        </div>
       <Button primary position="right">
         Send <Icon name='paper plane icon' />
       </Button>
       </form>

      </div>
    )
  }

}

export default MessageForm
