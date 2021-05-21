import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSelector } from "../post/postSlice";
import { addNewComment } from "./commentSlice";

function AddCommentComponent() {
  const initialState = { body: "" };

  const [comment, setComment] = useState(initialState);
  const [commmentStatus, setCommentStatus] = useState("idle");

  const { post } = useSelector(postSelector);

  const dispatch = useDispatch();

  const saveComment = async (event) => {
    event.preventDefault();
    if (commmentStatus === "idle") {
      setCommentStatus("pending");
      try {
        comment.postId = post.id;
        const result = await dispatch(addNewComment(comment));
        unwrapResult(result);
      } catch (error) {
        console.error("Failed to add comment ", error);
      } finally {
        setCommentStatus("idle");
        setComment(initialState);
      }
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setComment({ ...comment, [name]: value });
  };

  return (
    <form className="ui reply form">
      <div className="field">
        <textarea
          name="body"
          value={comment.body}
          onChange={handleOnChange}
        ></textarea>
      </div>
      <div className="ui blue labeled submit icon button" onClick={saveComment}>
        <i className="icon edit"></i> Add Reply
      </div>
    </form>
  );
}

export default AddCommentComponent;
