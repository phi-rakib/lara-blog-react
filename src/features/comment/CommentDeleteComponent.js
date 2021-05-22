import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import MessageComponent from "../shared/MessageComponent";

function CommentDeleteComponent({ comment }) {
  const currentUser = JSON.parse(localStorage.getItem("user"))?.data;

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const removeComment = async (id) => {
    try {
      const result = await dispatch(deleteComment(id));
      unwrapResult(result);
    } catch (error) {
      setError(error.message);
      console.error("Failed to delete comment ", error);
    }
  };

  return (
    <>
      {error ? (
        <MessageComponent
          title="Failed to delete comment"
          classes="negative"
          error={error}
        />
      ) : null}
      {currentUser && comment.user_id === currentUser.id ? (
        <div className="metadata right floated">
          <button
            className="mini ui button"
            onClick={() => removeComment(comment.id)}
          >
            <i className="trash alternate icon"></i>
          </button>
        </div>
      ) : null}
    </>
  );
}

export default CommentDeleteComponent;
