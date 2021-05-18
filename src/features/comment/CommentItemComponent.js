import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "./commentSlice";

function CommentItemComponent({ comment }) {
  const [updatedComment, setUpdatedComment] = useState(comment);
  const [deleteStatus, setDeleteStatus] = useState("idle");
  const [updateStatus, setUpdateStatus] = useState("idle");

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const removeComment = (id) => {
    if (deleteStatus === "idle") {
      setDeleteStatus("pending");
      try {
        const result = dispatch(deleteComment(id));
        unwrapResult(result);
      } catch (error) {
        console.error("Failed to delete comment ", error);
      } finally {
        setDeleteStatus("idle");
      }
    }
  };

  const updateComment = () => {
    setIsEditing(true);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUpdatedComment({ ...updatedComment, [name]: value });
  };

  const saveComment = async (event) => {
    event.preventDefault();
    if (updateStatus === "idle") {
      setUpdateStatus("pending");
      try {
        const result = await dispatch(editComment(updatedComment));
        unwrapResult(result);
      } catch (error) {
        console.error("Failed to update comment ", error);
      } finally {
        setUpdateStatus("idle");
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="comment">
      <a className="avatar" href="https://picsum.photos/200">
        <img src="https://picsum.photos/200" alt="test" />
      </a>
      <div className="content">
        <a className="author" href="/">
          {comment.name}
        </a>
        <div className="metadata">
          <div className="date">1 day ago</div>
        </div>
        <div className="text">
          {isEditing ? (
            <form className="ui reply form">
              <div className="field">
                <textarea
                  name="body"
                  value={updatedComment.body}
                  onChange={handleOnChange}
                ></textarea>
              </div>
              <div
                className="ui blue labeled submit icon button"
                onClick={saveComment}
              >
                <i className="icon edit"></i> Save
              </div>
            </form>
          ) : (
            <p>{comment.body}</p>
          )}
        </div>
        {!isEditing ? (
          <div className="metadata right floated">
            <button
              className="mini ui button"
              onClick={() => removeComment(comment.id)}
            >
              <i className="trash alternate icon"></i>
            </button>
            <button className="mini ui button" onClick={updateComment}>
              <i className="edit icon"></i>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CommentItemComponent;
