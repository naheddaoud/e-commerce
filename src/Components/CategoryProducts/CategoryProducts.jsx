import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from './CategoryProducts.module.css';
import { Oval } from "react-loader-spinner";
import { Card, Container } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast/headless";
import { CartContext } from "../../Context/CartContext";

export default function CategoryProducts() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //function to get Category Products//
  async function getCategoryProducts() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id }`
      );
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching category products:", error);
      alert("An error occurred while fetching the products. Please try again later.");
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getCategoryProducts();
  }, []);

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

  //Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <Container>
      <h2 className="text-center my-4">Category Products</h2>
      {loading ? (
        <div className={styles.loaderContainer}>
        <Oval height={80} width={80} color="#4fa94d" visible={true} />
      </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <Card className={styles.card}>
                <Link to={`/productdetails/${product.id}`}>
                <Card.Img
                  src={product.imageCover}
                  alt={product.title}
                  className='{}'
                />
                </Link>
                <Card.Body>
                  <Card.Title>{truncateText(product.title,20)}</Card.Title>
                  <p className={styles.cardPrice}>Price: {product.price} EGP</p>
                </Card.Body>
                <Link
                  className="btn btn-primary"
                  onClick={() => postToCart(product.id)}
                >
                Add to Cart <FaShoppingCart />
                </Link>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};


