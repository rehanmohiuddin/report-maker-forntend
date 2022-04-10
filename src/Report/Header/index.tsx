import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import AvatarDemo from "../../Assets/img_avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { checkRequest, logout } from "../../store/report/actions";
import { getLogedInSelector } from "../../store/report/selectors";

function Index() {
  const [showNav, setNav] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLogedInSelector);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  return (
    <header>
      <nav className="nav-bar">
        <Link to={"/"}>
          <h3>Masood Ali's Report Hub</h3>
        </Link>
        <FontAwesomeIcon
          className="nav-icon"
          onClick={() => setNav(!showNav)}
          icon={faBars}
        />
        <ul>
          <li>
            <Link to={"/"}>Home </Link>
          </li>

          <li>
            <Link to={"/Reports"}>Reports </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link onClick={handleLogout} to={"#"}>
                LogOut{" "}
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {showNav && (
        <div
          ref={(ref) => setTimeout(() => ref?.classList.add("nav-left"), 100)}
          className="mob-nav-container"
          id="mob-nav"
        >
          <div className="avatar">
            <img src={AvatarDemo} />
            <div>Md.Masood Ali</div>
          </div>
          <ul>
            <Link to={"/"}>
              <li>Home</li>{" "}
            </Link>
            <Link to={"/Reports"}>
              <li>Reports </li>{" "}
            </Link>
            {isLoggedIn && (
              <Link onClick={handleLogout} to={"#"}>
                <li> LogOut</li>
              </Link>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Index;
