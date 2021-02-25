import React from "react";
import "./style.scss";

const MenuBackdrop = (props) =>
  props.show ? (
    <div
      className="menubackdrop"
      onClick={() => props.clicked(props.idx)}
    ></div>
  ) : null;

export default MenuBackdrop;
