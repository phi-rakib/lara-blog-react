import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutComponent from "../auth/LogoutComponent";
import { authSelector } from "./../auth/authSlice";

function MenuComponent() {
  const { loggedIn } = useSelector(authSelector);
  return (
    <div className="ui container">
      <div className="ui large secondary inverted pointing menu">
        <NavLink exact to="/" className="item">
          Home
        </NavLink>
        <NavLink to="/post/add" className="item" activeClassName="active">
          Add Post
        </NavLink>
        <NavLink to="/post/delete" className="item" activeClassName="active">
          Careers
        </NavLink>
        <div className="right item">
          <LogoutComponent />
          {loggedIn ? null : (
            <NavLink
              to="/login"
              className="ui inverted button"
              activeClassName="active"
            >
              Log in
            </NavLink>
          )}

          <NavLink
            to="/register"
            className="ui inverted button"
            activeClassName="active"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MenuComponent;
