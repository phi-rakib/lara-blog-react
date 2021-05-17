import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ButtonComponent from "../shared/ButtonComponent";
import { useDispatch } from "react-redux";
import { updatePost } from "./postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import axios from "axios";

function EditPostComponent({ match }) {
  const { id } = match.params;

  const initialState = { title: "", body: "" };

  const [post, setPost] = useState(initialState);
  const [requestStatus, setStatus] = useState("idle");

  const dispatch = useDispatch();

  const history = useHistory();

  const getPost = async (id) => {
    console.log('get post');  
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(data);
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    console.log('use effect')
    getPost(id);
  }, [id]);

  const publishPost = async (event) => {
    event.preventDefault();
    if (requestStatus === "idle") {
      setStatus("pending");
      try {
        const result = await dispatch(updatePost(post));
        unwrapResult(result);
        history.push("/");
      } catch (error) {
        setStatus("idle");
        console.error("Failed to update post ", error);
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
          Update
        </ButtonComponent>
        <ButtonComponent handleButtonSubmit={cancelPost}>
          Discard
        </ButtonComponent>
      </form>
    </div>
  );
}

export default EditPostComponent;
