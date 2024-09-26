import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import { Container, Row, Col, Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Categories.module.css";

export default function Categories () {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  //Slider setting//
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:4,
    slidesToScroll: 1,
    };

  //Get Categories from API//
   async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    console.log(data.data);
    setCategories(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
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
      <h2 className="text-center my-4">Categories</h2>
      <Slider {...sliderSettings}>
        {categories.map((category) => (
          <div key={category._id}>
            <Card className={styles.categoryCard}>
              <Card.Img variant="top" src={category.image} alt={category.name} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Link to={`/categoryproducts/${category._id}`} className="btn btn-primary">
                  View Products
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </Container>
  );
};
