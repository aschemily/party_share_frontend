import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {signUp} from '../helpers/actions'

class SignUp extends Component {

  state = {
    username: '',
    email: '',
    password:'',
    confirmation:'',
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
    //
    if (this.state.password === this.state.confirmation){
      this.props.signUp(this.state.username, this.state.email, this.state.password, this.props.history)
    } else{
      alert("Passwords do not match!")
    }
  }

  render(){
    console.log('sign up props',this.props)
    //console.log('in SignUp props are',props)
    return(
      <div className='login-form'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/logo.png' /> Sign Up
          </Header>
          <Form size='large' onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input name="username" value={this.state.username} onChange={this.inputChange}fluid icon='user' iconPosition='left' placeholder='Username' />
              <Form.Input name="email" value={this.state.email} onChange={this.inputChange} fluid icon='user' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                onChange={this.inputChange}
                value={this.state.password}
                name="password"
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              <Form.Input
                onChange={this.inputChange}
                value={this.state.confirmation}
                name="password"
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password Confirmation'
                type='password'
              />

              <Button color='teal' fluid size='large'>
                Sign Up
              </Button>
            </Segment>
          </Form>

        </Grid.Column>
      </Grid>

      </div>
    )
  }



}

export default connect(null, )(SignUp)
