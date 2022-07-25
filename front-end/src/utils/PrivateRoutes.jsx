import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function PrivateRoutes({userData:auth}) {
    // let auth=({token:true});
  return (
    auth.token ? <Outlet/> : <Navigate to="/register&login" />
  )
};

export default PrivateRoutes;