import React, { useState } from "react";
import Register from "./Register";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"; 
import Home from "./Home";
import Header from "./Header";
import PrivateRoutes from "../utils/PrivateRoutes";
import ErrorPage from "../ErrorPage";

function App()
{ 
  let [userData,setUserData]=useState({token:false,name:"",email:"",contact:""})
    
  return  (
         <div>
       
        <Router>
        <Header/>
        <Routes>

        <Route path="/register&login" element={<Register userDataSetter={setUserData} />} />
        <Route element={<PrivateRoutes userData={userData}/>} >
          <Route exact path="/" element={<Home userData={userData} logout={setUserData}/>} />
        </Route>
        <Route path="*" element={<ErrorPage/>}/>

        </Routes> 

        </Router>
        </div>
    )
    
}

export default App;