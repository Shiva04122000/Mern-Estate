import React, { useEffect, useState } from "react";
import styles from "./ListingDetail.module.scss";
import { get } from "../../services/publicRequest";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import "swiper/css/bundle";
import { addCommas } from "../../utils/constants";

const Index = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const getListingDetail = async () => {
    setLoading(true);
    try {
      const res = await get(`/listing/${params?.id}`);
      setListing(res?.data?.listing);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListingDetail();
  }, [params?.id]);

  return (
    <main>
      {loading ? (
        "loading..."
      ) : (
        <section className={styles.section}>
          <Swiper navigation>
            {listing?.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className={styles.imgDiv}
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.info}>
            <p className={styles.name}>{listing?.name}</p>
            <p className={styles.address}>
              <FaMapMarkedAlt className={styles.addIcon} />
              <span>{listing?.address}</span>
            </p>
            <p>
              <b>Description- </b>
              {listing?.description}
            </p>
            <div className={styles.typeDiv}>
              <p className={styles.type}>
                {listing?.type == "rent" ? "Per Night Onwards" : "For Sell"}
              </p>
              <p className={styles.price}>
                ₹{" "}
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
            </div>
            <div className={styles.ul}>
              <span className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </span>
            </div>
            <button className={styles.contact}>Contact Landlord</button>
          </div>
        </section>
      )}
    </main>
  );
};

export default Index;
