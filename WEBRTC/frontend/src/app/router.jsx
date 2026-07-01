import {createBrowserRouter} from 'react-router'
import Home from './pages/Home.jsx'
import Room from './pages/Room.jsx'
const router =createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    // {
    //     path:"/",
    //     Component:Home
    // },
    {
        path:"/room/:roomId",
        element:<Room/>
    },
    // {
    //     path:"/",
    //     Component:Room
    // },
])
export default router