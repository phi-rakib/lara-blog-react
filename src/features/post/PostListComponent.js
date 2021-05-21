import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItemComponent from "./PostItemComponent";
import { fetchPosts, postsSelector, resetPostsStatus } from "./postsSlice";
import LoaderComponent from "./../shared/LoaderComponent";
import MessageComponent from "../shared/MessageComponent";

function PostListComponent() {
  const { posts, status, error } = useSelector(postsSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0 && status === "idle") {
      const getPosts = async () => {
        try {
          const result = await dispatch(fetchPosts());
          unwrapResult(result);
          dispatch(resetPostsStatus());
        } catch (error) {
          console.error("Failed to fetch posts ", error);
        }
      };
      getPosts();
    }
  }, [dispatch, status, posts]);

  const renderPosts = () => {
    if (status === "loading") return <LoaderComponent />;
    if (status === "failed") {
      const title = "Unable to display posts";
      const classes = "negative";
      const props = {
        title,
        error,
        classes,
      };
      return <MessageComponent {...props} />;
    }

    return posts.map((post) => <PostItemComponent post={post} key={post.id} />);
  };

  return (
    <div className="ui middle aligned stackable grid container">
      <div className="row">
        <div className="eight wide column">{renderPosts()}</div>
        <div className="eight wide right floated column">{renderPosts()}</div>
      </div>
    </div>
  );
}

export default PostListComponent;
