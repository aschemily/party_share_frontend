// export function signUp(username, email, password, history){
//   return function(dispatch){
//     fetch("http://localhost:3000/api/v1/signup",{
//       method:'POST',
//       headers:{
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         email,
//         password,
//       })
//     })
//     .then(r => r.json())
//     .then(data => {
//       console.log('in action function signup data is', data)
//       // localStorage.setItem("token", data.jwt)
//       dispatch({
//         type: "GET_USER",
//         payload: data.user
//       })
//     })
//     // this.props.history.push('/userprofile')
//     .then(()=>{
//       history.push('/userprofile')
//     })
//
//   }
// }
