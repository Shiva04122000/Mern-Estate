import React from "react";
import styles from "./ListingItem.module.scss";
import { FaMapMarkedAlt } from "react-icons/fa";
import { addCommas } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const Index = ({ listing, className, address }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.singleCard} ${className}`}>
      <img
        className={styles.img}
        alt="img"
        src={listing?.imageUrls[0]}
        onClick={() => navigate(`/listing/${listing?._id}`)}
      />
      <div className={styles.info}>
        <h3 onClick={() => navigate(`/listing/${listing?._id}`)}>
          {listing?.name}
        </h3>
        <p className={`${styles.address} ${address}`}>
          <FaMapMarkedAlt className={styles.addIcon} />
          <span>{listing?.address}</span>
        </p>
        <p className={styles.description}>{listing?.description}</p>
        <p className={styles.price}>
          <span
            className={`${
              listing?.type === "sell" ? styles.sell : styles.rent
            } ${styles.type}`}
          >
            {listing?.type}
          </span>{" "}
          ₹
          {listing?.offer ? (
            <>
              <span className={styles.lineThrough}>
                {addCommas(listing?.regularPrice)}
              </span>{" "}
              {addCommas(listing?.discountPrice)} /-
            </>
          ) : (
            `${addCommas(listing?.regularPrice)} /-`
          )}
        </p>
        <div className={styles.rooms}>
          <p>{listing?.bedrooms} Beds</p>
          <p>{listing?.bathrooms} Baths</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
