import React, {Component} from 'react'
//import Topic from '../components/Topic'
import { Button, Popup, Header, Grid, Card} from 'semantic-ui-react'
import uuid from 'uuid'
// import Cards, { Card } from 'react-swipe-card'

class Favorites extends Component {
    //<Dropdown placeholder='SEND TO' fluid multiple search selection options={this.props.favorites}/>

  render(){
    // console.log('favorite state',this.state)
   console.log('in Favorites props are',this.props.sendDisplay)
    return(

      <div className="card">
        <img id='background' src={require('./favoritephoto.jpg')}/>
      <div id="favorite-card">

        <Card color='blue' centered fluid>
          <Card.Content centered >
            <Card.Header centered>
              {this.props.favorites.map(favorite=>{
                return <h1 id="favoritename" key={uuid()}> {favorite.title}</h1>
              })}
            </Card.Header>
          </Card.Content>
          </Card>
       </div>



    <div id="buttons">
      <Button class="ui red button" id="btn-like" color="red" onClick={()=>this.props.handleNextFavorite()}>Dislike </Button>

      {this.props.favorites.map(favorite=>{
        return(
          <Button  class="positive ui button" key={favorite.id} id="btn-dislike" color="green" onClick={()=>this.props.handleNextFavorite(favorite.id)}>Like </Button>
        )
      })}



      <Popup on='click' trigger={<Button onClick={()=>this.props.sendFavorite()}>Send To</Button>}>


        <Grid.Column textAlign='center' style={{ overflow: 'auto', maxHeight: '50vh' }}>
          {this.props.sendDisplay.map(user=>{

              return (
                <div key={uuid()}>
              <Header as='h4' key={user.id}>{user.username}</Header>
              {this.props.favorites.map(favorite=>{
                  return <Button key={uuid()} onClick={()=>this.props.createconversation(user.id, user.cid, favorite.id)}> Send </Button>
              })}

              </div>
              )
            })}

        </Grid.Column>
      </Popup>
     </div>
    </div>
    )
  }



}


export default Favorites
