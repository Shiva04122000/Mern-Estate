import React, { useEffect, useState } from "react";
import styles from "./CreateListing.module.scss";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { privatePost, privatePut } from "../../services/privateRequest";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const { state } = useLocation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData?.type) {
      toast.error(`Please Select any 1 type "Rent" or "Sell"`);
    } else if (formData.imageUrls.length < 1) {
      toast.error(`Please Select atleast 1 image`);
    } else {
      try {
        const res = state
          ? await privatePut("/listing/update", state?._id, {
              ...formData,
              owner: user?._id,
            })
          : await privatePost("/listing/create", {
              ...formData,
              owner: user?._id,
            });
        toast.success(res?.data?.message);
        navigate(`/listing/${res?.data?.listing?._id}`);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleRemoveImg = (imgId) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, id) => id !== imgId),
    });
  };

  const handleOnChange = (e) => {
    if (e.target.type === "checkbox") {
      if (e.target?.name === "rent" || e.target.name === "sell") {
        setFormData({ ...formData, type: e.target?.name });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.checked });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (state) {
      setFormData(state);
    }
  }, [state]);

  return (
    <main>
      <h1 className={styles.title}>{state ? "Update" : "Create"} Listing</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.left}>
          <input
            onChange={(e) => handleOnChange(e)}
            type="text"
            placeholder="Name"
            name="name"
            value={formData?.name || ""}
            required
          />
          <textarea
            type="text"
            rows={3}
            placeholder="Description"
            name="description"
            onChange={(e) => handleOnChange(e)}
            value={formData?.description || ""}
            required
          />
          <textarea
            type="text"
            rows={2}
            placeholder="Address"
            name="address"
            onChange={(e) => handleOnChange(e)}
            value={formData?.address || ""}
            required
          />
          <div className={styles.checkboxSection}>
            <div className={styles.checkboxDiv}>
              <input
                className={styles.checkbox}
                name="rent"
                type="checkbox"
                checked={formData?.type === "rent"}
                onChange={(e) => handleOnChange(e)}
              />
              <span>Rent</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input
                className={styles.checkbox}
                name="sell"
                type="checkbox"
                checked={formData?.type === "sell"}
                onChange={(e) => handleOnChange(e)}
              />
              <span>Sell</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input
                className={styles.checkbox}
                name="parking"
                type="checkbox"
                onChange={(e) => handleOnChange(e)}
              />
              <span>Parking</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input
                className={styles.checkbox}
                name="furnished"
                type="checkbox"
                onChange={(e) => handleOnChange(e)}
              />
              <span>Furnished</span>
            </div>
            <div className={styles.checkboxDiv}>
              <input
                className={styles.checkbox}
                name="offer"
                type="checkbox"
                onChange={(e) => handleOnChange(e)}
              />
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
                onChange={(e) => handleOnChange(e)}
                value={formData?.bedrooms || ""}
                required
              />
              <span>Bedrooms</span>
            </div>
            <div className={styles.numberDiv}>
              <input
                className={styles.number}
                type="text"
                name="bathrooms"
                placeholder="1"
                onChange={(e) => handleOnChange(e)}
                value={formData?.bathrooms || ""}
                required
              />
              <span>Bathrooms</span>
            </div>
            <div className={styles.numberDiv}>
              <input
                className={styles.number}
                type="text"
                name="regularPrice"
                placeholder="in ₹"
                onChange={(e) => handleOnChange(e)}
                value={formData?.regularPrice || ""}
                required
              />
              <span>Regular Price</span>
            </div>
            {formData?.offer && (
              <div className={styles.numberDiv}>
                <input
                  className={styles.number}
                  type="text"
                  name="discountPrice"
                  placeholder="in ₹"
                  onChange={(e) => handleOnChange(e)}
                  value={formData?.discountPrice || ""}
                  required={formData?.offer}
                />
                <span>Discount Price</span>
              </div>
            )}
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
          <button disabled={loading} className={styles.submitBtn}>
            {state ? "Update" : "Create"} Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default Index;
