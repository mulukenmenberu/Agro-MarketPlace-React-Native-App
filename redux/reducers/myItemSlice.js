import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../config/baseApi";



export const enrollItem = createAsyncThunk( "enrollItem", async (data) => {
    const enrolment = data
    try {
      const response = await baseURL.post('Items-takens', enrolment);
      const { data, headers } = response;
      const payload = { responseData: data, authorization: headers.authorization };
      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
  
);

export const getMyItems = createAsyncThunk( "getMyItems", async (student_id) => {
  const enrolment_id = student_id
  try {
    const response = await baseURL.get(`students/${enrolment_id}/Items`);
    const { data, headers } = response;
    const payload = { responseData: data, authorization: headers.authorization };
    return payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

);

export const getItemsProgress = createAsyncThunk( "getItemsProgress", async (student_id) => {
  const enrolment_id = student_id
  
  try {
    const response = await baseURL.get(`students/${enrolment_id}/Items`);
    const { data, headers } = response;
    const payload = { responseData: data.student_detail[0].Items, authorization: headers.authorization };
  
    return payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

);
export const getSingleItemDetail = createAsyncThunk( "getSingleItemDetail", async ({student_id, Item_id}) => {
  try {
    const response = await baseURL.get(`students/${student_id}/Items/${Item_id}/contents`);
    const { data, headers } = response;
    const payload = { responseData: data.students[0].Items, authorization: headers.authorization };
    return payload;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
}

);
export const resetState = createAsyncThunk("reset", async () => {
  return true;
});
const myItemSlice = createSlice({
  name: "myItem",
  initialState: {
    ItemList: [],
    progressItemList: [],
    loading: false,
    has_enrolled: false,
    authorization: null, 
  },
  reducers: {},
  extraReducers: {

    // Enroll to Items
    [enrollItem.pending]: (state, action) => {
      // state.loading = true;
      state.has_enrolled = false;
    },
    [enrollItem.fulfilled]: (state, action) => {
      // state.loading = false;
      state.has_enrolled = true;
      state.ItemList= action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [enrollItem.rejected]: (state, action) => {
      // state.loading = false;
      state.has_enrolled = false;
    },

    /// Fetch my Items
    [getMyItems.pending]: (state, action) => {
      state.loading = true;
      state.has_enrolled = false;
    },
    [getMyItems.fulfilled]: (state, action) => {
      state.loading = false;
      state.ItemList= action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [getMyItems.rejected]: (state, action) => {
      state.loading = false;
      state.has_enrolled = false;
    },
    /// Fetch my Items
    [getItemsProgress.pending]: (state, action) => {
      state.loading = true;
      state.has_enrolled = false;
    },
    [getItemsProgress.fulfilled]: (state, action) => {
      state.loading = false;
      state.progressItemList = action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [getItemsProgress.rejected]: (state, action) => {
      state.loading = false;
      state.has_enrolled = false;
    },

    /// Fetch single couse
    [getSingleItemDetail.pending]: (state, action) => {
      state.loading = true;
      state.has_enrolled = false;
    },
    [getSingleItemDetail.fulfilled]: (state, action) => {
      state.loading = false;
      state.ItemList= action.payload.responseData;
      state.authorization = action.payload.authorization; 
    },
    [getSingleItemDetail.rejected]: (state, action) => {
      state.loading = false;
      state.has_enrolled = false;
    },

    [resetState.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.authorization = null;
      state.ItemList = [];
    },
  },
});


export default myItemSlice.reducer;
