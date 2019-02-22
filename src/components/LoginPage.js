import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class LoginPage extends Component {

  state = {
    username: '',
    email: '',
    password:'',
    submitted:false
  }

  inputChange = (event) =>{
  //  console.log('inputting change',event.target.name)
   //  console.log('inputting change',event.target.value)
  const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubmit = (event)=>{
    event.preventDefault()
    //this.setState({submitted: true})
    this.props.history.push('/userprofile')

  }

  render(){
    //console.log('in LoginPage props are',props)
    return(
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Log-in to your account
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input name="username" onChange={this.inputChange}fluid icon='user' iconPosition='left' placeholder='Username' />
              <Form.Input name="email"onChange={this.inputChange} fluid icon='user' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                onChange={this.inputChange}
                name="password"
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />

              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>

      </div>
    )
  }

}

// return {
//   loggedInUser: (state)=>{
//     dispatch(createAction(state.actionType))
//   }
// }


//{type:"LOG_IN_SUCCESS", payload: user}
// function mapDispatchToProps(dispatch, ownProps){
//   console.log('in mapDispatchToProps dispatch is',dispatch)
//
//   return {
//     login: (username, password) => {
//       dispatch({type: "LOGIN", payload: user})
//     }
//   }
// }

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
export default LoginPage 
