import React, { useState } from "react";
import styles from "../SignIn/SignIn.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../services/publicRequest";
import toast from "react-hot-toast";
import OAuth from "../../components/OAuth";

const index = () => {
  const [data, setData] = useState({});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await post("/auth/signup", data);
      toast.success(res?.data?.message);
      navigate("/sign-in");
      setData({});
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <main>
      <h1 className={styles.title}>Sign Up</h1>
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
        <button className={styles.btn}>Sign Up</button>
        <OAuth />
        <p className={styles.text}>
          Have an account ?{" "}
          <Link className={styles.link} to={"/sign-in"}>
            Sign In
          </Link>
        </p>
      </form>
    </main>
  );
};

export default index;
