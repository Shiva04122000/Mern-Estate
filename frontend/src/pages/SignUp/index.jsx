import React, { useState } from "react";
import styles from "../SignIn/SignIn.module.scss";
import { Link } from "react-router-dom";

const index = () => {
  const [data, setData] = useState({});

  const handleOnChange = (e) => {
    setData({ ...data, [e?.target?.name]: e?.target?.value });
  };

  const inputs = [
    {
      type: "text",
      name: "userName",
      placeholder: "Username",
    },
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
      <h1 className={styles.title}>Sign Up</h1>
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
        <button>Sign Up</button>
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
