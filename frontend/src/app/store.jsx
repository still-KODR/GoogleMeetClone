import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/UserSlice'

export let store=configureStore({
  reducer:{
     user:userReducer    
  }
})
