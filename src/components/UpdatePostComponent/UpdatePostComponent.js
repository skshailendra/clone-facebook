import React, { useRef, useState, useEffect } from "react";
import "./style.scss";
import { FaFileImage } from "react-icons/fa";
import { storage, projectFirestore, timestamp } from "../../firebase";
const types = ["image/png", "image/jpeg", "image/jpg"];
const userId = "shailendra101";
const UpdatePostComponent = ({
  statusText,
  changeText,
  editedurl,
  id,
  resetStatusText,
}) => {
  let uploadImageRef = useRef();
  const [progress, setProgress] = useState(0);
  const [fileUpload, setFileUpload] = useState(null);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  //const { progress, url } = useStorage(fileUpload);
  useEffect(() => {
    setImageUrl(editedurl);
  }, [editedurl]);
  const fileSelectorHandler = (e) => {
    let fileSelected = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageUrl(reader.result);
      }
    };
    setFileUpload(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  const clearFileUpload = () => {
    setImageUrl("");
    setFileUpload(null);
  };

  const updatePostHandler = (e) => {
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
          await collectionRef.doc(id).set({
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
        const url = imageUrl;
        const createdAt = new Date().getTime();
        const uniqueId = `${createdAt}${userId}`;
        await collectionRef.doc(id).set({
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
  debugger;
  return (
    <div className="post__container-edit">
      <div className="post__form_input-text1">
        <input
          type="text"
          className="post__container-inputs"
          placeholder="What's are your mind, Ram? "
          value={statusText}
          name="statusText"
          onChange={(e) => changeText(e)}
        />
      </div>

      <div className="post__container-uploadImage1">
        {imageUrl && (
          <div className="post__container-image1">
            <img
              src={imageUrl}
              className="post__container-image-img1"
              alt="User-pic"
            />
            <div className="image__close" onClick={() => clearFileUpload()}>
              <span>X</span>
            </div>
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
        onClick={(e) => updatePostHandler(e)}
      >
        <span>Post</span>
      </div>
    </div>
  );
};

export default UpdatePostComponent;
