import React from "react";
import HorizontialDivider from "./../shared/HorizontialDivider";

function SinglePostComponent({ post }) {
  return (
    <div>
      <div className="ui vertical segment">
        <h1>{post.title}</h1>
        <div className="ui divider"></div>
        <div>
          <HorizontialDivider></HorizontialDivider>
        </div>
        <p>{post.body}</p>
      </div>
    </div>
  );
}

export default SinglePostComponent;
