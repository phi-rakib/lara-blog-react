import React from "react";

function MessageComponent(props) {
  const { title, error, classes } = props;
  return (
    <div className={`ui ${classes} message`}>
      <i className="close icon"></i>
      <div className="header">{title}</div>
      <p>{error}</p>
    </div>
  );
}

export default MessageComponent;
