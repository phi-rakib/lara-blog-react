import React from "react";

function CommentItemComponent({ comment }) {
  return (
    <div className="comment">
      <a className="avatar" href="https://picsum.photos/200">
        <img src="https://picsum.photos/200" alt="test" />
      </a>
      <div className="content">
        <a className="author" href="/">{comment.name}</a>
        <div className="metadata">
          <div className="date">1 day ago</div>
        </div>
        <div className="text">
          <p>{comment.body}</p>
        </div>
      </div>
    </div>
  );
}

export default CommentItemComponent;
