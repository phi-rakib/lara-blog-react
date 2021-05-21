import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

export const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw Error(error);
  }
});

const initialState = {
  post: {},
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postReset: (state) => {
      state.post = {};
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [fetchPost.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.post = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const postSelector = (state) => state.post;

export const { postReset } = postSlice.actions;

export default postSlice.reducer;
