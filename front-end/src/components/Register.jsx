import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(props){

  let navigate=useNavigate();
  let [isRegistered,setIsRegistered]=useState(false);
  const [userData,setUserData] = useState({
  FullName : "",
  Email : "",
  MobileNo : "",
  Password : ""
});

function homeRedirector(serverData){
  serverData['token']=true;
  props.userDataSetter(serverData);
  navigate('/')
}


function updateData(event){         //setting user inputs (userData)
  const {value,name} = event.target;
    setUserData(prevValue=>{          

      if(name==="FullName")
      {
        return {
          FullName : value,
          Email :  prevValue.Email ,
          MobileNo : prevValue.MobileNo,
          Password : prevValue.Password
          }
      }
      if(name==="Email")
      {
        return {
          FullName : prevValue.FullName,
          Email :   value,
          MobileNo : prevValue.MobileNo,
          Password : prevValue.Password
          }
      }
      if(name==="MobileNo")
      {
        return {
          FullName : prevValue.FullName,
          Email :  prevValue.Email ,
          MobileNo : value,
          Password : prevValue.Password
          }
      }
      if(name==="Password")
      {
        return {
          FullName : prevValue.FullName,
          Email :  prevValue.Email ,
          MobileNo : prevValue.MobileNo,
          Password : value
          }
      }
  
    });
}

async function makeRegisterRequest(){
  let res;

  try{
  res=axios.post('http://localhost:3050/users',userData)
  }catch{
  res={message:"request-unsuccessful"};
  }

  let result=await res;

  if(result.data.message==="registered-successfully"){
    window.alert("Registration Successful! ");
    setUserData({FullName : "",Email : "",MobileNo : "",Password : ""});
    setIsRegistered(true);
  }else if(result.data.message==="login-successful"){
    window.alert("Login Successful!")
    console.log(JSON.stringify(result.data.data));          /////////ON SUCCESSFUL LOGIN
    homeRedirector(result.data.data);
  }else if(result.data.message==="user-not-found"){
    window.alert("Please register first!")
    setUserData({FullName : "",Email : "",MobileNo : "",Password : ""});
    setIsRegistered(false);
  }else if(result.data.message==="registered-already"){
    window.alert("Email already registered! Please login to continue...")
    setUserData({FullName : "",Email : "",MobileNo : "",Password : ""});
    setIsRegistered(true);
  }
  else{
    window.alert(result.data.message);
  }

}

function loginRequest(e){
  e.preventDefault();
  makeRegisterRequest();
}

function checkAllData(e){
  e.preventDefault();
 
  if(!userData.FullName) window.alert("Please Enter Your Full Name!")
  else if(!userData.Email) window.alert("Please Enter Your Email!")
  else if(!userData.Password) window.alert("Please Enter Your Password!")
  else if(!userData.MobileNo) window.alert("Please Enter Your MobileNo!")
  else if( !userData.Email.match(/(@\w+\.)/) ) window.alert("Please Enter Correct Email Adress!")
  else if( typeof(userData.MobileNo)!=="number" && userData.MobileNo.toString().length!==10) window.alert("10 digit mobile number required!")
  else{
   makeRegisterRequest();
  }

}
    return (
<>
      {!isRegistered &&  <div> 
     <h2 className="heading">Attendance Portal Register</h2>
  
     <div className="container2">
      
      <form >
        <h3>Register</h3>
        <div className="form-group">
        <input type="text"  name="FullName"   onKeyUp={updateData}  placeholder="Full Name" required />
        </div>
        <div className="form-group">
        <input type="email"  name="Email"   onKeyUp={updateData}  placeholder="Institute email id"  required />
        </div>
        <div className="form-group">
        <input type="tel"  name="MobileNo"   onKeyUp={updateData}  placeholder="Mobile Number"  required />
        </div>
        <div className="form-group">
        <input type="password"  name="Password"   onKeyUp={updateData}  placeholder="Password"  required />
        </div>
        
       <button type="button" onClick={checkAllData}> Register </button> 

     
      </form>
    </div>
    
</div> }

{isRegistered && <div>
      
      <h2 className="heading">Attendance Portal Login</h2>
  
      <div className="container">
         
        <form >
          <h3>Log In</h3>
          <div className="form-group">
          <input type="email"  name="Email"   onKeyUp={updateData}  placeholder="Institute email id"  required />
          </div>
          <div className="form-group">
          <input type="password"  name="Password"   onKeyUp={updateData}  placeholder="Password"  required />
          </div>
          <button type="button" onClick={loginRequest}>Login</button> 
          
        </form>
      </div>
  </div>}

</>
    )
}

export default Register;