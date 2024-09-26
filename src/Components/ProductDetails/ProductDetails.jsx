import React, { useEffect, useState, useContext } from "react";
import styles from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import Slider from "react-slick";
import toast from "react-hot-toast/headless";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  async function ProductDetails() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProduct(data.data);
    console.log(data.data);
    setLoading(false);
  }
  useEffect(() => {
    ProductDetails();
  }, []);

  //Slider setting
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 1000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

  let { addToCart } = useContext(CartContext);
  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.error("Failed to add the data to the cart", { duration: 1000 });
    }
    console.log(data);
  }

  return (
    <>
      {loading ? (
        <div className={styles.loaderContainer}>
        <Oval height={80} width={80} color="#4fa94d" visible={true} />
      </div>
      ) : (
        <>
          <div className=" row align-items-center mt-2">
            <div className="col-md-4">
              <Slider {...settings}>
                {product.images.map((image) => (
                  <img className={styles.img}
                    src={image}
                    alt={image.title}
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-8">
              <div className="details">
                <h3 className="h5 fw-bold">{product.title}</h3>
                <p className="text-dark">Description:{" "}<span className="text-primary">{product.description}</span></p>
                <span className="text-main">
                Category:{" "} <span className=".text-main-light">{product.category.name}</span>
                </span>
                <br />
                <br />
                <span className="font-lg ">Available:{" "}{product.quantity} Unit</span>
                <div className="d-flex py-3 justify-content-between align-items-center">
                  <span className="font-sm text-main fw-bold">
                    {product.price} EGP
                  </span>
                  <span className="font-sm">
                    <i className="fa fa-star rating-color"></i>
                   {" "}{product.ratingsAverage}
                  </span>
                </div>
              </div>
              <Link
                to=""
                className="btn btn-primary"
                onClick={() => postToCart(product.id)}
              >
                Add to Cart <FaShoppingCart />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
