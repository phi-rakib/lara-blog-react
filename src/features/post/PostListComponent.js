import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItemComponent from "./PostItemComponent";
import { allPostsStatus, fetchPosts, getAllposts } from "./postSlice";

function PostListComponent() {
  const posts = useSelector(getAllposts);
  const postStatus = useSelector(allPostsStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postStatus === "idle") {
      const getPosts = async () => {
        try {
          const result = await dispatch(fetchPosts());
          unwrapResult(result);
        } catch (error) {
          console.error("Failed to fetch posts ", error);
        }
      };
      getPosts();
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
