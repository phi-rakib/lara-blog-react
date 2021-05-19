import React, { useState } from "react";
import HugeHeaderComponent from "../shared/HugeHeaderComponent";
import { deletePost, postData } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { unwrapResult } from "@reduxjs/toolkit";
import LoaderComponent from "./../shared/LoaderComponent";
import { Link } from "react-router-dom";

function SinglePostComponent() {
  const post = useSelector(postData);

  const dispatch = useDispatch();
  
  const history = useHistory();

  const [deleteStatus, setDeleteStatus] = useState("idle");

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
    <div className="ui">
      {deleteStatus === "pending" ? <LoaderComponent /> : ""}
      <HugeHeaderComponent>{post.title}</HugeHeaderComponent>
      <div className="ui divider"></div>
      <div>
        <button
          className="mini ui right floated button"
          onClick={() => removePost(post.id)}
        >
          <i className="trash alternate icon"></i>
        </button>
        <button className="mini ui right floated button">
          <Link to={`/post/edit/${post.id}`}>
            <i className="edit icon"></i>
          </Link>
        </button>
      </div>
      <p>{post.body}</p>
    </div>
  );
}

export default SinglePostComponent;
