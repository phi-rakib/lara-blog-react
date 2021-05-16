import React from "react";

function AddCommentComponent() {
  return (
    <form className="ui reply form">
      <div className="field">
        <textarea></textarea>
      </div>
      <div className="ui blue labeled submit icon button">
        <i className="icon edit"></i> Add Reply
      </div>
    </form>
  );
}

export default AddCommentComponent;
