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
  return (
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="eight wide column">{content}</div>
        <div className="eight wide right floated column">{content}</div>
      </div>
    </div>
  );
}

export default PostListComponent;
