import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div style={{height:"100%", width:"100%", display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{color:"black",fontSize:"100px",marginTop:"-10%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           <span style={{border:"2px solid black",padding:"10px 25px",borderRadius:"4%"}}> 404 &nbsp; Not Found...</span>

            { <Link to={'/'} style={{textDecoration:"none",color:"white",marginTop:"5%",fontSize:"30px",backgroundColor:"black",borderRadius:"5%",padding:"10px 30px" }} >Home</Link>}
        </div>
    </div>
  )
}

export default ErrorPage