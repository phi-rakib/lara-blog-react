import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderComponent from "../shared/LoaderComponent";
import AddCommentComponent from "./AddCommentComponent";
import CommentItemComponent from "./CommentItemComponent";
import {
  fetchComments,
  getAllComments,
  getLoadingStatus,
  commentReset,
} from "./commentSlice";

function CommentListComponent({ id }) {
  const comments = useSelector(getAllComments);
  const loading = useSelector(getLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(id));

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
