import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authSelector, login } from "./authSlice";
import LoaderComponent from "./../shared/LoaderComponent";
import MessageComponent from "../shared/MessageComponent";

function LoginComponent() {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const { loggedIn, status, error } = useSelector(authSelector);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = async () => {
    if (!loggedIn) {
      try {
        const result = await dispatch(login(credential));
        unwrapResult(result);
        history.push("/");
      } catch (error) {
        console.error("Failed to login ", error);
      }
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setCredential({ ...credential, [name]: value });
  };

  const renderLoginForm = () => {
    return (
      <div className="ui text container">
        <div className="ui middle aligned center aligned grid">
          <div className="column">
            <h2 className="ui teal image header">
              <div className="content">Log-in to your account</div>
            </h2>
            <form className="ui large form">
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input
                      type="text"
                      name="email"
                      placeholder="E-mail address"
                      value={credential.email}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={credential.password}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                <div
                  className="ui fluid large teal submit button"
                  onClick={handleLogin}
                >
                  Login
                </div>
              </div>

              <div className="ui error message"></div>
            </form>

            <div className="ui message">
              New to us? <a href="/">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  if (status === "loading") return <LoaderComponent />;
  if (status === "failed") {
    const title = "Unable to Login";
    const classes = "negative";
    const props = {
      title,
      error,
      classes,
    };
    return (
      <div className="ui text container">
        <MessageComponent {...props} />
        {renderLoginForm()}
      </div>
    );
  }

  return renderLoginForm();
}

export default LoginComponent;
