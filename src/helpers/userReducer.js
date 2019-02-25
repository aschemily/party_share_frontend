const defaultState = {
  loggedIn: false,
  currentUser: null,
}

export default function reducer(state = defaultState, action){
  console.log('in reducer', action)
  switch(action.type){
    case "GET_USER":
    return{...state, currentUser: state.currentUser, loggedIn: true}

    default:
    return state
  }
}
