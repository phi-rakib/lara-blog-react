import React, { useState } from "react";
import { useHistory } from "react-router";
import ButtonComponent from "../shared/ButtonComponent";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postSlice";
import { unwrapResult } from "@reduxjs/toolkit";

function AddPostComponent() {
  const [post, setPost] = useState({ title: "", body: "" });
  const [requestStatus, setStatus] = useState("idle");

  const dispatch = useDispatch();

  const history = useHistory();

  const publishPost = async (event) => {
    event.preventDefault();
    if (requestStatus === "idle") {
      setStatus("pending");
      try {
        const result = await dispatch(addNewPost(post));
        unwrapResult(result);
        history.push("/");
      } catch (error) {
        console.error("Failed to add post ", error);
      } finally {
        setStatus("idle");
      }
    }
  };

  const cancelPost = (event) => {
    event.preventDefault();
    history.push("/");
  };

  const handleOnChange = (event) => {
    const {
      target: { name, value },
    } = event;
    console.log(name, value);
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
          <textarea onChange={handleOnChange} value={post.body} name="body"></textarea>
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
