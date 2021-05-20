import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from "react-router";

function DeletePostComponent({id}) {
  const [deleteStatus, setDeleteStatus] = useState("idle");
  const dispatch = useDispatch();

  const history = useHistory();

  const removePost = async (id) => {
    if (deleteStatus === "idle") {
      setDeleteStatus("pending");
      try {
        const result = await dispatch(deletePost(id));
        unwrapResult(result);
        history.push("/");
      } catch (error) {
        setDeleteStatus("idle");
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
