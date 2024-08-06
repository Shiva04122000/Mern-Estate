import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import toast from "react-hot-toast";
import {
  signInFailed,
  signInStarted,
  signInSuccess,
} from "../../redux/reducers/userSlice";
import {
  privateDelete,
  privateGet,
  privatePut,
} from "../../services/privateRequest";

const Index = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [imgFile, setImageFile] = useState(null);
  const [filePer, setFilePer] = useState(0);
  const [listing, setListing] = useState([]);
  const fileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const getListing = async () => {
    try {
      const res = await privateGet("/listing/get-listings");
      setListing(res?.data?.listings);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStarted);
      const res = await privatePut("/user/update", user?._id, data);
      dispatch(signInSuccess(res?.data?.user));
      toast.success(res?.data?.message);
    } catch (error) {
      dispatch(signInFailed);
      toast.error(error);
    }
  };

  function handleClearToken(res) {
    navigate("/");
    toast.success(res?.data?.message);
    dispatch(signInSuccess(null));
    localStorage.clear();
  }

  const handleSignOut = async () => {
    try {
      const res = await privateGet("/auth/signout");
      handleClearToken(res);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await privateDelete("/user/delete", user?._id);
      handleClearToken(res);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      const res = await privateDelete("/listing/delete", id);
      getListing();
      toast.success(res?.data?.message);
    } catch (error) {
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
            />
          );
        })}
        <button disabled={loading} className={styles.btn}>
          {loading ? "Loading..." : "Update"}
        </button>
        <Link to={"/create-listing"} className={styles.link}>
          Create Listing
        </Link>
      </form>
      <div className={styles.text}>
        <span onClick={handleDeleteUser}>Delete Account</span>
        <span onClick={handleSignOut}>Sign Out</span>
      </div>
      <div className={styles.listingDiv}>
        <p onClick={() => getListing()} className={styles.listing_text}>
          {listing ? "All Listings" : "View Listings"}
        </p>
        {listing?.length > 0 && (
          <div className={styles.allListings}>
            {listing.map((item) => {
              return (
                <div key={item?._id} className={styles.singleListing}>
                  <p
                    onClick={() => navigate(`/listing/${item?._id}`)}
                    className={styles.name}
                  >
                    {item?.name}
                  </p>
                  <div className={styles.singleListing_bottom}>
                    <img
                      onClick={() => navigate(`/listing/${item?._id}`)}
                      className={styles.imgBanner}
                      src={item?.imageUrls[0]}
                      alt="image Banner"
                    />
                    <div className={styles.actionBtns}>
                      <span
                        onClick={() =>
                          // navigate("/update-listing", { state: item })
                          navigate("/create-listing", { state: item })
                        }
                      >
                        Edit
                      </span>
                      <span onClick={() => handleDeleteListing(item?._id)}>
                        Delete
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;
