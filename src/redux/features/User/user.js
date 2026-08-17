import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setIsLoggedIn:(state,action) => {
           state.isLoggedIn=action.payload
        },
        logout:(state) => {
           state.isLoggedIn=false
        }
    }
})

export const {setIsLoggedIn, logout}=userSlice.actions
export default userSlice.reducer