import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentListComponent from "../comment/CommentListComponent";
import HorizontialDivider from "../shared/HorizontialDivider";
import { fetchPost } from "./postSlice";
import SinglePostComponent from "./SinglePostComponent";

function PostPageComponent({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();

  const selectedPost = useSelector((state) => state.posts.post);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  return (
    <div>
      <SinglePostComponent post={selectedPost} />
      <HorizontialDivider>Comments</HorizontialDivider>
      <CommentListComponent id={id} />
    </div>
  );
}

export default PostPageComponent;
