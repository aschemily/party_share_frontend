import React from 'react';
import { List, Image } from 'semantic-ui-react'


const Favorite = (props) =>{
  //console.log('favorite',props)
  return (
    <List>
      <List.Item position="center">
        <Image avatar src={props.favorite.image} />
        <List.Content>
          <List.Header as='a'>{props.favorite.title}</List.Header>
        </List.Content>
      </List.Item>

    </List>



  )

}

export default Favorite
