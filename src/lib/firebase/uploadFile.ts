import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "./index";

/**
 * @param file - file from input
 * @param location - string eg. "image/"
 */
export function uploadFile(file: File, location: string) {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, location + Date.now() + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

/**
 * @param url - url of image/file
 */
export function deleteFile(url: string | undefined) {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, url);

    deleteObject(storageRef)
      .then(() => {
        resolve(null);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
