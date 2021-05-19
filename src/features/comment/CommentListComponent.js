import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../post/postSlice";
import LoaderComponent from "../shared/LoaderComponent";
import AddCommentComponent from "./AddCommentComponent";
import CommentItemComponent from "./CommentItemComponent";
import {
  fetchComments,
  getAllComments,
  getLoadingStatus,
  commentReset,
} from "./commentSlice";

function CommentListComponent() {
  const comments = useSelector(getAllComments);
  const loading = useSelector(getLoadingStatus);
  const id = useSelector(postData).id;

  const dispatch = useDispatch();

  useEffect(() => {
    const getComments = async () => {
      try {
        const result = await dispatch(fetchComments(id));
        unwrapResult(result);
      } catch (error) {
        console.error("Failed to load comments ", error);
      }
    };

    if(id) getComments();

    return () => {
      dispatch(commentReset());
    };
  }, [dispatch, id]);

  let content = comments.map((comment) => (
    <CommentItemComponent comment={comment} key={comment.id} />
  ));

  return (
    <div className="ui small comments">
      <h3 className="ui dividing header">Comments</h3>
      {loading ? <LoaderComponent /> : content}
      <AddCommentComponent />
    </div>
  );
}

export default CommentListComponent;
