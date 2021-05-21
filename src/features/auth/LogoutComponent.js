import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { authSelector, logout } from "./authSlice";

function LogoutComponent() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(authSelector);

  const userLogout = async () => {
    if (loggedIn) {
      try {
        const result = await dispatch(logout());
        unwrapResult(result);
      } catch (error) {
        console.error("Error in logout ", error);
      }
    }
  };

  const logoutButton = (
    <button className="ui inverted button" onClick={userLogout}>
      Log out
    </button>
  );

  const redirectTo = <Redirect to="/" push={true} />;

  return loggedIn ? logoutButton : redirectTo;
}

export default LogoutComponent;
