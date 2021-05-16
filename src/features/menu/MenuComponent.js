import React from "react";
import { NavLink } from "react-router-dom";

function MenuComponent() {
  return (
    <div className="ui container">
      <div className="ui large secondary inverted pointing menu">
        <NavLink exact to="/" className="item">
          Home
        </NavLink>
        <NavLink to="/post/add" className="item" activeClassName="active">
          Add Post
        </NavLink>
        <NavLink to="/post/edit" className="item" activeClassName="active">
          Company
        </NavLink>
        <NavLink to="/post/delete" className="item" activeClassName="active">
          Careers
        </NavLink>
        <div className="right item">
          <NavLink
            to="/login"
            className="ui inverted button"
            activeClassName="active"
          >
            Log in
          </NavLink>
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
