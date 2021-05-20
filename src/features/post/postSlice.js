import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../services/api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await apiClient.get("/posts");
    const { data } = response.data;
    return data;
  } catch (error) {
    throw Error(error);
  }
});

export const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw Error(error);
  }
});

export const addNewPost = createAsyncThunk("post/addNewPost", async (post) => {
  try {
    const response = await apiClient.post("/posts", post);
    const { data } = response.data;
    return data;
  } catch (error) {
    throw Error(error);
  }
});

export const updatePost = createAsyncThunk("post/updatePost", async (post) => {
  try {
    await apiClient.put(`/posts/${post.id}`, post);
    return post;
  } catch (error) {
    throw Error(error);
  }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    await apiClient.delete(`/posts/${id}`);
    return id;
  } catch (error) {
    throw Error(error);
  }
});

const initialState = {
  posts: [],
  post: {
    data: {},
    status: "idle",
    error: null,
    updateStatus: "idle",
    addStatus: "idle",
  },
  status: "idle",
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postReset: (state) => {
      state.post.data = {};
      state.post.status = "idle";
      state.post.error = null;
      state.post.updateStatus = "idle";
      state.post.addStatus = "idle";
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
      state.status = "idle";
      state.error = action.error.message;
    },
    [fetchPost.pending]: (state) => {
      state.post.status = "pending";
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.post.status = "succeeded";
      state.post.data = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.post.status = "failed";
      state.post.error = action.error.message;
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.post.addStatus = "succeeded";
      state.posts.unshift(action.payload);
    },
    [addNewPost.pending]: (state) => {
      state.post.addStatus = "pending";
    },
    [addNewPost.rejected]: (state) => {
      state.post.addStatus = "failed";
    },
    [updatePost.pending]: (state) => {
      state.post.updateStatus = "pending";
    },
    [updatePost.rejected]: (state) => {
      state.post.updateStatus = "failed";
    },
    [updatePost.fulfilled]: (state, action) => {
      state.post.updateStatus = "succeeded";
      const { id, title, body } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    [deletePost.fulfilled]: (state, action) => {
      const index = state.posts.findIndex((post) => post.id === action.payload);
      if (index >= 0) state.posts.splice(index, 1);
    },
  },
});

export const postStatus = (state) => state.posts.post.status;
export const postUpdateStatus = (state) => state.posts.post.updateStatus;
export const postAddStatus = (state) => state.posts.post.addStatus;
export const postData = (state) => state.posts.post.data;

export const getAllposts = (state) => state.posts.posts;
export const allPostsStatus = (state) => state.posts.status;

export const { postReset } = postSlice.actions;

export default postSlice.reducer;
