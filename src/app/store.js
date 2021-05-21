import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/post/postsSlice";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";
import authReducer from "../features/auth/authSlice";

const reducer = {
  posts: postsReducer,
  post: postReducer,
  comments: commentReducer,
  auth: authReducer,
};
const preloadedState = {};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
});

export default store;
