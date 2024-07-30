import React from "react";
import styles from "./Header.module.scss";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../utils/constants";
import { useSelector } from "react-redux";

const index = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  return (
    <header className={styles.header}>
      <h2 onClick={() => navigate("/")}>
        <span>Siwan</span>
        <span>Estate</span>
      </h2>
      <form>
        <input type="text" placeholder="Search..." />
        <CiSearch className={styles.icon} />
      </form>
      <div className={styles.ul}>
        {pageRoutes.map((elem) => (
          <p key={elem.id} onClick={() => navigate(elem?.navigate)}>
            {elem?.routeName}
          </p>
        ))}
        {user ? (
          <img
            className={styles.img}
            src={user?.avatar}
            onClick={() => navigate("/profile")}
            alt="Profile Image"
          />
        ) : (
          <p onClick={() => navigate("/sign-in")}>Sign In</p>
        )}
      </div>
    </header>
  );
};

export default index;
