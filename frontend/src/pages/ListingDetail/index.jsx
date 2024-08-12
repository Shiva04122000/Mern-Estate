import React, { useEffect, useState } from "react";
import styles from "./ListingDetail.module.scss";
import { get } from "../../services/publicRequest";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaParking,
} from "react-icons/fa";
import "swiper/css/bundle";
import { addCommas } from "../../utils/constants";
import { useSelector } from "react-redux";

const Index = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState({});
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState(false);
  const [ownerDetails, setOwnerDetails] = useState({});
  const [message, setMessage] = useState("");
  const [showMsgErr, setShowMsgErr] = useState(false);
  const { user } = useSelector((state) => state?.user);
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

  const contactlandlord = async () => {
    try {
      const res = await get(`/user/${listing?.owner}`);
      setOwnerDetails(res?.data?.user);
    } catch (error) {
      console.log("error", error);
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
              <p
                className={listing?.type == "rent" ? styles.rent : styles.sell}
              >
                {listing?.type == "rent" ? "For Rent" : "For Sell"}
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
            {user?._id != listing.owner && (
              <div className={styles.contactDiv}>
                {contact ? (
                  <div className={styles.msgDiv}>
                    <p className={styles.text}>
                      Contact <b>{ownerDetails?.userName}</b> for
                      <b> {listing?.name}</b>
                    </p>
                    <form>
                      <textarea
                        rows={3}
                        type="text"
                        onChange={(e) => {
                          setMessage(e.target.value);
                          setShowMsgErr(message.length > 0 ? false : true);
                        }}
                        placeholder="Enter Your message here..."
                        required
                      />
                      {showMsgErr && (
                        <p className={styles.err}>Please add message !</p>
                      )}
                      <Link
                        to={`mailto:${ownerDetails?.email}?subject=Regarding ${listing?.name}&body=${message}`}
                        className={styles.contact}
                        onClick={(e) => {
                          if (!message) {
                            e.preventDefault();
                            setShowMsgErr(true);
                          }
                        }}
                      >
                        Send Message
                      </Link>
                    </form>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      contactlandlord();
                      setContact((prev) => !prev);
                    }}
                    className={styles.contact}
                  >
                    Contact Landlord
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Index;
