import React from "react";
import styles from "./Search.module.scss";

const Index = () => {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <form>
          <div className={styles.searchTerm}>
            <label>Search Term :</label>
            <input type="text" placeholder="Search..." />
          </div>
          <div className={styles.type}>
            <label>Type :</label>
            <div className={styles.allCheckboxs}>
              <div className={styles.checkboxDiv}>
                <input className={styles.checkbox} type="checkbox" name="all" />
                <span>Rent & Sell</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="rent"
                />
                <span>Rent</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="sell"
                />
                <span>Sell</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="offer"
                />
                <span>Offer</span>
              </div>
            </div>
          </div>
          <div className={styles.type}>
            <label>Amenities :</label>
            <div className={styles.allCheckboxs}>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="parking"
                />
                <span>Parking</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="furnished"
                />
                <span>Furnished</span>
              </div>
            </div>
          </div>
          <div className={styles.selectDiv}>
            <label>Sort :</label>
            <select>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className={styles.search}>Search</button>
        </form>
      </div>
      <div className={styles.right}>
        <h2 className={styles.title}>Listing Results</h2>
      </div>
    </main>
  );
};

export default Index;
