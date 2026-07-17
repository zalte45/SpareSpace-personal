import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    username: "",
    email: "",
    verified:Boolean
}

const loginSlice = createSlice({
    name: "loginInfo",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.verified = action.payload.verified;
        },

    }

})



export const { setLogin } = loginSlice.actions


export default loginSlice.reducer;