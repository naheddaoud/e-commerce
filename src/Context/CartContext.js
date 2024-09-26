import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export let CartContext = createContext();

export default function CartContextProvider(props) {
    // الحالة لإدارة عدد أصناف العربة
    const [numOfCartItems, setNumOfCartItems] = useState(0);

    // لجلب أصناف العربة
    function getCartItems() {
        let headers = {
            token: localStorage.getItem("userToken"),
        };
        return axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
            .then((response) => {
                // تحديث عدد أصناف العربة بناءً على البيانات المستلمة
                setNumOfCartItems(response.data.numOfCartItems);
                return response;
            })
            .catch((error) => error);
    }

    // لإضافة صنف إلى العربة
    function addToCart(productId) {
        let headers = {
            token: localStorage.getItem("userToken"),
        };
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId }, { headers })
            .then((response) => {
                // تحديث عدد أصناف العربة بعد الإضافة
                setNumOfCartItems(response.data.numOfCartItems);
                return response;
            })
            .catch((error) => error);
    }

    // لحذف صنف من العربة
    function removeFromCart(productId) {
        let headers = {
            token: localStorage.getItem("userToken"),
        };
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((response) => {
                // تحديث عدد أصناف العربة بعد الحذف
                setNumOfCartItems(response.data.numOfCartItems);
                return response;
            })
            .catch((error) => error);
    }

    // لتحديث كمية صنف معين في العربة
    function updateCartItemQuantity(productId, newQuantity) {
        let headers = {
            token: localStorage.getItem("userToken"),
        };
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newQuantity }, { headers })
            .then((response) => {
                // تحديث عدد أصناف العربة بعد تعديل الكمية
                setNumOfCartItems(response.data.numOfCartItems);
                return response;
            })
            .catch((error) => error);
    }

    // استخدام useEffect لجلب عدد الأصناف عند تحميل التطبيق
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            getCartItems();
        }
    }, []);

    return (
        <CartContext.Provider value={{ getCartItems, addToCart, removeFromCart, updateCartItemQuantity, numOfCartItems }}>
            {props.children}
        </CartContext.Provider>
    );
}
