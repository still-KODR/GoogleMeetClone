import React, { useEffect } from 'react'
import {RouterProvider,createBrowserRouter} from 'react-router'
import LoginPage from '../pages/LoginPage';
import Home from '../pages/Home';
import { useDispatch } from 'react-redux';
import { currentUser } from '../reducers/UserThunk';
import PublicRoute from '../ProtectedRoutes/PublicRoute';
import ProtectedRoute from '../ProtectedRoutes/ProtectedRoute';
import Room from '../pages/Room';
const AppRouter = () => {
  let dispatch=useDispatch()

  useEffect(()=>{
     dispatch(currentUser())
  },[])

   const route = createBrowserRouter([
  { path: "/",
     element: <PublicRoute/>,
     children:[{
      path:"",
      element:<LoginPage/>
     }] 
    },
  {
    path:'/home',
    element:<ProtectedRoute/>,
    children:[{
      path:"",
      element:<Home/>
    },{
      path: "room/:roomID" ,
      element:<Room/>
    }
  ]
  }
]);
  return <RouterProvider router={route}/>
}

export default AppRouter
