import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSelector } from "../post/postSlice";
import LoaderComponent from "../shared/LoaderComponent";
import AddCommentComponent from "./AddCommentComponent";
import CommentItemComponent from "./CommentItemComponent";
import { fetchComments, commentReset, commentsSelector } from "./commentSlice";

function CommentListComponent() {
  const { comments, status } = useSelector(commentsSelector);
  const { post } = useSelector(postSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        const result = await dispatch(fetchComments(post.id));
        unwrapResult(result);
      } catch (error) {
        console.error("Failed to load comments ", error);
      }
    };

    if (post.id) getComments();

    return () => {
      dispatch(commentReset());
    };
  }, [dispatch, post]);

  const renderComments = comments.map((comment) => (
    <CommentItemComponent comment={comment} key={comment.id} />
  ));

  return (
    <div className="ui small comments">
      <h3 className="ui dividing header">Comments</h3>
      {status === "loading" ? <LoaderComponent /> : renderComments}
      <AddCommentComponent />
    </div>
  );
}

export default CommentListComponent;
