import React, {Component} from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

class SignUp extends Component {

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
    //
    fetch("http://localhost:3000/api/v1/users",{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password:this.state.password
      })
    })
    .then(r => r.json())
    .then(data => console.log('new data',data))
    this.props.history.push('/userprofile')

  }

  render(){
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

export default SignUp
