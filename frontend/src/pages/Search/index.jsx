import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { useNavigate } from "react-router-dom";
import { get } from "../../services/publicRequest";
import { FaMapMarkedAlt } from "react-icons/fa";
import { addCommas } from "../../utils/constants";

const Index = () => {
  const [formData, setFormData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [filterListings, setFilterListings] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "searchTerm") {
      setFormData({ ...formData, searchTerm: e.target.value });
    }

    if (
      e.target.name === "all" ||
      e.target.name === "rent" ||
      e.target.name === "sell"
    ) {
      setFormData({ ...formData, type: e.target.name });
    }

    if (
      e.target.name === "parking" ||
      e.target.name === "furnished" ||
      e.target.name === "offer"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }

    if (e.target.name === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setFormData({ ...formData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", formData.searchTerm);
    urlParams.set("type", formData.type);
    urlParams.set("parking", formData.parking);
    urlParams.set("furnished", formData.furnished);
    urlParams.set("offer", formData.offer);
    urlParams.set("sort", formData.sort);
    urlParams.set("order", formData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const getFilterListings = async () => {
    try {
      const urlParams = new URLSearchParams(location.search);
      const searchQuery = urlParams.toString();
      const res = await get(`/listing/get?${searchQuery}`);
      setFilterListings(res.data.listing);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (
      urlParams.get("searchTerm") ||
      urlParams.get("type") ||
      urlParams.get("parking") ||
      urlParams.get("furnished") ||
      urlParams.get("offer") ||
      urlParams.get("sort") ||
      urlParams.get("order")
    ) {
      setFormData({
        searchTerm: urlParams.get("searchTerm") || "",
        type: urlParams.get("type") || "all",
        parking: urlParams.get("parking") || false,
        furnished: urlParams.get("furnished") || false,
        offer: urlParams.get("offer") || false,
        sort: urlParams.get("sort") || "createdAt",
        order: urlParams.get("order") || "desc",
      });
    }

    getFilterListings();
  }, [location.search]);

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchTerm}>
            <label>Search Term :</label>
            <input
              value={formData?.searchTerm}
              onChange={handleChange}
              name="searchTerm"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className={styles.type}>
            <label>Type :</label>
            <div className={styles.allCheckboxs}>
              <div className={styles.checkboxDiv}>
                <input
                  checked={formData?.type === "all"}
                  onChange={handleChange}
                  className={styles.checkbox}
                  type="checkbox"
                  name="all"
                />
                <span>Rent & Sell</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="rent"
                  checked={formData?.type === "rent"}
                  onChange={handleChange}
                />
                <span>Rent</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="sell"
                  checked={formData?.type === "sell"}
                  onChange={handleChange}
                />
                <span>Sell</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="offer"
                  checked={
                    formData?.offer?.toString() === "true" ? true : false
                  }
                  onChange={handleChange}
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
                  checked={
                    formData?.parking?.toString() === "true" ? true : false
                  }
                  onChange={handleChange}
                />
                <span>Parking</span>
              </div>
              <div className={styles.checkboxDiv}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name="furnished"
                  checked={
                    formData?.furnished?.toString() === "true" ? true : false
                  }
                  onChange={handleChange}
                />
                <span>Furnished</span>
              </div>
            </div>
          </div>
          <div className={styles.selectDiv}>
            <label>Sort :</label>
            <select name="sort_order" onChange={handleChange}>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button type="submit" className={styles.search}>
            Search
          </button>
        </form>
      </div>
      <div className={styles.right}>
        <h2 className={styles.title}>Listing Results</h2>
        <section className={styles.allCards}>
          {filterListings.map((item, id) => {
            return (
              <div key={id} className={styles.singleCard}>
                <img
                  className={styles.img}
                  alt="img"
                  src={item?.imageUrls[0]}
                  onClick={() => navigate(`/listing/${item?._id}`)}
                />
                <div className={styles.info}>
                  <h3 onClick={() => navigate(`/listing/${item?._id}`)}>
                    {item?.name}
                  </h3>
                  <p className={styles.address}>
                    <FaMapMarkedAlt className={styles.addIcon} />
                    <span>{item?.address}</span>
                  </p>
                  <p className={styles.description}>{item?.description}</p>
                  <p className={styles.price}>
                    <span
                      className={`${
                        item?.type === "sell" ? styles.sell : styles.rent
                      } ${styles.type}`}
                    >
                      {item?.type}
                    </span>{" "}
                    ₹
                    {item?.offer ? (
                      <>
                        <span className={styles.lineThrough}>
                          {addCommas(item?.regularPrice)}
                        </span>{" "}
                        {addCommas(item?.discountPrice)} /-
                      </>
                    ) : (
                      `${addCommas(item?.regularPrice)} /-`
                    )}
                  </p>
                  <div className={styles.rooms}>
                    <p>{item?.bedrooms} Beds</p>
                    <p>{item?.bathrooms} Baths</p>
                  </div>
                </div>
              </div>
            );
          })}
          <p className={styles.showMore}>Show more</p>
        </section>
      </div>
    </main>
  );
};

export default Index;
