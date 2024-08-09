import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../utils/constants";
import { useSelector } from "react-redux";

const index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  return (
    <header className={styles.header}>
      <h2 onClick={() => navigate("/")}>
        <span>Siwan</span>
        <span>Estate</span>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          required
          type="text"
          placeholder="Search..."
        />
        <button type="submit">
          <CiSearch className={styles.icon} />
        </button>
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
