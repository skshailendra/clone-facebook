import React, { useState, useRef } from "react";
import "./style.scss";
import { FaVideo, FaRegFileImage, FaRegGrinAlt } from "react-icons/fa";
import axios from "axios";
import { storage } from "../../firebase";
import useStorage from "../../hooks/useStorage";
const types = ["image/png", "image/jpeg", "image/jpg"];

const CreatePost = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const { progress, url } = useStorage(fileUpload);
  let uploadImageRef = useRef();
  const fileSelectorHandler = (e) => {
    let fileSelected = e.target.files[0];
    if (fileSelected && types.includes(fileSelected.type)) {
      setFileUpload(e.target.files[0]);
    } else {
      setFileUpload(null);
    }
  };
  const createNewPostHandler = (e) => {
    console.log(fileUpload);
    if (!fileUpload) {
      return false;
    }
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
            placeholder="Shakil what are your mind? "
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
      {/* <input
        type="file"
        ref={uploadImageRef}
        style={{ display: "none" }}
        onChange={(e) => fileSelectorHandler(e)}
      />
      <button onClick={() => uploadImageRef.current.click()}>
        Upload Image Icon
      </button>
      <img src={uploadedImage} width="300" height="300" alt="User-pic" />
      <button onClick={(e) => createNewPostHandler(e)}>Upload</button> */}
    </div>
  );
};

export default CreatePost;
