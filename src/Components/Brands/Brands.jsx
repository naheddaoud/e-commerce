import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Container, Row, Col, Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Brands.module.css";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  //Slider setting//
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 500,
    slidesToShow: 5,
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

  //Get Brand from API//
  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/Brands`
    );
    console.log(data.data);
    setBrands(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5 py-5">
        <Oval height={80} width={80} color="#4fa94d" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <Container>
      <h2 className="text-center my-4">Brands</h2>
      <Slider {...settings}>
        {brands.map((brand) => (
          <div key={brand._id}>
            <Card className={styles.card}>
              <Card.Img
                variant="top"
                src={brand.image}
                alt={brand.name}
                className={styles.cardImg}
              />
              <Card.Body>
                <Card.Title>{brand.name}</Card.Title>
                <Link
                  to={`/brandproducts/${brand._id}`}
                  className="btn btn-primary"
                >
                  View Products
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </Container>
  );
}
