import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { isLoggedIn, logout } from "./authSlice";

function LogoutComponent() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(isLoggedIn);

  const userLogout = () => {
    dispatch(logout());
  };

  const logoutButton = (
    <button
      className="ui inverted button"
      onClick={userLogout}
    >
      Log out
    </button>
  );

  const redirectTo = <Redirect to="/" push={true} />;

  return loginStatus ? logoutButton : redirectTo; 
}

export default LogoutComponent;
