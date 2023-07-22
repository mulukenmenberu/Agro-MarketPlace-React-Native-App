import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../config/baseApi";



export const enrollCourse = createAsyncThunk( "enrollCourse", async (data) => {
    const enrolment = data
    try {
      const response = await baseURL.post('course-takens', enrolment);
      const { data, headers } = response;
      const payload = { responseData: data, authorization: headers.authorization };
      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  
);

export const getMyCourses = createAsyncThunk( "getMyCourses", async (student_id) => {
  const enrolment_id = student_id
  try {
    const response = await baseURL.get(`students/${enrolment_id}/courses`);
    const { data, headers } = response;
    const payload = { responseData: data, authorization: headers.authorization };
    return payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

);

export const getCoursesProgress = createAsyncThunk( "getCoursesProgress", async (student_id) => {
  const enrolment_id = student_id
  
  try {
    const response = await baseURL.get(`students/${enrolment_id}/courses`);
    const { data, headers } = response;
    const payload = { responseData: data.student_detail[0].courses, authorization: headers.authorization };
  
    return payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

);
export const getSingleCourseDetail = createAsyncThunk( "getSingleCourseDetail", async ({student_id, course_id}) => {
  try {
    const response = await baseURL.get(`students/${student_id}/courses/${course_id}/contents`);
    const { data, headers } = response;
    const payload = { responseData: data.students[0].courses, authorization: headers.authorization };
    return payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

);
export const resetState = createAsyncThunk("reset", async () => {
  return true;
});
const myCourseSlice = createSlice({
  name: "mycourse",
  initialState: {
    courseList: [],
    progressCourseList: [],
    loading: false,
    has_enrolled: false,
    authorization: null, 
  },
  reducers: {},
  extraReducers: {

    // Enroll to course
    [enrollCourse.pending]: (state, action) => {
      // state.loading = true;
      state.has_enrolled = false;
    },
    [enrollCourse.fulfilled]: (state, action) => {
      // state.loading = false;
      state.has_enrolled = true;
      state.courseList= action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [enrollCourse.rejected]: (state, action) => {
      // state.loading = false;
      state.has_enrolled = false;
    },

    /// Fetch my courses
    [getMyCourses.pending]: (state, action) => {
      state.loading = true;
      state.has_enrolled = false;
    },
    [getMyCourses.fulfilled]: (state, action) => {
      state.loading = false;
      state.courseList= action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [getMyCourses.rejected]: (state, action) => {
      state.loading = false;
      state.has_enrolled = false;
    },
    /// Fetch my courses
    [getCoursesProgress.pending]: (state, action) => {
      state.loading = true;
      state.has_enrolled = false;
    },
    [getCoursesProgress.fulfilled]: (state, action) => {
      state.loading = false;
      state.progressCourseList = action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [getCoursesProgress.rejected]: (state, action) => {
      state.loading = false;
      state.has_enrolled = false;
    },

    /// Fetch single couse
    [getSingleCourseDetail.pending]: (state, action) => {
      state.loading = true;
      state.has_enrolled = false;
    },
    [getSingleCourseDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.courseList= action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [getSingleCourseDetail.rejected]: (state, action) => {
      state.loading = false;
      state.has_enrolled = false;
    },

    [resetState.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.authorization = null;
      state.courseList = [];
    },
  },
});


export default myCourseSlice.reducer;
