import {createBrowserRouter} from 'react-router'
import RootLayout from './components/layout/RootLayout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
export const router =createBrowserRouter([
    {
        path:"/",
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                Component: Login
            }
        ]
    }
])

export default router;