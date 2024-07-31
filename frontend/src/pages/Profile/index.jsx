import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import toast from "react-hot-toast";
import { put } from "../../services/publicRequest";
import {
  signInFailed,
  signInStarted,
  signInSuccess,
} from "../../redux/reducers/userSlice";

const Index = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [imgFile, setImageFile] = useState(null);
  const [filePer, setFilePer] = useState(0);
  const fileRef = useRef();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setData({ ...data, [e?.target?.name]: e?.target?.value });
  };

  const inputs = [
    {
      type: "text",
      name: "userName",
      placeholder: "Username",
      value: data?.userName || "",
    },
    {
      type: "email",
      name: "email",
      placeholder: "Email",
      value: data?.email || "",
    },
    {
      type: "text",
      name: "password",
      placeholder: "Password",
      value: data?.password || "",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStarted);
      const res = await put("/user/update", user?._id, data);
      console.log("res", res);
      dispatch(signInSuccess(res?.data?.user));
      toast.success(res?.data?.message);
    } catch (error) {
      dispatch(signInFailed);
      toast.error(error);
    }
  };

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imgFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imgFile);

    uploadTask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        toast.error("Profile Upload Failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setData({ ...data, avatar: downloadUrl });
        });
      }
    );
  };

  useEffect(() => {
    setData(user);
  }, []);

  useEffect(() => {
    if (imgFile) {
      handleFileUpload();
    }
  }, [imgFile]);

  return (
    <main>
      <h1 className={styles.title}>Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          ref={fileRef}
          onChange={(e) => setImageFile(e.target.files[0])}
          type="file"
          hidden
          accept="image/*"
        />
        <img
          className={styles.avatarImg}
          src={data?.avatar || user?.avatar}
          alt="Profile Image"
          onClick={(e) => fileRef.current.click()}
        />

        {filePer > 0 && filePer < 100 ? (
          <p className={styles.uploadPercentage}>Uploading {filePer}%</p>
        ) : filePer === 100 ? (
          <p className={styles.uploadSuccess}>Image Successfully Uploaded !</p>
        ) : (
          ""
        )}

        {inputs.map((elem, idx) => {
          return (
            <input
              key={idx}
              placeholder={elem?.placeholder}
              type={elem?.type}
              name={elem?.name}
              onChange={(e) => handleOnChange(e)}
              value={elem?.value}
              required
            />
          );
        })}
        <button className={styles.btn}>Update</button>
        <div className={styles.text}>
          <span>Delete Account</span>
          <span>Sign Out</span>
        </div>
      </form>
    </main>
  );
};

export default Index;
