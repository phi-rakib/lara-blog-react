import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ButtonComponent from "../shared/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, postsSelector, resetPostsStatus } from "./postsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function AddPostComponent() {
  const [post, setPost] = useState({ title: "", body: "" });
  const { status } = useSelector(postsSelector);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    return () => {
      dispatch(resetPostsStatus());
    };
  }, [dispatch]);

  const publishPost = async (event) => {
    event.preventDefault();
    if (status === "idle" || status === "failed") {
      try {
        const result = await dispatch(addNewPost(post));
        unwrapResult(result);
        history.push("/");
      } catch (error) {
        console.error("Failed to add post ", error);
      }
    }
  };

  const cancelPost = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div className="ui text container">
      <form className="ui form">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            value={post.title}
            name="title"
            placeholder="First Name"
            onChange={handleOnChange}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea
            onChange={handleOnChange}
            value={post.body}
            name="body"
          ></textarea>
        </div>
        <ButtonComponent handleButtonSubmit={publishPost} classes="positive">
          Publish
        </ButtonComponent>
        <ButtonComponent handleButtonSubmit={cancelPost}>
          Discard
        </ButtonComponent>
      </form>
    </div>
  );
}

export default AddPostComponent;
