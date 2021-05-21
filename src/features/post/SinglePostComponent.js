import React from "react";
import HugeHeaderComponent from "../shared/HugeHeaderComponent";
import { postSelector } from "./postSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeletePostComponent from "./DeletePostComponent";

function SinglePostComponent() {
  const { post } = useSelector(postSelector);

  return (
    <div className="ui">
      <HugeHeaderComponent>{post.title}</HugeHeaderComponent>
      <div className="ui divider"></div>
      <div>
        <DeletePostComponent id={post.id} />
        <button className="mini ui right floated button">
          <Link to={`/post/edit/${post.id}`}>
            <i className="edit icon"></i>
          </Link>
        </button>
      </div>
      <p>{post.body}</p>
    </div>
  );
}

export default SinglePostComponent;
