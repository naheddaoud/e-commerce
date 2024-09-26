import React, { useEffect, useState, useContext } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import Slider from "react-slick";
import { FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast/headless";
import { CartContext } from "../../Context/CartContext";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(12); //to show initial products = 12 products

  //Get products from API
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log(data.data);
    setProducts(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  //To show 12 items in screen
  const handleShowMore = () => {
    setVisibleProducts(visibleProducts + 12);
  };
  let { addToCart } = useContext(CartContext);
  async function postToCart(id) {
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
    } else {
      toast.error("Failed to add the data to the cart", { duration: 1000 });
    }
    console.log(data);
  }
  //Slider setting//
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  //Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="container mt-2">
      {loading ? (
        <div className={styles.loaderContainer}>
          <Oval height={80} width={80} color="#4fa94d" visible={true} />
        </div>
      ) : (
        <Slider {...settings}>
          {products.slice(0, visibleProducts).map((product) => (
            <div key={product.id} className=" p-2 ">
              <Card className={styles.card}>
                <Link to={`/productdetails/${product.id}`}>
                  <Card.Img
                    variant="top"
                    src={product.imageCover}
                    alt={product.title}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{truncateText(product.title, 15)}</Card.Title>
                  <p className={styles.cardText}>{product.brand.name}</p>
                  <p className="font-lg text-primary ms-3">
                    {product.category.name}
                  </p>
                  <p className={styles.cardPrice}>Price: {product.price} EGP</p>
                  <Link
                    className="btn btn-primary me-4"
                    onClick={() => postToCart(product.id)}
                  >
                    Add to Cart <FaShoppingCart />
                  </Link>
                  <span className="font-sm">
                    <i className="fa fa-star rating-color "></i>{" "}
                    {product.ratingsAverage}
                  </span>
                </Card.Body>
              </Card>
            </div>
          ))}
          {visibleProducts < products.length && (
            <div className="text-center mt-5 py-5">
              <button
                className="btn btn-primary justify-content-between align-items-center"
                onClick={handleShowMore}
              >
                Show More
              </button>
            </div>
          )}
        </Slider>
      )}
    </div>
  );
}
