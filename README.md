## WeShare

WeShare is a single page web application inspired by Instagram direct messaging. This React app allows users to like/dislike and favorite information they see along with sending it to they're friends. Users have the capabilitiy to have direct conversations to eachother. 

### Technologies 

WeShare was created with a Ruby on Rails backend with a PostgressSQL database and a React frontend. Additional frameworks and libraries used include: 

- Semantic UI 
- React Router 
- JWT Authentication

Github to backend can be found [here](https://github.com/aschemily/we_share_backend)

### Key Features
The full demo can be found on YouTube [here](https://www.youtube.com/watch?v=rQs4ckUSlLk) 

Users can click on the different categoies displayed and like/dislike them. The 'liked' information will be displayed in their favorites section. Users can also send information they like to other users. The information that is currently being displayed is seeded data.

The chat feature implemented is based on a self referencing relationship configured in Ruby on Rails where the user can be the sender or receiver. In the apps current state there is a refresh that needs to happen to see the message being sent and delivered. 

The Sign In/ Login page is JWT authenticated. 

## Future Development

The major focus of the application was to implement a working chat feature with action cables. As mentioned in Key Features a refresh needs to occur. With more time additional features would include: 
- Action Cables 
- Edit/Delete capabilities for users to delete their favorites and conversations and/or edit the conversation name 


