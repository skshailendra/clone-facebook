import { useState, useEffect } from "react";
import { storage, projectFirestore, timestamp } from "../firebase";

const userId = "shailendra101";
const useStorage = (fileUpload) => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fileUpload) {
      return false;
    }
    const uploadTask = storage.ref(`images/${fileUpload.name}`);
    const collectionRef = projectFirestore.collection("data");
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
        await collectionRef.add({ userId, uniqueId, url, createdAt });
        setUrl(url);
      }
    );
  }, [fileUpload]);
  return { progress, url, error };
};
export default useStorage;
// () => {
//   storage
//     .ref("images")
//     .child(fileUpload.name)
//     .getDownloadURL()
//     .then((url) => {
//       setUploadedImage(url);
//       console.log(url);
//     });
// }
