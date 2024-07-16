import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { post } from "../../services/publicRequest";
import toast from "react-hot-toast";

const index = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

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
      const res = await post("/auth/signin", data);
      toast.success(res?.data?.message);
      navigate("/");
      setData({});
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
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
        <button>Sign In</button>
        <p className={styles.text}>
          Don't Have an account ?{" "}
          <Link className={styles.link} to={"/sign-up"}>
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
};

export default index;
