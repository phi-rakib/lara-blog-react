import React from "react";
import { useHistory } from "react-router";
import ButtonComponent from "../shared/ButtonComponent";

function AddPostComponent() {
  const history = useHistory();

  const publishPost = (event) => {
    event.preventDefault();
    console.log("post published");
  };

  const cancelPost = (event) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <div className="ui text container">
      <form className="ui form">
        <div className="field">
          <label>Title</label>
          <input type="text" name="first-name" placeholder="First Name" />
        </div>
        <div className="field">
          <label>Description</label>
          <textarea></textarea>
        </div>
        <ButtonComponent handleButtonSubmit={publishPost} classes="positive">
          Publish
        </ButtonComponent>
        <ButtonComponent handleButtonSubmit={cancelPost}>
          Discard
        </ButtonComponent>
      </form>
    </div>
  );
}

export default AddPostComponent;
