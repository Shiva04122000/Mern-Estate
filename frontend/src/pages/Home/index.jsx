import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { get } from "../../services/publicRequest";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../../components/ListingItem";
import { useNavigate } from "react-router-dom";

const Index = () => {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [sellListings, setSellListings] = useState([]);
  const navigate = useNavigate();

  const getOfferListings = async () => {
    try {
      const res = await get(`/listing/get?offer=true`);
      setOfferListings(res?.data?.listing);
      getRentListings();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getRentListings = async () => {
    try {
      const res = await get(`/listing/get?type=rent`);
      setRentListings(res?.data?.listing);
      getSellListings();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getSellListings = async () => {
    try {
      const res = await get(`/listing/get?type=sell`);
      setSellListings(res?.data?.listing);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getOfferListings();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <h1>
          Find your next <span>Perfect</span>
          <br />
          place with ease
        </h1>
        <p className={styles.para}>
          Siwan Estate will help you find your home fast, easy and comfortable.
          <br />
          Our expert support are always available.
        </p>
        <b onClick={() => navigate("/search")} className={styles.startNow}>
          Let's Start now...
        </b>
      </div>
      <Swiper navigation>
        {offerListings?.map((url) => (
          <SwiperSlide key={url}>
            <div
              className={styles.image}
              style={{
                background: `url(${url?.imageUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <section className={styles.section}>
        <h3>Recent Offers</h3>
        <p
          onClick={() => navigate("/search?offer=true")}
          className={styles.showMore}
        >
          Show more Offers
        </p>
        <div className={styles.allListings}>
          {offerListings.map((item, id) => {
            return (
              <ListingItem
                key={id}
                listing={item}
                className={styles.singleCard}
                address={styles.address}
              />
            );
          })}
        </div>
      </section>
      <section className={styles.section}>
        <h3>Recent Places for Rent</h3>
        <p
          onClick={() => navigate("/search?type=rent")}
          className={styles.showMore}
        >
          Show more places for rent
        </p>
        <div className={styles.allListings}>
          {rentListings.map((item) => {
            return (
              <ListingItem
                listing={item}
                className={styles.singleCard}
                address={styles.address}
              />
            );
          })}
        </div>
      </section>
      <section className={styles.section}>
        <h3>Recent Places for Sell</h3>
        <p
          onClick={() => navigate("/search?type=sell")}
          className={styles.showMore}
        >
          Show more places for sell
        </p>
        <div className={styles.allListings}>
          {sellListings.map((item) => {
            return (
              <ListingItem
                listing={item}
                className={styles.singleCard}
                address={styles.address}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Index;
