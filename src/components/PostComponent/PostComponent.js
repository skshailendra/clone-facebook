import React, { useRef, useState } from "react";
import "./style.scss";
import { FaFileImage } from "react-icons/fa";
import useStorage from "../../hooks/useStorage";
import { storage, projectFirestore, timestamp } from "../../firebase";
const types = ["image/png", "image/jpeg", "image/jpg"];
const userId = "shailendra101";
const PostComponent = ({
  statusText,
  changeText,
  imageUrl,
  resetStatusText,
}) => {
  let uploadImageRef = useRef();
  const [progress, setProgress] = useState(0);
  const [fileUpload, setFileUpload] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  //const { progress, url } = useStorage(fileUpload);

  const fileSelectorHandler = (e) => {
    let fileSelected = e.target.files[0];
    if (fileSelected && types.includes(fileSelected.type)) {
      console.log(fileSelected);
      setFileUpload(e.target.files[0]);
    } else {
      setFileUpload(null);
    }
  };
  const createNewPostHandler = (e) => {
    const collectionRef = projectFirestore.collection("data");
    if (fileUpload && types.includes(fileUpload.type)) {
      const uploadTask = storage.ref(`images/${fileUpload.name}`);
      uploadTask.put(fileUpload).on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        async () => {
          const url = await uploadTask.getDownloadURL();
          const createdAt = timestamp();
          const uniqueId = `${createdAt.toString()}${userId}`;
          await collectionRef.add({
            statusText,
            userId,
            uniqueId,
            url,
            createdAt,
          });
          setUrl(url);
          resetStatusText();
        }
      );
    } else {
      (async () => {
        const url = "";
        const createdAt = new Date().getTime();
        const uniqueId = `${createdAt}${userId}`;
        debugger;
        await collectionRef.add({
          statusText,
          userId,
          uniqueId,
          url,
          createdAt,
        });
        resetStatusText();
      })();
    }
  };

  return (
    <div className="post__container">
      <div className="post__form_input-text">
        <input
          type="text"
          className="post__container-inputs"
          placeholder="What's are your mind, Ram? "
          value={statusText}
          name="statusText"
          onChange={(e) => changeText(e)}
        />
      </div>

      <div className="post__container-uploadImage">
        {imageUrl && (
          <div className="post__container-image">
            <img src={imageUrl} width="300" height="300" alt="User-pic" />
          </div>
        )}
        <div className="post__container-uploadSection">
          <input
            type="file"
            ref={uploadImageRef}
            style={{ display: "none" }}
            onChange={(e) => fileSelectorHandler(e)}
          />
          <span>Add to your post</span>
          <div
            className="post__container-uploadSection1"
            onClick={() => uploadImageRef.current.click()}
          >
            <FaFileImage />
          </div>
        </div>
      </div>
      <div
        className="post__container-postButton"
        onClick={(e) => createNewPostHandler(e)}
      >
        <span>Post</span>
      </div>
    </div>
  );
};

export default PostComponent;
