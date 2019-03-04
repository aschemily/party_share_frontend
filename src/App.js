import React, { Component } from 'react';
import './App.css';
import TopicContainer from './container/TopicContainer'
import Favorites from './container/Favorites'
import LandingPage from './container/LandingPage'
import NavBar from './container/NavBar'
import UserFavoritesContainer from './container/UserFavoritesContainer'
import UserConversationsContainer from './container/UserConversationsContainer'
//import UserProfile from './container/UserProfile'
import LoginPage from './components/LoginPage'
import ChatRoom from './container/ChatRoom'
import SignUp from './components/SignUp'
import { BrowserRouter as Router, Route,Switch, withRouter} from 'react-router-dom';


class App extends Component {
  state = {
    currentUser: null,
    favorites: [],
    topics: [],
    topicClicked: false,
    displayOne: '',
    favoriteIndex: 0,
    conversations:[],
    conversationClicked:false,
    sendDisplay:[],
    messages:[],
  }

  componentDidMount(){
    let token = localStorage.getItem("token")
    // localStorage.getItem('token') is returning "null"
    if (token){
      fetch(`http://localhost:3000/api/v1/current_user`,{
        headers:{
          "Authorization": token
        }
      })
      .then(r => r.json())
      .then((response)=>{
        this.setState({
          currentUser: response
        })
      })
    }
  }

/*************************LOGIN / SIGNUP/ LOGOUT START*************************/
  signup = (username, email, password, confirmation)=>{

    if (password === confirmation){
      //console.log('hitting')
      fetch("http://localhost:3000/api/v1/users",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      })
      .then(r => r.json())
      .then((response)=>{
        if (response.errors){
          alert(response.errors)
        } else{
          localStorage.setItem("token", response.token)
          this.setState({
            currentUser: response.user
          })
          this.props.history.push(`/profile`)
        }
      })
    } else{
      alert("Passwords do not match!")
    }
  }

  login = (username, email, password)=>{
      fetch("http://localhost:3000/api/v1/login",{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password
        })
      })
      .then(r => r.json())
      .then((response)=>{
        //console.log('in login fetch resposne',response)
        if (response.errors){
          alert(response.errors)
        } else{
          // console.log(response)
          localStorage.setItem("token", response.token)
          localStorage.setItem("user_id", response.user.id)
          this.setState({
            currentUser: response.user
          })
          this.props.history.push(`/profile`)
        }
      })
     }


  logOut = ()=>{
    //console.log("log out")
    this.setState({
      currentUser: null
    })
    localStorage.clear()
    localStorage.removeItem("user_id")
    this.props.history.push("/")
  }
/*************************LOGIN / SIGNUP/ LOGOUT END***************************/

/*************************USER FAVES/ TOPICS START*****************************/
  fetchTopics = ()=>{
    fetch("http://localhost:3000/api/v1/topics")
    .then(r => r.json())
    .then(data => this.setState({topics: data},()=>console.log('topics state',this.state)))

  }

  clickTopic = (topicName) =>{
    //console.log('in clickTopic event',topicName)
   return this.state.topics.map(topic =>{
     //console.log(topicFavorites)
      //console.log('in clickTopic topic is',topic.favorites)
      if (topicName === topic.topic_name){
        this.setState({favorites: topic.favorites, topicClicked:true},()=>console.log('click topic state',this.state))
      } else {
        return topicName
      }
      //console.log('topicFavorites', topicFavorites)
    })
  }

  fetchUserFaves = () =>{
    const {currentUser} = this.state
    fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/favorites`,{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      })
      .then(r => r.json())
      .then(favorites => {
        // this.props.dispatch here
        this.setState({favorites: favorites})
      })
      //[{id: 1, }]
   }



   handleNextFavorite = (favoriteId) =>{
     //console.log('in handleNextFavorite id',favoriteId)
     //let userId = this.state.user
     this.setState({favoriteIndex: this.state.favoriteIndex + 1})
     return this.state.favorites.map(favorite=>{

         if (favorite.id === favoriteId){
           fetch("http://localhost:3000/api/v1/user_favorites",{
               method:"POST",
               headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
               },
               body: JSON.stringify({
                 user_id: this.state.user.id,
                 favorite_id: favoriteId
               })
           })
        }
     })
   }

   favoriteToDisplay = () =>{
     return this.state.favorites.slice(
       this.state.favoriteIndex, this.state.favoriteIndex + 1
     )
   }

/*************************USER FAVES/ TOPICS END*******************************/

/*************************USER CONVERSATIONS START*****************************/

   fetchUserConversations = () =>{
     const {currentUser} = this.state
     fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/conversations`,{
         headers:{
           "Authorization":localStorage.getItem("token")
         }
       })
       .then(r => r.json())
       .then(conversations => {
         // this.props.dispatch here
         this.setState({conversations: conversations})
       })
       //[{id: 1, }]
    }

    clickConversation = (conversationId) =>{

      console.log('clicking', conversationId)
      this.setState({conversationClicked:true})
      return this.state.conversations.map(conversation=>{
        if (conversation.id === conversationId){
          fetch(`http://localhost:3000/api/v1/conversations/${conversationId}`,{
            headers:{
              "Authorization":localStorage.getItem("token")
            }
          })
          .then(r=>r.json())
          .then(data=>{
            //console.log('in click conversation data', data)
            const messageData = data.map(data => {
              return {id: data.id, messages: data.messages, username:data.user.username, favorite: data.favorite, cid: data.conversation_id}
            })
            this.setState({messages: messageData})
          })
        }
      })
    }



    sendFavorite = () =>{
      //console.log('should be hitting this')
      const {currentUser} = this.state
      Promise.all([
        fetch("http://localhost:3000/api/v1/users",{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        }),
      fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/conversations`,{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
      ])
      .then(([res1, res2])=>Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2])=>{

        const conversationName = data2.map(data => {
          return {cid: data.id, username: data.conversation_name}
        })
        this.setState({
          sendDisplay:[...data1, ...conversationName]
         },()=>console.log('send display state',this.state))
      })
    }

    createConversation = (userid, convid,favoriteid)=>{
      const {currentUser} = this.state
      console.log('clicking in createConversation', userid, convid, favoriteid)
      return this.state.sendDisplay.map(receiver =>{
        //console.log('what is the info',info)
        if (receiver.id === userid || receiver.id === convid){
          fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/messages`,{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              user_id: currentUser.id,
              messages: 'start your conversation',
              favorite_id: favoriteid,
            })
          })
        }
      })
    }

    sendNewMessage = (message)=>{
      console.log('in send new message', message)
      const {currentUser} = this.state
      const findcid = this.state.messages.map(message =>{
        return message.cid
       })
      const cid = findcid.slice(0,1).toString()

      fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/newmessage`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: message,
          user_id: currentUser.id,
          conversation_id: parseInt(cid)
        })
      })
    }





/*************************USER CONVERSATIONS END*******************************/


  render() {
    //console.log('state favorites',this.state.favorites)
  //  console.log('state conversations',this.state.conversations)
    //console.log('all users state',this.state.allUsers)
    return (
      <div>
        <NavBar
          currentuser={this.state.currentUser}
          logout={this.logOut}
          fetchUserFaves={this.fetchUserFaves}
          fetchTopics={this.fetchTopics}
          fetchUserConversations={this.fetchUserConversations}/>

          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path="/login" render={(routerProps)=><LoginPage login={this.login} {...routerProps}/>}/>
            <Route exact path="/signup" render={(routerProps)=><SignUp signup={this.signup} {...routerProps}/>}/>
            <Route exact path="/favorites" render={(routerProps)=><UserFavoritesContainer favorites={this.state.favorites} {...routerProps}/>}/>
            <Route exact path="/topics" render={()=> this.state.topicClicked ? <Favorites favorites={this.favoriteToDisplay()} handleNextFavorite={this.handleNextFavorite} sendFavorite={this.sendFavorite} sendDisplay={this.state.sendDisplay} createconversation={this.createConversation}/>
               : <TopicContainer topics={this.state.topics} handleClick={this.clickTopic}/>}/>

             <Route exact path="/conversations" render={(routerProps)=> this.state.conversationClicked ? <ChatRoom messages={this.state.messages} sendnewmessage={this.sendNewMessage} />
                 : <UserConversationsContainer conversations={this.state.conversations} {...routerProps} clickConversation={this.clickConversation}/>}/>

          </Switch>

        </div>

    );
  }
}

export default withRouter(App);
// export default connect(null)(withRouter(App));
