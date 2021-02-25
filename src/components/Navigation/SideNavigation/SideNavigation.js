import React, { useState } from "react";
import "./style.scss";
const sidebarArray = [
  { id: 1, image: "/images/1.jpg", name: "Flutter Development" },
  { id: 2, image: "/images/2.jpg", name: "PHP Development" },
  { id: 3, image: "/images/3.jpg", name: "React Native Development" },
  { id: 4, image: "/images/4.jpg", name: "Node JS Development" },
  { id: 5, image: "/images/1.jpg", name: "Vue JS Development" },
  { id: 6, image: "/images/2.jpg", name: "React Development" },
  { id: 7, image: "/images/3.jpg", name: "Flutter Development" },
  { id: 8, image: "/images/4.jpg", name: "PHP Development" },
  { id: 9, image: "/images/1.jpg", name: "React Native Development" },
  { id: 10, image: "/images/2.jpg", name: "Node JS Development" },
];
const SideNavigation = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__list">
        <div className="sidebar__list-profile-img">
          <img src="/images/profile-pic.jpg" alt="user" />
        </div>
        <div className="show__navbar-header-name">{"Ram Shyaam"}</div>
      </div>

      {sidebarArray.map((info) => (
        <div className="sidebar__list" key={info.id}>
          <div className="sidebar__list-img">
            <img src={info.image} alt="group image" />
          </div>
          <div className="sidebar__list-name">{info.name}</div>
        </div>
      ))}
    </div>
  );
};

export default SideNavigation;
