import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { isLoggedIn, login } from "./authSlice";

function LoginComponent() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState("idle");
  const loggedIn = useSelector(isLoggedIn);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user")) history.push("/");
  }, [history, loggedIn]);

  const handleLogin = () => {
    if (loginStatus === "idle") {
      setLoginStatus("pending");
      try {
        const result = dispatch(login(user));
        unwrapResult(result);
        setLoginStatus("idle");
        history.push("/");
      } catch (error) {
        console.error("Failed to login ", error);
        setLoginStatus("idle");
      }
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
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
                  value={user.email}
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
                  value={user.password}
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
  );
}

export default LoginComponent;
