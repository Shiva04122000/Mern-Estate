import React from "react";
import styles from "./OAuth.module.scss";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { post } from "../../services/publicRequest";
import { useDispatch } from "react-redux";
import {
  signInFailed,
  signInStarted,
  signInSuccess,
} from "../../redux/reducers/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const data = {
        name: result?.user?.displayName,
        email: result?.user?.email,
        photo: result?.user?.photoURL,
      };
      dispatch(signInStarted());
      const res = await post("/auth/google", data);
      dispatch(signInSuccess(res?.data?.user));
      toast.success(res?.data?.message);
      localStorage.setItem("access_token", res?.data?.user?.access_token);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(signInFailed());
    }
  };

  return (
    <button className={styles.btn} onClick={handleGoogleClick} type="button">
      Continue With Google
    </button>
  );
};

export default Index;
