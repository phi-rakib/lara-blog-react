import React from "react";
import { Link } from "react-router-dom";

function PostItemComponent({ post }) {
  return (
    <>
      <h3 className="ui header">
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h3>
      <p>{post.body}...</p>
    </>
  );
}

export default PostItemComponent;
