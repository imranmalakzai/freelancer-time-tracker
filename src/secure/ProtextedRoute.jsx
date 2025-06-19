import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom';

function ProtextedRoute({children}) {
  const {navigate} = useContext(AppContext)

    const user = localStorage.getItem("frelancerUser")
    if(!user)  {
      return <Navigate to="/login" />
    }    

  return children
}

export default ProtextedRoute