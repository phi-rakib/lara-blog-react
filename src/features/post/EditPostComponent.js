import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ButtonComponent from "../shared/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  postReset,
  postUpdateStatus,
  updatePost,
} from "./postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import LoaderComponent from "../shared/LoaderComponent";

function EditPostComponent({ match }) {
  const { id } = match.params;

  const initialState = { title: "", body: "" };

  const [post, setPost] = useState(initialState);

  const updateStatus = useSelector(postUpdateStatus);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    console.count();
    const getPost = async (id) => {
      try {
        const result = await dispatch(fetchPost(id));
        const fetchedPost = unwrapResult(result);
        setPost(fetchedPost);
      } catch (error) {
        throw Error(error);
      }
    };
    getPost(id);

    return () => {
      dispatch(postReset());
    };
  }, [dispatch, id]);

  const publishPost = async (event) => {
    event.preventDefault();
    if (updateStatus === "idle" || updateStatus === "failed") {
      try {
        const result = await dispatch(updatePost(post));
        unwrapResult(result);
        history.push("/");
      } catch (error) {
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

  const renderPost = () => {
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
  };

  return (
    <>
      {updateStatus === "pending" ? <LoaderComponent /> : null}
      {renderPost()}
    </>
  );
}

export default EditPostComponent;
