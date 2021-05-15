import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItemComponent from "./PostItemComponent";
import { fetchPosts } from "./postSlice";

function PostListComponent() {
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, postStatus]);

  let content = posts.map((post) => (
    <PostItemComponent post={post} key={post.id} />
  ));
  return <>{content}</>;
}

export default PostListComponent;
