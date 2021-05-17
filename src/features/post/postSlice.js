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

export const addNewPost = createAsyncThunk("post/addNewPost", async (post) => {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      post
    );
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const updatePost = createAsyncThunk("post/updatePost", async (post) => {
  try {
    await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      post
    );
    return post;
  } catch (error) {
    throw Error(error);
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
  } catch (error) {
    throw Error(error);
  }
});

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
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
    [addNewPost.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload);
    },
    [updatePost.fulfilled]: (state, action) => {
      const { id, title, body } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    [deletePost.fulfilled]: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload);
      if(index >= 0)  state.posts.splice(index, 1);
    },
  },
});

export default postSlice.reducer;
