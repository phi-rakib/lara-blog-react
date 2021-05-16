import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentListComponent from "../comment/CommentListComponent";
import TagComponent from "../shared/TagComponent";
import { fetchPost, postReset } from "./postSlice";
import SinglePostComponent from "./SinglePostComponent";
import AuthorShortBioComponent from "./AuthorShortBioComponent";

function PostPageComponent({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();

  const selectedPost = useSelector((state) => state.posts.post);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchPost(id));

    return () => {
      dispatch(postReset());
    };
  }, [dispatch, id]);

  return (
    <div className="ui text container">
      <SinglePostComponent post={selectedPost} />
      <div className="ui basic segment">
        <TagComponent>HTML</TagComponent>
        <TagComponent>CSS</TagComponent>
        <TagComponent>JavaScript</TagComponent>
      </div>
      <div className="ui segment">
        <AuthorShortBioComponent />
      </div>
      <CommentListComponent id={id} />
    </div>
  );
}

export default PostPageComponent;
