import React, { useState } from "react";
import styles from "./CreateListing.module.scss";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [loading, setLoading] = useState(false);

  console.log("formData", formData);

  const handleFileUpload = () => {
    if (files.length > 0 && files.length < 7) {
      const promises = [];
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((url) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });
        })
        .catch(() => {
          toast.error("Image upload failed (2 mb max per image)");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("max 6 images allowed");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapShot) => {
          const progress =
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleRemoveImg = (imgId) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, id) => id !== imgId),
    });
  };

  return (
    <main>
      <h1 className={styles.title}>Create Listing</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.left}>
          <input type="text" placeholder="Name" name="name" />
          <textarea
            type="text"
            rows={3}
            placeholder="Description"
            name="description"
          />
          <textarea type="text" rows={2} placeholder="Address" name="address" />
          <div className={styles.checkboxSection}>
            <div className={styles.checkboxDiv}>
              <input className={styles.checkbox} name="rent" type="checkbox" />
              <span>Rent</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input className={styles.checkbox} name="sell" type="checkbox" />
              <span>Sell</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input
                className={styles.checkbox}
                name="parking"
                type="checkbox"
              />
              <span>Parking</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input
                className={styles.checkbox}
                name="furnished"
                type="checkbox"
              />
              <span>Furnished</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input className={styles.checkbox} name="offer" type="checkbox" />
              <span>Offer</span>
            </div>
          </div>
          <div className={styles.numberSection}>
            <div className={styles.numberDiv}>
              <input
                className={styles.number}
                type="text"
                name="bedrooms"
                placeholder="1"
              />
              <span>Bedrooms</span>
            </div>
            <div className={styles.numberDiv}>
              <input
                className={styles.number}
                type="text"
                name="bathrooms"
                placeholder="1"
              />
              <span>Bathrooms</span>
            </div>
            <div className={styles.numberDiv}>
              <input
                className={styles.number}
                type="text"
                name="regularPrice"
                placeholder="in ₹"
              />
              <span>Regular Price</span>
            </div>
            <div className={styles.numberDiv}>
              <input
                className={styles.number}
                type="text"
                name="discountPrice"
                placeholder="in ₹"
              />
              <span>Discount Price</span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.text}>
            <b>Images :</b> The First Img Will be shown as a Cover (max 6)
          </p>
          <div className={styles.uploadDiv}>
            <input
              className={styles.fileInput}
              multiple
              type="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              onClick={handleFileUpload}
              type="button"
              className={styles.imgUploadBtn}
              disabled={loading}
            >
              {loading ? "Loading..." : "Upload"}
            </button>
          </div>
          {formData.imageUrls.length > 0 && (
            <div className={styles.imgDiv}>
              {formData.imageUrls.map((url, id) => {
                return (
                  <div className={styles.imgList} key={url}>
                    <img className={styles.img} src={url} alt="Image" />
                    <span
                      onClick={() => handleRemoveImg(id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </span>
                  </div>
                );
              })}
            </div>
          )}
          <button className={styles.submitBtn}>Create Listing</button>
        </div>
      </form>
    </main>
  );
};

export default Index;
