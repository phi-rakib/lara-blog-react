import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, postDeleteStatus, postReset } from "./postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router";

function DeletePostComponent({ id }) {
  const deleteStatus = useSelector(postDeleteStatus);
  const dispatch = useDispatch();

  const history = useHistory();

  const removePost = async (id) => {
    if (deleteStatus === "idle" || deleteStatus === "failed") {
      try {
        const result = await dispatch(deletePost(id));
        unwrapResult(result);
        dispatch(postReset());
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
