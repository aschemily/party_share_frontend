import React, {Component} from 'react'
import Topic from '../components/Topic'
import Swipe from 'react-easy-swipe';
import { Button, Popup, Header, Grid, Dropdown } from 'semantic-ui-react'
import uuid from 'uuid'

class Favorites extends Component {
    //<Dropdown placeholder='SEND TO' fluid multiple search selection options={this.props.favorites}/>

  render(){
    // console.log('favorite state',this.state)
   console.log('in Favorites props are',this.props)
    return(

      <div>
      <h1>In Favorites</h1>
      {this.props.favorites.map(favorite=>{
        return <h1 key={uuid()}> {favorite.title}</h1>
      })}

      <button onClick={()=>this.props.handleNextFavorite()}>Dislike </button>
      <button onClick={()=>this.props.handleNextFavorite()}>like </button>

      <Popup trigger={<Button>Send To</Button>} flowing hoverable>
      <Grid centered divided columns={3}>

      <Grid.Column textAlign='center'>
      <Header as='h4'>User 1</Header>
      <Button> Send </Button>
      </Grid.Column>

      <Grid.Column textAlign='center'>
      <Header as='h4'>Group 1</Header>
      <Button> Send </Button>
      </Grid.Column>

      <Grid.Column textAlign='center'>
      <Header as='h4'>User 2</Header>
      <Button> Send </Button>
      </Grid.Column>

      <Grid.Column textAlign='center'>
      <Header as='h4'>Group 2</Header>
      <Button> Send </Button>
      </Grid.Column>

      </Grid>
      </Popup>
      </div>

    )
  }



}

export default Favorites
