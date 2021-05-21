import React, { useEffect } from "react";
import CommentListComponent from "../comment/CommentListComponent";
import TagComponent from "../shared/TagComponent";
import SinglePostComponent from "./SinglePostComponent";
import AuthorShortBioComponent from "./AuthorShortBioComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, postReset, postSelector } from "./postSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import LoaderComponent from "./../shared/LoaderComponent";

function PostPageComponent({ match }) {
  const dispatch = useDispatch();

  const { status } = useSelector(postSelector);

  const { id } = match.params;

  useEffect(() => {
    window.scrollTo(0, 0);

    const getPost = async (id) => {
      try {
        const result = await dispatch(fetchPost(id));
        unwrapResult(result);
      } catch (error) {
        console.error("Failed to fetch post ", error);
      }
    };

    getPost(id);

    return () => {
      dispatch(postReset());
    };
  }, [id, dispatch]);

  return (
    <div className="ui text container">
      {status === "succeeded" ? <SinglePostComponent /> : <LoaderComponent />}
      <div className="ui basic segment">
        <TagComponent>HTML</TagComponent>
        <TagComponent>CSS</TagComponent>
        <TagComponent>JavaScript</TagComponent>
      </div>
      <div className="ui segment">
        <AuthorShortBioComponent />
      </div>
      <CommentListComponent />
    </div>
  );
}

export default PostPageComponent;
