import React, { useState, useRef } from "react";
import "./style.scss";
import { FaVideo, FaRegFileImage, FaRegGrinAlt } from "react-icons/fa";
import { storage } from "../../firebase";
import useStorage from "../../hooks/useStorage";
import Modal from "../../ui/Modal/Modal";
import PostComponent from "../PostComponent/PostComponent";

const CreatePost = () => {
  // const [uploadedImage, setUploadedImage] = useState(null);
  // const { progress, url } = useStorage(fileUpload);
  const [openModal, setOpenModal] = useState(false);
  const [statusText, setStatusText] = useState("");

  const closeModalHandler = () => {
    setOpenModal(false);
  };
  const openModalHandler = () => {
    setOpenModal(true);
  };
  const onChangeStatus = (e) => {
    console.log(e.target.value);
    setStatusText(e.target.value);
  };
  const resetStatusText = () => {
    setStatusText("");
    closeModalHandler();
  };
  return (
    <div className="create">
      <div className="create__first">
        <div className="create__first-img">
          <span>
            <img src="/images/profile-pic.jpg" alt="user" />
          </span>
        </div>
        <div className="create__first-input">
          <input
            type="text"
            className="create__first-inputs"
            placeholder="What's are your mind, Ram? "
            value={statusText}
            name="statusText"
            onChange={(e) => onChangeStatus(e)}
            onFocus={() => openModalHandler()}
          />
        </div>
      </div>
      <div className="create__second">
        <div className="create__second-icon">
          <FaVideo className="redColor" />{" "}
          <span className="create__social">Live Video</span>
        </div>
        <div className="create__second-icon">
          <FaRegFileImage className="greenColor" />{" "}
          <span className="create__social">Photo / Video</span>
        </div>
        <div className="create__second-icon">
          <FaRegGrinAlt className="orangeColor" />{" "}
          <span className="create__social">Feeling</span>
        </div>
      </div>

      <Modal
        type={"Create Post"}
        show={openModal}
        modalClosed={closeModalHandler}
      >
        <PostComponent
          statusText={statusText}
          changeText={onChangeStatus}
          imageUrl={""}
          resetStatusText={resetStatusText}
        />
      </Modal>
    </div>
  );
};

export default CreatePost;
