import React from "react";
import { Link } from "react-router-dom";

function PostItemComponent({ post }) {
  return (
    <div className="ui vertical segment">
      <h1>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </h1>
      <p>{post.body.substr(0, 20)}...</p>
    </div>
  );
}

export default PostItemComponent;
