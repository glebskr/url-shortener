import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <a href="#" className="brand-logo">
          Links Shortener
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create" className="">
              Create
            </NavLink>
          </li>
          <li>
            <NavLink to="/links" className="">
              Links
            </NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler} className="">
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
