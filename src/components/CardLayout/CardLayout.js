import React from "react";
import "./style.scss";
const CardLayout = (props) => {
  return (
    <>
      <div className="card-layout">
        <div className="card-descrption">{props.children}</div>
      </div>
    </>
  );
};

export default CardLayout;
