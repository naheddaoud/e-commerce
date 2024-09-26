import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Oval } from "react-loader-spinner";
import _ from 'lodash'; // to use it in syncronization cart
import styles from './Cart.module.css'
import { Container } from 'react-bootstrap';

export default function Cart() {
  let [products, setProducts] = useState(null);
  let [loading, setLoading] = useState(true);
  let { getCartItems, removeFromCart, updateCartItemQuantity } = useContext(CartContext);

  // Function to get items of the cart
  async function getItems() {
    let { data } = await getCartItems();
    setProducts(data);
    setLoading(false);
  }

  // Function to update total cart price and num of items (as total quantity)
  function updateCartDetails(updatedProducts) {
    const numOfCartItems = updatedProducts.reduce((acc, product) => acc + product.count, 0);
    const totalCartPrice = updatedProducts.reduce((acc, product) => acc + (product.count * product.price), 0);
    
    setProducts(prev => ({
      ...prev,
      data: {
        ...prev.data,
        products: updatedProducts,
        numOfCartItems: numOfCartItems, 
        totalCartPrice: totalCartPrice,
      }
    }));
  }

  // Function to remove item from the cart
  async function handleRemove(productId) {
    const updatedProducts = products.data.products.filter(product => product.product.id !== productId);
    
    // Update state after removing the item
    updateCartDetails(updatedProducts);

    await removeFromCart(productId);
  }

  // Function to handle debounced update for quantity changes
  const debouncedUpdateQuantity = _.debounce(async (productId, newQuantity) => {
    await updateCartItemQuantity(productId, newQuantity);
  }, 500); // sync after half second

  // Function to increase item count
  function handleIncrease(productId, currentCount) {
    const updatedProducts = products.data.products.map(product => {
      if (product.product.id === productId) {
        return { ...product, count: currentCount + 1 };
      }
      return product;
    });

    // Update state and cart details
    updateCartDetails(updatedProducts);

    // Debounced update
    debouncedUpdateQuantity(productId, currentCount + 1);
  }

  // Function to decrease item count
  function handleDecrease(productId, currentCount) {
    if (currentCount > 1) {
      const updatedProducts = products.data.products.map(product => {
        if (product.product.id === productId) {
          return { ...product, count: currentCount - 1 };
        }
        return product;
      });

      // Update state and cart details//sync
      updateCartDetails(updatedProducts);

      // Debounced update//sync
      debouncedUpdateQuantity(productId, currentCount - 1);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Container>
      <h2 className="text-center">Cart</h2>
      {loading ? (
      <div className={styles.loaderContainer}>
      <Oval height={80} width={80} color="#4fa94d" visible={true} />
    </div>
      ) : (
        <>
          <p className='text-main fw-bold ms-3'>
            Number of cart items: {products.numOfCartItems}
          </p>
          <p className='text-main fw-bold ms-3'>
            Total Cart Price: {products.data.totalCartPrice} EGP
          </p>
          {products.data.products.map(product => (
            <div key={product.product.id} className='row p-2 align-items-center border-1 m-0 border-bottom'>
              <div className='col-xs-12 col-md-3'>
                <div className='image-fluid'>
                  <img src={product.product.imageCover} alt={product.product.title} width={200} height={220} />
                </div>
              </div>
              <div className='col-xs-12 col-md-7'>
                <div className='item'>
                  <h3 className='h5 fw-bold'>{product.product.title.split(" ").splice(0, 4).join(" ")}</h3>
                  <p className='text-main fw-bold'>Price: {product.price} EGP</p>
                  <button className='btn' onClick={() => handleRemove(product.product.id)}>
                    <i className='fas fa-trash-can text-danger'></i> Remove
                  </button>
                </div>
              </div>
              <div className='col-xs-12 col-md-2'>
                <div className='count'>
                  <button className="btn btn-brdr p-1" onClick={() => handleIncrease(product.product.id, product.count)}> + </button>
                  <span className='mx-2'>{product.count}</span>
                  <button className='btn btn-brdr p-1' onClick={() => handleDecrease(product.product.id, product.count)}> - </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </Container>
  );
}
