import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../config/baseApi";

//user registration 
export const signUp = createAsyncThunk('signup', async(user)=>{
    const response = await baseURL.post('students',user)
    const { data, headers } = response;
    return { responseData: data, authorization: headers.authorization };
});

export const signIn = createAsyncThunk('SignIn', async(data)=>{
    try{
    const response = await baseURL.post('login',data)
    const { data: responseData, headers } = response;
    return { responseData, authorization: headers.authorization };
} catch (error) {
    // handle error
    console.error(error);
    throw error; // re-throw error to let the rejected action be dispatched
}
});

export const resetState = createAsyncThunk('reset', async()=>{
    return true
});

const userSlice = createSlice({
    name:"user",
    initialState:{
        userInfo:{},
        loading:false,
        success:true,
        errorMessage:"",
        authorization: null // add authorization property to the state
    },
    reducers: {},
    extraReducers:{
        [signUp.pending]:(state,action)=>{
            state.loading=true
            // state.success =false;

        },
        [signUp.fulfilled]:(state,action)=>{
            state.loading=false;
            state.success =true;
            state.userInfo = action.payload.responseData;
            state.authorization = action.payload.authorization; // update authorization value in the state
        },
        [signUp.rejected]:(state,action)=>{
            state.loading=true
            state.success =false;
            if (action.error.message === 'Request failed with status code 404') {
                console.error('Not found error');
                state.errorMessage = "Something went wrong, please check your network and try again"
            } else if (action.error.code === 'ECONNABORTED') {
                console.error('Timeout error');
                state.errorMessage = "Request timeout. please check your network"
            } else {
                console.error(action.error);
                state.errorMessage = action.error

            }
        },

        [signIn.pending]:(state,action)=>{
            state.loading=true
            // state.success =false;

        },
        [signIn.fulfilled]:(state,action)=>{
            state.loading=false;
            state.success =true;

            state.userInfo = action.payload.responseData;
            state.authorization = action.payload.authorization; // update authorization value in the state
        },
        [signIn.rejected]:(state,action)=>{
            state.loading=true
            state.success =false;
            if (action.error.message === 'Request failed with status code 404') {
                console.error('Not found error');
                state.errorMessage = "Invalid username or password."
            } else if (action.error.code === 'ECONNABORTED') {
                console.error('Timeout error');
                state.errorMessage = "Request timeout. please check your network"
            } else {
                console.error(action.error);
                state.errorMessage = action.error

            }

        },
        [resetState.fulfilled]:(state,action)=>{
            state.userInfo={},
            state.loading=false,
            state.success=true,
            state.authorization= null
        },
    }

});

export default userSlice.reducer;
