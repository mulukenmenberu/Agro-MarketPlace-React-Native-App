import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../config/baseApi";


let state_access_index = 0;
const ITEM_TAG_ID_MAP = {
  0: 'all',
  1: 'popular',
  2: 'new',
  3: 'free'
}

export const getAllItem = createAsyncThunk(
  "getAllItem",
  async (tag_id = 0, { getState, dispatch, rejectWithValue }) => {
    const CACHE_KEY_1 = "Items_all" + tag_id;
    state_access_index = tag_id;


    const { Items } = getState(); // get the current Items state
    const cachedItems = Items.cache[CACHE_KEY_1]; // check if Items are cached

    // If the Items are cached and haven't expired yet, return them
    if (cachedItems && cachedItems.expires > Date.now()) {
      // return cachedItems.data;
    }

    try {
      const response = await baseURL.get(`Items?query=${ITEM_TAG_ID_MAP[tag_id]}`);
      const { data, headers } = response;

      const expires = Date.now() + 60 * 60 * 1000; // cache for 60 minutes
      const payload = { responseData: data, authorization: headers.authorization };
      // cache the Items
      const cacheData = { data: payload, expires };
      dispatch(setCache({ key: CACHE_KEY_1, value: cacheData }));

      return payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchItem = createAsyncThunk(
  "searchItem",
  async (key_word, { rejectWithValue }) => {

    try {
      const response = await baseURL.get(`Items/${key_word}/search`);
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

const ItemSlice = createSlice({
  name: "Items",
  initialState: {
    ItemList: [0, 1, 2, 3, 4, 5, 6],
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
    [getAllItem.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [getAllItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.ItemList[state_access_index] = action.payload.responseData;
      state.authorization = action.payload.authorization; // update authorization value in the state
    },
    [getAllItem.rejected]: (state, action) => {
      state.loading = true;
      state.success = false;
    },

    [searchItem.pending]: (state, action) => {
      state.loading = true;
      state.success = false;
    },
    [searchItem.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.ItemList[state_access_index] = action.payload.responseData;
      state.authorization = action.payload.authorization; // update authorization value in the state
    },
    [searchItem.rejected]: (state, action) => {
      state.loading = true;
      state.success = false;
    },

    [resetState.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.authorization = null;
      state.cache = {}; // clear the cache
      state.ItemList = [0, 1, 2, 3, 4, 5, 6];
    },
  },
});

export const { setCache } = ItemSlice.actions;
export default ItemSlice.reducer;
