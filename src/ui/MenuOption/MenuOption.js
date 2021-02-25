import React from "react";
import "./style.scss";
import MenuBackdrop from "../MenuBackdrop/MenuBackdrop";
const MenuOption = ({ show, menuClosed, children, idx }) => {
  return (
    <>
      <MenuBackdrop show={show} clicked={menuClosed} idx={idx} />
      <div
        className="menuoption"
        style={{
          display: show ? "block" : "none",
        }}
      >
        <div className="menuoption__body">
          <div className="menuoption__children">{children}</div>
        </div>
      </div>
    </>
  );
};

export default MenuOption;
