import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../config/baseApi";


let state_access_index = 0;
const COURSE_TAG_ID_MAP = {
  0: 'all',
  1: 'popular',
  2: 'new',
  3: 'free'
}

export const getAllCourse = createAsyncThunk(
  "getAllCourse",
  async (tag_id = 0, { getState, dispatch, rejectWithValue }) => {
    const CACHE_KEY_1 = "courses_all" + tag_id;
    state_access_index = tag_id;


    const { course } = getState(); // get the current course state
    const cachedCourses = course.cache[CACHE_KEY_1]; // check if courses are cached

    // If the courses are cached and haven't expired yet, return them
    if (cachedCourses && cachedCourses.expires > Date.now()) {
      // return cachedCourses.data;
    }

    try {
      const response = await baseURL.get(`courses?query=${COURSE_TAG_ID_MAP[tag_id]}`);
      const { data, headers } = response;

      const expires = Date.now() + 60 * 60 * 1000; // cache for 60 minutes
      const payload = { responseData: data, authorization: headers.authorization };
      // cache the courses
      const cacheData = { data: payload, expires };
      dispatch(setCache({ key: CACHE_KEY_1, value: cacheData }));

      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchCourse = createAsyncThunk(
  "searchCourse",
  async (key_word, { rejectWithValue }) => {

    try {
      const response = await baseURL.get(`courses/${key_word}/search`);
      const { data, headers } = response;
      const payload = { responseData: data, authorization: headers.authorization };


      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const resetState = createAsyncThunk("reset", async () => {
  return true;
});

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courseList: [0, 1, 2, 3, 4, 5, 6],
    loading: false,
    success: true,
    authorization: null, // add authorization property to the state
    cache: {}, // add cache property to the state
  },
  reducers: {
    setCache: (state, action) => {
      const { key, value } = action.payload;
      state.cache[key] = value;
    },
  },
  extraReducers: {
    [getAllCourse.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [getAllCourse.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.courseList[state_access_index] = action.payload.responseData;
      state.authorization = action.payload.authorization; // update authorization value in the state
    },
    [getAllCourse.rejected]: (state, action) => {
      state.loading = true;
      state.success = false;
    },

    [searchCourse.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [searchCourse.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.courseList[state_access_index] = action.payload.responseData;
      state.authorization = action.payload.authorization; // update authorization value in the state
    },
    [searchCourse.rejected]: (state, action) => {
      state.loading = true;
      state.success = false;
    },

    [resetState.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.authorization = null;
      state.cache = {}; // clear the cache
      state.courseList = [0, 1, 2, 3, 4, 5, 6];
    },
  },
});

export const { setCache } = courseSlice.actions;
export default courseSlice.reducer;
