import React, { useEffect, useState } from "react";
import CommentListComponent from "../comment/CommentListComponent";
import TagComponent from "../shared/TagComponent";
import SinglePostComponent from "./SinglePostComponent";
import AuthorShortBioComponent from "./AuthorShortBioComponent";
import axios from "axios";

function PostPageComponent({ match }) {
  const { id } = match.params;

  const initialState = { title: "", body: "" };
  const [post, setPost] = useState(initialState);

  const getPost = async (id) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(response.data);
    } catch (error) {
      throw Error(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getPost(id);
  }, [id]);

  return (
    <div className="ui text container">
      <SinglePostComponent post={post} />
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
