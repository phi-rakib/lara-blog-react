import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

const initialState = {
  posts: [],
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
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const { postReset } = postSlice.actions;

export default postSlice.reducer;
