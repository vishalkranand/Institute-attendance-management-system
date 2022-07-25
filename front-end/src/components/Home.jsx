import React from 'react'
import "./homestyle.css"

function Home({userData:props,logout}) {
console.log(logout)
function triggerLogout(){
logout({token:false,name:"",contact:"",email:""});
}
  return (
    <div id='home-container'>
    <div id='data-container'>
    <header id='welcome-heading'>{props.name}</header>
     <div>Email: {props.email}</div>
     <div>Contact No: {props.contact}</div>
     <div>Unique Id: {props._id}</div>
    </div>
   <div id='button-container'>  <button>Delete Account</button>  <button>Change Password</button> <button onClick={triggerLogout}>Logout</button>  </div>
    </div>
  )
}

export default Home