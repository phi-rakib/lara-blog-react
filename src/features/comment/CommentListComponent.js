import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentItemComponent from "./CommentItemComponent";
import { fetchComments, getAllComments, getLoadingStatus } from "./commentSlice";

function CommentListComponent({ id }) {
  const comments = useSelector(getAllComments);
  const loading = useSelector(getLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);

  let content = comments.map((comment) => (
    <CommentItemComponent comment={comment} key={comment.id} />
  ));

  return (
    <div className="ui comments">
      {loading ? (
        <div className="ui active centered inline loader"></div>
      ) : (
        content
      )}
      <form className="ui reply form">
        <div className="field">
          <textarea></textarea>
        </div>
        <div className="ui primary submit labeled icon button">
          <i className="icon edit"></i> Add Comment
        </div>
      </form>
    </div>
  );
}

export default CommentListComponent;
