import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router'

const PublicRoute = () => {

  let {user,isLoading}=useSelector((state)=>state.user)

  if(isLoading) return  (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  if(user) return <Navigate to="/home"/>

  return <Outlet/>
}

export default PublicRoute
