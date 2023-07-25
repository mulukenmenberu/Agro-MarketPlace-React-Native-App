import { configureStore } from "@reduxjs/toolkit";
import userSlice from './reducers/authReducer'
import ItemSlice from "./reducers/ItemSlice";
import myItemSlice from "./reducers/myItemSlice";
export default configureStore ({
    reducer:{
        user:userSlice,
        Items:ItemSlice,
        myItem:myItemSlice
    }
})