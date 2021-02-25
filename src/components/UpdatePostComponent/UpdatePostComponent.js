import React, { useRef, useState } from "react";
import "./style.scss";
import { FaEllipsisH, FaLock, FaCaretDown } from "react-icons/fa";
import useStorage from "../../hooks/useStorage";
import { storage, projectFirestore, timestamp } from "../../firebase";
const types = ["image/png", "image/jpeg", "image/jpg"];
const userId = "shailendra101";
const UpdatePostComponent = ({
  statusText,
  changeText,
  imageUrl,
  id,
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
        const url = "";
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

  return (
    <div className="post__container">
      <div className="form_input-text">
        <input
          type="text"
          className="create__first-inputs"
          placeholder="What's are your mind, Ram? "
          value={statusText}
          name="statusText"
          onChange={(e) => changeText(e)}
        />
      </div>
      <input
        type="file"
        ref={uploadImageRef}
        style={{ display: "none" }}
        onChange={(e) => fileSelectorHandler(e)}
      />
      <button onClick={() => uploadImageRef.current.click()}>
        Upload Image Icon
      </button>
      {imageUrl && (
        <img src={imageUrl} width="300" height="300" alt="User-pic" />
      )}
      <button onClick={(e) => updatePostHandler(e)}>Post</button>
    </div>
  );
};

export default UpdatePostComponent;
