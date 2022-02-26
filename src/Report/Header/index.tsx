import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AvatarDemo from "../../Assets/img_avatar.png";

function Index() {
  const [showNav, setNav] = useState(false);
  const [navRef, setNavRef] = useState<HTMLDivElement>();
  useEffect(() => {
    console.log("Ref", navRef);
  }, [navRef]);
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
          </ul>
        </div>
      )}
    </header>
  );
}

export default Index;
