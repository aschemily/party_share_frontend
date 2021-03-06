import React, {Component} from 'react'
import Favorite from '../components/Favorite'
import uuid from 'uuid'

class UserFavoritesContainer extends Component {

  render(){
    //console.log('in UserFavoritesContainer props are',this.props)
    return(
      <div>
        {this.props.favorites.map(favorite=>{
          return <Favorite key={uuid()} favorite={favorite}/>
        })}
      </div>
    )
  }

}

export default UserFavoritesContainer
