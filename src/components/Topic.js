import React from 'react'
import { Grid} from 'semantic-ui-react'

const Topic= (props) =>{

  //console.log('in Topic props are',props)
  return(
    <Grid container columns={3}>
    <Grid.Column>
    <h1 onClick={()=>props.handleClick(props.topic.topic_name)}>{props.topic.topic_name}</h1>
    </Grid.Column>
    </Grid>
  )
}

export default Topic
