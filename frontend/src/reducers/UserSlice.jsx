import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "./UserThunk";

let UserSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoading:true
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
            state.isLoading=false
        },
        removeUser:(state)=>{
            state.user=null
            state.isLoading=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(currentUser.pending,(state)=>{
       state.isLoading=true
        })
        .addCase(currentUser.fulfilled,(state,action)=>{
            state.user=action.payload
            state.isLoading=false
        })
        .addCase(currentUser.rejected,(state)=>{
            state.user=null,
            state.isLoading=false
        })
    }
})

export let {setUser,removeUser}=UserSlice.actions
export default UserSlice.reducer