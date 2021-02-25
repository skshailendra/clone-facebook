import React from "react";
import "./style.scss";
import MenuBackdrop from "../MenuBackdrop/MenuBackdrop";
import { FaEllipsisH, FaLock, FaCaretDown } from "react-icons/fa";
const MenuOption = ({ show, menuClosed, children }) => {
  return (
    <>
      <MenuBackdrop show={show} clicked={menuClosed} />
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
