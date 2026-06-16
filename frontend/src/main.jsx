import './index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider} from 'react-router'
import AppRouter from './router/AppRouter.jsx'
import {Provider} from 'react-redux'
import { store } from './app/store.jsx'

createRoot(document.getElementById('root')).render(

<Provider store={store}>
  <AppRouter/>
</Provider>
)
