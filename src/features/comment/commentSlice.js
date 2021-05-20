import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../services/api";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId) => {
    try {
      const response = await apiClient.get(`/posts/${postId}/comments`);
      const { data } = response.data;
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const addNewComment = createAsyncThunk(
  "comment/addNewComment",
  async (comment) => {
    try {
      const response = await apiClient.post(
        `/posts/${comment.postId}/comments`,
        comment
      );
      const { data } = response.data;
      return data;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const editComment = createAsyncThunk(
  "comment/editComment",
  async (comment) => {
    try {
      await axios.put(`/comments/${comment.id}`, comment);
      return comment;
    } catch (error) {
      throw Error(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id) => {
    try {
      await axios.delete(`/comments/${id}`);
      return id;
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
      state.comments = [];
      state.error = null;
      state.loading = false;
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
      state.comments = [];
    },
    [addNewComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload);
    },
    [editComment.fulfilled]: (state, action) => {
      const { id, body } = action.payload;
      const existingComment = state.comments.find(
        (comment) => comment.id === id
      );
      if (existingComment) {
        existingComment.body = body;
      }
    },
    [deleteComment.fulfilled]: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload
      );
      state.comments.splice(index, 1);
    },
  },
});

export const getAllComments = (state) => state.comments.comments;

export const getLoadingStatus = (state) => state.comments.loading;

export const { commentReset } = commentSlice.actions;

export default commentSlice.reducer;
