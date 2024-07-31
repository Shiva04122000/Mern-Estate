import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { post } from "../../services/publicRequest";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailed,
  signInStarted,
  signInSuccess,
} from "../../redux/reducers/userSlice";
import OAuth from "../../components/OAuth";

const index = () => {
  const [data, setData] = useState({});
  const { loading, user } = useSelector((state) => state?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setData({ ...data, [e?.target?.name]: e?.target?.value });
  };

  const inputs = [
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
      dispatch(signInStarted());
      const res = await post("/auth/signin", data);
      dispatch(signInSuccess(res?.data?.user));
      toast.success(res?.data?.message);
      localStorage.setItem("access_token", res?.data?.user?.access_token);
      navigate("/");
      setData({});
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(signInFailed());
    }
  };

  return (
    <>
      {!loading ? (
        <main>
          <h1 className={styles.title}>Sign In</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
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
            <button className={styles.btn}>Sign In</button>
            <OAuth />
            <p className={styles.text}>
              Don't Have an account ?{" "}
              <Link className={styles.link} to={"/sign-up"}>
                Sign up
              </Link>
            </p>
          </form>
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default index;
