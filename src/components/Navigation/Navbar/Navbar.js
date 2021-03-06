import React from "react";
import {
  FaFacebook,
  FaSistrix,
  FaHome,
  FaUserFriends,
  FaVideo,
  FaUsers,
  FaGamepad,
  FaPlus,
  FaFacebookMessenger,
  FaBell,
  FaCaretDown,
} from "react-icons/fa";
import "./style.scss";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__first">
        <div className="navbar__first-logo">
          <FaFacebook className="navbar__logo" />
        </div>
        <div className="navbar__first-search">
          <input
            type="text"
            className="navbar__first-searchbar"
            placeholder="Search Facebook"
          />
          <FaSistrix className="navar__searchIcon" />
        </div>
      </div>
      <div className="navbar__middle">
        <div className="middleIcon navbar__active-div">
          <FaHome className="navbar__middle-icons navbar__active" />
        </div>
        <div className="middleIcon">
          <FaUserFriends className="navbar__middle-icons" />
          <div className="navbar__notify">3</div>
        </div>
        <div className="middleIcon">
          <FaVideo className="navbar__middle-icons" />
          <div className="navbar__notify">10</div>
        </div>
        <div className="middleIcon">
          <FaUsers className="navbar__middle-icons" />
          <div className="navbar__notify">22</div>
        </div>
        <div className="middleIcon">
          <FaGamepad className="navbar__middle-icons" />
          <div className="navbar__notify">5</div>
        </div>
      </div>
      <div className="navbar__last">
        <div className="show__navbar-header-img">
          <img src="/images/profile-pic.jpg" alt="user" />
        </div>
        <div className="show__navbar-header-name">{"Ram Shyaam"}</div>
        <span className="navbar__last-section">
          <FaPlus />
        </span>
        <span className="navbar__last-section">
          <FaFacebookMessenger />
        </span>
        <span className="navbar__last-section">
          <FaBell />
        </span>
        <span className="navbar__last-section">
          <FaCaretDown />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
