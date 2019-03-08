import React from 'react'
import { Grid, Card, Icon, Segment} from 'semantic-ui-react'

const Topic= (props) =>{

  //console.log('in Topic props are',props)
  return(
    <Grid centered columns='equal'>
      <Grid.Column>
        <Segment>
    <Card color='teal' centered fluid>
      <Card.Content>
        <Icon id='topicicon' name='star outline' size='huge' flipped='horizontally' position='right'/>
      <Card.Header>
      <h1 onClick={()=>props.handleClick(props.topic.topic_name)}>{props.topic.topic_name}</h1>
     </Card.Header>

    </Card.Content>
    </Card>
    </Segment>
  </Grid.Column>
    </Grid>

  )
}

export default Topic
