import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState({});

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
  };

  useEffect(() => {
    setData(user);
  }, []);

  return (
    <main>
      <h1 className={styles.title}>Profile</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <img
          className={styles.avatarImg}
          src={user?.avatar}
          alt="Profile Image"
        />
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
