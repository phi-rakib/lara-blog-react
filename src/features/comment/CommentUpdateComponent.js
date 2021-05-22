import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MessageComponent from "../shared/MessageComponent";
import CommentFormComponent from "./CommentFormComponent";
import { editComment } from "./commentSlice";

function CommentUpdateComponent({ comment }) {
  const currentUser = JSON.parse(localStorage.getItem("user"))?.data;

  const [updatedComment, setUpdatedComment] = useState(comment);

  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUpdatedComment({ ...updatedComment, [name]: value });
  };

  const updateComment = async (event) => {
    event.preventDefault();
    try {
      const result = await dispatch(editComment(updatedComment));
      unwrapResult(result);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
      console.error("Failed to update comment ", error);
    }
  };

  return (
    <>
      {error ? (
        <MessageComponent
          title="Failed to update comment"
          classes="negative"
          error={error}
        />
      ) : null}
      <div className="text">
        {isEditing ? (
          <CommentFormComponent
            handleOnChange={handleOnChange}
            handleOnSubmit={updateComment}
            comment={updatedComment}
          />
        ) : (
          <p>{updatedComment.body}</p>
        )}
      </div>
      {!isEditing &&
      currentUser &&
      updatedComment.user_id === currentUser.id ? (
        <div className="metadata right floated">
          <button className="mini ui button" onClick={() => setIsEditing(true)}>
            <i className="edit icon"></i>
          </button>
        </div>
      ) : null}
    </>
  );
}

export default CommentUpdateComponent;