import React from "react";

function TagComponent({ children }) {
  return (
    <>
      <a href="/" className="ui label">
        {children}
      </a>
    </>
  );
}

export default TagComponent;
