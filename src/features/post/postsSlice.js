import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
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
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPostsStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.posts = payload;
      })
      .addCase(addNewPost.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.posts.unshift(payload);
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const { id, title, body } = payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.body = body;
        }
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        const index = state.posts.findIndex((post) => post.id === payload);
        if (index >= 0) state.posts.splice(index, 1);
      })
      .addMatcher(
        isAnyOf(
          fetchPosts.pending,
          addNewPost.pending,
          updatePost.pending,
          deletePost.pending
        ),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        isAnyOf(
          fetchPosts.rejected,
          addNewPost.rejected,
          updatePost.rejected,
          deletePost.rejected
        ),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export const postsSelector = (state) => state.posts;

export const { resetPostsStatus } = postsSlice.actions;

export default postsSlice.reducer;
