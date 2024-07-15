import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.scss";

const index = () => {
  const [data, setData] = useState({});

  const handleOnChange = (e) => {
    setData({ ...data, [e?.target?.name]: e?.target?.value });
  };

  const inputs = [
    {
      type: "email",
      name: "email",
      placeholder: "Email",
    },
    {
      type: "text",
      name: "password",
      placeholder: "Password",
    },
  ];

  return (
    <main>
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles.form}>
        {inputs.map((elem, idx) => {
          return (
            <input
              key={idx}
              placeholder={elem?.placeholder}
              type={elem?.type}
              name={elem?.name}
              onChange={(e) => handleOnChange(e)}
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
