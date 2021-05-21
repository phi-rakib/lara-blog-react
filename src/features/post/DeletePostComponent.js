import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  postsSelector,
  resetPostsStatus,
} from "./postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router";

function DeletePostComponent({ id }) {
  const { status } = useSelector(postsSelector);
  const dispatch = useDispatch();

  const history = useHistory();

  const removePost = async (id) => {
    if (status === "idle" || status === "failed") {
      try {
        const result = await dispatch(deletePost(id));
        unwrapResult(result);
        dispatch(resetPostsStatus());
        history.push("/");
      } catch (error) {
        console.error("Failed to delete post ", error);
      }
    }
  };

  return (
    <button
      className="mini ui right floated button"
      onClick={() => removePost(id)}
    >
      <i className="trash alternate icon"></i>
    </button>
  );
}

export default DeletePostComponent;
