import React from "react";
import HugeHeaderComponent from "../shared/HugeHeaderComponent";

function SinglePostComponent({ post }) {
  return (
    <div className="ui">
      <HugeHeaderComponent>{post.title}</HugeHeaderComponent>
      <div className="ui divider"></div>
      <p>{post.body}</p>
    </div>
  );
}

export default SinglePostComponent;
