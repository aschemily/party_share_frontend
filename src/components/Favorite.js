import React from 'react';
import { List, Image, Card, Icon, Grid, Segment } from 'semantic-ui-react'


const Favorite = (props) =>{
  //   <List.Item position="center">
  //     <Image avatar src={props.favorite.image} />
  //     <List.Content>
  //       <List.Header as='a'></List.Header>
  //     </List.Content>
  //   </List.Item>
  //
  // </List>
  //console.log('favorite',props)
  return (

    <Grid centered columns='equal'>
      <Grid.Column>
          <Card color='purple' centered fluid>
            <Card.Content>
           <Icon id='topicicon' name='like' size='huge' />  
              <Card.Header>{props.favorite.title}</Card.Header>
            </Card.Content>
          </Card>

       </Grid.Column>
    </Grid>




  )

}

export default Favorite
