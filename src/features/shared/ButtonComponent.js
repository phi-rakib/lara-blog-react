import React from "react";

function ButtonComponent({ children, handleButtonSubmit, classes }) {
  const classList = `ui button ${classes}`;

  return (
    <>
      <button className={classList} onClick={handleButtonSubmit}>
        {children}
      </button>
    </>
  );
}

export default ButtonComponent;
