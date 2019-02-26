import React, {Component} from 'react'
import Topic from '../components/Topic'
import { Button, Popup, Header, Grid, Dropdown, Card } from 'semantic-ui-react'
import uuid from 'uuid'
// import Cards, { Card } from 'react-swipe-card'

class Favorites extends Component {
    //<Dropdown placeholder='SEND TO' fluid multiple search selection options={this.props.favorites}/>

  render(){
    // console.log('favorite state',this.state)
   console.log('in Favorites props are',this.props)
    return(
      <div className="card">

      <div id="favorite-card">

          <Card.Group centered >
            <Card.Header>
              {this.props.favorites.map(favorite=>{

                return <h1 key={uuid()}> {favorite.title}</h1>

              })}
            </Card.Header>
          </Card.Group>

       </div>


    <div id="buttons">
      <Button id="btn-like" basic color="red" onClick={()=>this.props.handleNextFavorite()}>Dislike </Button>

      {this.props.favorites.map(favorite=>{
        return(
          <Button key={uuid()} id="btn-dislike" basic color="green" onClick={()=>this.props.handleNextFavorite(favorite.id)}>Like </Button>
        )
      })}



      <Popup trigger={<Button>Send To</Button>} flowing hoverable>


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



      </Popup>

     </div>
    </div>

    )
  }



}


export default Favorites
