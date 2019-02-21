import React, {Component} from 'react'
import Topic from '../components/Topic'
import Swipe from 'react-easy-swipe';
import uuid from 'uuid'

class Favorites extends Component {


  render(){
    // console.log('favorite state',this.state)
   console.log('in Favorites props are',this.props)
    return(
    
      <div>
      <h1>In Favorites</h1>
      {this.props.favorites.map(favorite=>{
        return <h1> {favorite.title}</h1>
      })}


      <button onClick={()=>this.props.handleNextFavorite()}>Dislike </button>
      <button onClick={()=>this.props.handleNextFavorite()}>like </button>

      </div>

    )
  }



}

export default Favorites
