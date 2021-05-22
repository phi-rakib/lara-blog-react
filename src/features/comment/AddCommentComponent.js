import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSelector } from "../post/postSlice";
import MessageComponent from "../shared/MessageComponent";
import CommentFormComponent from "./CommentFormComponent";
import { addNewComment } from "./commentSlice";

function AddCommentComponent() {
  const initialState = { body: "" };
  const [comment, setComment] = useState(initialState);
  
  const [error, setError] = useState("");

  const { post } = useSelector(postSelector);

  const dispatch = useDispatch();

  const saveComment = async (event) => {
    event.preventDefault();
    try {
      comment.postId = post.id;
      const result = await dispatch(addNewComment(comment));
      unwrapResult(result);
      setComment(initialState);
    } catch (error) {
      console.error("Failed to add comment ", error);
      setError(error.message);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  const commentProps = { handleOnChange, handleOnSubmit: saveComment, comment };

  return (
    <>
      {error ? (
        <MessageComponent
          title="Unable to Add comments"
          classes="negative"
          error={error}
        />
      ) : null}
      {<CommentFormComponent {...commentProps} />}
    </>
  );
}

export default AddCommentComponent;
