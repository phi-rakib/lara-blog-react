import React from "react";
import { Link } from "react-router-dom";

function PostItemComponent({ post }) {
  return (
    <>
      <h3 className="ui header">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <button className="mini ui right floated button">
        <Link to={`/post/edit/${post.id}`}>Edit</Link>
      </button>
      <p>{post.body}...</p>
    </>
  );
}

export default PostItemComponent;
