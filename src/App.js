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
     console.log('in handleNextFavorite id',favoriteId)
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
     console.log('current user', currentUser.conversations)

       fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`,{
             headers:{
               "Authorization":localStorage.getItem("token")
             }
           })
           .then(r => r.json())
           .then(data =>{
             console.log('data in fetch user conversations', data)
             console.log('data conversations', data.conversations)
             console.log('data senders', data.senders)

             // const currentConversations = data.conversations.map(convo =>{
             //   //console.log('in currentConversations', convo)
             //   return {cid: convo.id, conversation_name: convo.conversation_name}
             // })
             //
             // const newConversation = data.senders.map(newconvo =>{
             //   //console.log('in new conversation', newconvo.conversations)
             //   return newconvo.conversations.map(c =>{
             //     return {cid: c.id, conversation_name: c.conversation_name}
             //   })[0]
             // })

             const receivedMessages = data.received_messages.map(message =>{
               console.log('received message', message)
               console.log(message.conversation.id)
               return {cid: message.conversation.id, rid: message.receiver_id, sid: message.sender_id, conversation_name: message.conversation.conversation_name}
             })

             const sentMessages = data.sent_messages.map(message =>{
               console.log('sent message',message)
               // console.log('message name',message.conversation.conversation_name)
               return {cid: message.conversation.id, rid: message.receiver_id, sid: message.sender_id, conversation_name: message.conversation.conversation_name}
             })


             //const newConversation = data.sender[0]
           //   const info = data.map(user =>{
           //        return {cid: user.conversation.id, rid: user.receiver_id, sid: user.sender_id, conversation_name: user.conversation.conversation_name}
           //      })
           //
            this.setState({conversations: [...sentMessages, ...receivedMessages]})
            })

    }


    clickConversation = (conversationId, receiverid, senderid) =>{
      // const {currentUser} = this.state
      console.log('clicking', conversationId, receiverid, senderid, this.state.currentUser)
      console.log('clickinggggggggggggggggggggggggg', this.state.currentUser)
      console.log('state conversations', this.state.conversations)

        this.setState({conversationClicked: true})

      return this.state.conversations.map(conversation=>{
        if ((conversation.cid === conversationId && conversation.rid === receiverid && conversation.sid === senderid) ||
            (conversation.cid === conversationId && conversation.rid === receiverid && conversation.sid === senderid)){

          // fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`)
          //   .then(r => r.json())
          //   .then(data =>{
          //     //console.log('data in click conversation', data)
          //   })

          fetch(`http://localhost:3000/api/v1/show_messages_for_only_two/${receiverid}/${senderid}`)
          .then(r => r.json())
          .then(data => {
            console.log('data in fetch show messages for only two', data)
            const info = data.map(data =>{
              console.log('data in info', data)
              // console.log('data receiver', data.receiver)
              // console.log('data receiver', data.receiver.username)
              // console.log('data receiver', data.receiver.id)
              // console.log('data sender',data.sender)
               console.log('data conversation', data.favorite)
              return {
                sid: data.sender.id,
                senderusername: data.sender.username,
                sent_messages: data.sent_messages,
                rid: data.receiver.id,
                receiverusername: data.receiver.username,
                received_messages: data.received_messages,
                fid: data.favorite ? data.favorite.id : 0,
                favoritetitle: data.favorite ? data.favorite.title : 0,
                messages:data.messages,
                cid: data.conversation.id}
            })
            this.setState({messages: [...info]})
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
      //console.log('clicking in createConversation', userid, convid, favoriteid)
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
                sent_messages: 'favoriteid',
                received_messages:'work?',
                messages: 'please work'

              })
          })




          // fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/messages`,{
          //   method:"POST",
          //   headers: {
          //     'Content-Type': 'application/json',
          //     'Accept': 'application/json'
          //   },
          //   body: JSON.stringify({
          //     sender_id: currentUser.id,
          //     messages: 'start your conversation',
          //     favorite_id: favoriteid,
          //     receiver_id: userid
          //   })
          // })
        }
      })
    }

    sendNewMessage = (message)=>{
      console.log('in send new message', message)
      const {currentUser} = this.state
      // const findcid = this.state.messages.map(message =>{
      //   return message.cid
      //  })
      // const cid = findcid.slice(0,1).toString()

      console.log('state messages',this.state.messages)

      const rid = this.state.messages.map(rid =>{
        return rid.rid
      })[0]
      //console.log('rid?', rid)

      const sid = this.state.messages.map(sid =>{
        return sid.sid
      })[0]

      const cid = this.state.messages.map(cid =>{
        return cid.cid
      })[0]

      fetch(`http://localhost:3000/api/v1/new_messages_for_only_two/${rid}/${sid}`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          messages: message,
          sender_id: sid,
          conversation_id: cid,
          receiver_id: rid
        })
      })
    }

/*************************USER CONVERSATIONS END*******************************/


  render() {
    //console.log('state favorites',this.state.favorites)
  //  console.log('state conversations',this.state.conversations)
    //console.log('all users state',this.state.allUsers)
    //console.log('messages state',this.state.messages)
    console.log('new conversations',this.state.newConversations)
    console.log('conversations', this.state.conversations)
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
