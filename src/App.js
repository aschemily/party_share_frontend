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
import {Route,Switch, withRouter} from 'react-router-dom';
import uuid from 'uuid'


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
    newConversations: [],
    newConvo: false,
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
          this.props.history.push(`/topics`)
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
          this.props.history.push(`/topics`)
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
     const {currentUser} = this.state
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
                 user_id: currentUser.id,
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
     //console.log('current user', currentUser.conversations)

       fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`,{
             headers:{
               "Authorization":localStorage.getItem("token")
             }
           })
           .then(r => r.json())
           .then(data =>{
              console.log('FETCH USER CONVERSATIONS', data)

             if(data.received_messages === undefined || data.received_messages.length === 0){
              console.log('this is true ')
               const sentMessages = data.sent_messages.map(message =>{
                 if(message.conversation.id){
                   //console.log('please get both?',message)
                   return {cid: message.conversation.id, rid: message.receiver.id, sid: message.sender.id, conversation_name: message.conversation.conversation_name}
                 }
               })
              // console.log('%c Setting conversations', 'color: red', this.state.conversations, sentMessages);
                this.setState({conversations:[...sentMessages]})
             } else if (data.sent_messages === undefined || data.sent_messages.length === 0){
                console.log('havent received messages')
                 const receivedMessages = data.received_messages.map(message =>{
                  console.log('received message', message)
                   if(message.conversation.id){
                     //console.log('in received message what is it', message)
                    return {cid: message.conversation.id, rid: message.receiver.id, sid: message.sender.id, conversation_name: message.conversation.conversation_name}
                   }
                 })
                 //console.log('received messages', receivedMessages)
                 this.setState({conversations:[...receivedMessages]})
             } else {

               console.log('have both received and sent messages')
               // console.log('this.state.conversations', this.state.conversations)
               const receivedMessages = data.received_messages.map(message =>{
                console.log('received message', message)
                 if(message.conversation.id){
                   //console.log('in received message what is it', message)
                  return {cid: message.conversation.id, rid: message.receiver.id, sid: message.sender.id, conversation_name: message.conversation.conversation_name}
                 }
               })

               console.log('receivedMessages', receivedMessages)


               const sentMessages = data.sent_messages.map(message =>{
                 console.log('IN sentMessages', message)
                 if(message.conversation.id){
                   console.log('please get both?',message)
                   return {cid: message.conversation.id, rid: message.receiver.id, sid: message.sender.id, conversation_name: message.conversation.conversation_name}
                 }
               })

               console.log('sentMessages', sentMessages)
               this.setState({conversations:[...sentMessages, ...receivedMessages]},()=>console.log('state conversations',this.state.conversations))
             }

             // else {
             //  //  console.log('false user has received message')
             //   const sentMessages = data.sent_messages.map(message =>{
             //     if(message.conversation.id){
             //       return {cid: message.conversation.id, rid: message.receiver.id, sid: message.sender.id, conversation_name: message.conversation.conversation_name}
             //     }
             //   })
             //
             //   this.setState(prevState =>({
             //     conversations:[...prevState.conversations, ...sentMessages, ...receivedMessages]
             //   }))
             // }

          })
    }


    clickConversation = (conversationId, receiverid, senderid) =>{
      const {currentUser} = this.state
      console.log('clicking', 'conversation id', conversationId, 'receiver id', receiverid, 'sender id', senderid)
      //console.log('clickinggggggggggggggggggggggggg', this.state.currentUser)
      // console.log('state conversations', this.state.conversations)
      console.log('in click conversation conversation state',this.state.conversations)
        this.setState({conversationClicked: true})

      return this.state.conversations.map(conversation=>{
        if (conversation.cid === conversationId && conversation.rid === receiverid && conversation.sid === senderid){
          console.log("TRUEEEEEEEEEE")
          fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`)
             .then(r => r.json())
             .then(data =>{
               console.log('data', data)
              console.log('data.sent_messages', data.sent_messages)
              console.log('data.received_messages', data.received_messages)


               if (data.received_messages === undefined || data.received_messages.length === 0){
                //console.log('this is true')
                 const sentMessages = data.sent_messages.filter(sent =>
                  // { console.log('sent receive', sent.receiver.id)
                  //   console.log('receiverid', receiverid)
                  //   console.log('sent.sender.id', sent.sender.id)
                  //   console.log('senderid', senderid )}
                     (receiverid === sent.receiver.id && senderid === sent.sender.id)
                 ).map(sent => ({
                   id: sent.id,
                   sentmessages: sent.messages,
                   sentUserFave: sent.favorite ? sent.favorite.title : null,
                   userWhoSentMsgId: sent.sender.id,
                   senderusername: sent.sender.username,
                   userWhoRecMsgId: sent.receiver.id,
                   cid: sent.conversation.id
                 }))
                 console.log('sent messages what is it?', sentMessages)

                 this.setState({messages:[...sentMessages]},()=>console.log('sentMessages', this.state.messages))

               } else if(data.sent_messages === undefined || data.sent_messages.length === 0){
                 console.log('true user has not sent any messages')
                 console.log('this.state.messages', this.state.messages)
                   const receivedMessages = data.received_messages.filter(receiver =>{
                     console.log(' IN receivedMessages',receiver )
                     console.log('receiverid', receiverid)
                     console.log("receiver.receiver.id ", receiver.receiver.id )
                     console.log('receiver.sender.id', receiver.sender.id)
                     console.log('senderid', senderid)
                     return (receiverid === receiver.sender.id && senderid === receiver.receiver.id ) || (receiverid === receiver.receiver.id && senderid === receiver.sender.id)
                   }).map(receiver =>({
                     id: receiver.id,
                     receivedmessages: receiver.messages,
                     receivedUserFave: receiver.favorite ? receiver.favorite.title : null,
                      userSendingMsgId: receiver.sender.id,
                      userSendingMsg: receiver.sender.username,
                      userReceivingMsg: receiver.receiver.username,
                      userRecMsgId: receiver.receiver.id,
                      cid: receiver.conversation.id
                   }))
                  this.setState({messages: [...receivedMessages]},()=>console.log('receivedMessages', this.state.messages))
               } else{
                 console.log('IN HERE ')
                console.log('ELSE messages', this.state.messages)

                const receivedMessages = data.received_messages.filter(receiver =>{
                  console.log(' IN receivedMessages',receiver )
                  console.log('receiverid', receiverid)
                  console.log("receiver.receiver.id ", receiver.receiver.id )
                  console.log('receiver.sender.id', receiver.sender.id)
                  console.log('senderid', senderid)
                  //return (receiverid === receiver.receiver.id && senderid === receiver.sender.id)
                  return (receiverid === receiver.sender.id && senderid === receiver.receiver.id ) || (receiverid === receiver.receiver.id && senderid === receiver.sender.id)
                }).map(receiver =>({
                  id: receiver.id,
                 receivedmessages: receiver.messages,
                 receivedUserFave: receiver.favorite ? receiver.favorite.title : null,
                  userSendingMsgId: receiver.sender.id,
                  userSendingMsg: receiver.sender.username,
                  userReceivingMsg: receiver.receiver.username,
                  userRecMsgId: receiver.receiver.id,
                  cid: receiver.conversation.id,
                  received: true,
                }))

                console.log('what is received messages', receivedMessages)


                const sentMessages = data.sent_messages.filter(sent =>
                  // {console.log(' IN sentMessages',sent )
                  // console.log('receiverid', receiverid)
                  // console.log("sent.receiver.id ", sent.receiver.id )
                  // console.log('sent.sender.id', sent.sender.id)
                  // console.log('senderid', senderid)}
                  (receiverid === sent.receiver.id && senderid === sent.sender.id)
                ).map(sent => ({
                  id: sent.id,
                  sentmessages: sent.messages,
                  sentUserFave: sent.favorite ? sent.favorite.title : null,
                  userWhoSentMsgId: sent.sender.id,
                  senderusername: sent.sender.username,
                  userWhoRecMsgId: sent.receiver.id,
                  cid: sent.conversation.id,
                  sent: true,
                }))
                console.log('what is sentMessages', sentMessages)

                console.log('receivedMessages what IS IT', receivedMessages)

                const merged = [...sentMessages, ...receivedMessages].sort((m1, m2) => {return m1.id - m2.id})

                this.setState({messages: merged},()=>console.log('new state',this.state.messages))

               }

           })
        }
      })
    }



    sendFavorite = () =>{
      //console.log('should be hitting this')
      const {currentUser} = this.state
      console.log('current user from state',this.state.currentUser)
      console.log('current user',currentUser)
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
        console.log('data 1', data1)
        console.log('data 2,', data2)

        const conversations = data2.conversations.map(conversation=>{
          return {id: conversation.id, username: conversation.conversation_name}
        })

        this.setState({
          sendDisplay:[...data1, ...conversations]
         })
      }).then( res => {
        console.log(this.state.sendDisplay)
        console.log(this.state.currentUser)
        console.log(currentUser)})
    }

    createConversation = (userid, convid,favoriteid)=>{
      const {currentUser} = this.state
      console.log('clicking in createConversation', userid, convid, favoriteid)
      this.setState({newConvo: true})
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
                conversation_name:'conversation created',
                sender_id: currentUser.id,
                favorite_id: favoriteid,
                receiver_id: userid,
                messages:'new message'
              })
          })
        }
      })
    }

    sendNewMessage = (message)=>{
      console.log('in send new message', message)

      console.log('in send new message state is?', this.state.messages)


      const {currentUser} = this.state

      console.log('currentUser', this.state.currentUser)
      console.log('currentUser', this.state.currentUser)


      const userToReceiveMsgid = this.state.messages.map(user =>{
        console.log('user userToReceiveMsgid', user)
        console.log('current user id ', currentUser.id)
         console.log('in send new message receiver', user.sentmessages)
         console.log('user who sent the message should be ', user.userWhoRecMsgId)
         console.log('user.userRecMsgId', user.userRecMsgId)
         console.log('currentUser.id === user.userWhoSentMsgId', currentUser.id === user.userWhoSentMsgId)
         console.log('user.userWhoSentMsgId', user.userWhoSentMsgId)
         if(currentUser.id === user.userRecMsgId){

           return  user.userSendingMsgId
         } else if (currentUser.id === user.userWhoSentMsgId){
           return user.userWhoRecMsgId
         }

        // console.log('receiver.receiver ',receiver.receiver)
        // console.log('receiver.receiver.id',receiver.receiver.id)
        //return user.sid
      })[0]

      console.log('userToReceiveMsgid', userToReceiveMsgid)

      const cid = this.state.messages.map(cid =>{
        return cid.cid
      })[0]

      console.log('cid?', cid)

      fetch(`http://localhost:3000/api/v1/newmessages`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: message,
          sender_id: currentUser.id,
          conversation_id: cid,
          receiver_id: userToReceiveMsgid,
        })
      })
    }

/*************************USER CONVERSATIONS END*******************************/


  render() {
    //console.log('state favorites',this.state.favorites)
  //  console.log('state conversations',this.state.conversations)
    //console.log('all users state',this.state.allUsers)
  //  console.log('messages state',this.state.messages)
    //console.log('new conversations',this.state.newConversations)
    //console.log('conversations', this.state.conversations)
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
