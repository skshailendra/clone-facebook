import React, { useState } from "react";
import "./style.scss";
const RightSideNavigation = () => {
  const [state, setState] = useState([
    { id: 1, image: "/images/1.jpg", name: "Ram" },
    { id: 2, image: "/images/2.jpg", name: "Rohit Sharma" },
    { id: 3, image: "/images/3.jpg", name: "Mukesh Kumar" },
    { id: 4, image: "/images/4.jpg", name: "Viraat Kohli " },
    { id: 5, image: "/images/1.jpg", name: "Sachin Tendulkar" },
    { id: 6, image: "/images/2.jpg", name: "Saurav Ganguli" },
  ]);
  return (
    <div className="rightsidebar">
      <div className="contact-heading">
        <span>Contacts</span>
      </div>
      <div>
        {state.map((info) => (
          <div className="rightsidebar__list" key={info.id}>
            <div className="rightsidebar__list-img">
              <img src={info.image} alt="group image" />
            </div>
            <div className="rightsidebar__list-name">{info.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSideNavigation;
