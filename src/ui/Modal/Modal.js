import React from "react";
import "./style.scss";
import Backdrop from "../Backdrop/Backdrop";
import { FaLock, FaCaretDown } from "react-icons/fa";
const Modal = ({ type, show, modalClosed, children, backdropdisabled }) => {
  return (
    <>
      <Backdrop show={show} clicked={modalClosed} disabled={backdropdisabled} />
      <div
        className="modal"
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        <div className="modal__body">
          <div className="modal__header-container">
            <h3 className="modal__heading">{type}</h3>
            <div className="modal__close" onClick={modalClosed}>
              <span>X</span>
            </div>
          </div>
          <div className="modal__username">
            <div className="modal__show-header">
              <div className="modal__show-header-img">
                <img src="/images/profile-pic.jpg" alt="user" />
              </div>
              <div className="modal__show-header-name">
                {"Ram Shyaam"}
                <div className="modal__show-header-visibility-container">
                  <FaLock />
                  <span className="modal__show-header-visibility">Only me</span>
                  <FaCaretDown />
                </div>
              </div>
            </div>
          </div>
          <div className="modal__children">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
