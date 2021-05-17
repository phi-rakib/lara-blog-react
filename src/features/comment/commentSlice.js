import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const addNewComment = createAsyncThunk(
  "comment/addNewComment",
  async (comment) => {
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/posts/${comment.postId}/comments`,
        comment
      );
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
);

const initialState = {
  comments: [],
  error: null,
  loading: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    commentReset: (state) => {
      state = initialState;
    },
  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [fetchComments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addNewComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
    }
  },
});

export const getAllComments = (state) => state.comments.comments;

export const getLoadingStatus = (state) => state.comments.loading;

export const { commentReset } = commentSlice.actions;

export default commentSlice.reducer;
