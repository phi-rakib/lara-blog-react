import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice";
import commentReducer from "../features/comment/commentSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    comments: commentReducer,
  },
});

export default store;
