import { configureStore } from "@reduxjs/toolkit";
import userSlice from './reducers/authReducer'
import courseSlice from "./reducers/courseSlice";
import myCourseSlice from "./reducers/myCourseSlice";
export default configureStore ({
    reducer:{
        user:userSlice,
        course:courseSlice,
        mycourse:myCourseSlice
    }
})