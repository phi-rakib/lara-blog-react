import React from "react";
import CommentDeleteComponent from "./CommentDeleteComponent";
import CommentUpdateComponent from "./CommentUpdateComponent";

function CommentItemComponent({ comment }) {
  return (
    <div className="comment">
      <a className="avatar" href="https://picsum.photos/200">
        <img src="https://picsum.photos/200" alt="test" />
      </a>
      <div className="content">
        <a className="author" href="/">
          {comment.user.name}
        </a>
        <div className="metadata">
          <div className="date">{comment.created_at}</div>
        </div>
        <CommentUpdateComponent comment={comment} />
        <CommentDeleteComponent comment={comment} />
      </div>
    </div>
  );
}

export default CommentItemComponent;
