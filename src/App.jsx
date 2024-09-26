import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Products from './Components/Products/Products'
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Category from "./Components/Category/Category";
import Cart from "./Components/Cart/Cart";
import CounterContextProvider from "./Context/CounterContext";
import { useContext, useEffect } from "react";
import { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";

export default function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categoryproducts/:id",
          element: (
            <ProtectedRoute>
              <CategoryProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "brandproducts/:id",
          element: (
            <ProtectedRoute>
              <BrandProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
              <Register />
          ),
        },
        {
          path: "login",
          element: (
              <Login />
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "category/:category._id",
          element: (
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productdetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails/>
            </ProtectedRoute>
          ),
        },
      ],
    },
    { path: "*", element: <ProtectedRoute><NotFound /></ProtectedRoute> },
  ]);

  let { setUserToken } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <div>
      <CounterContextProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CounterContextProvider>
    </div>
  );
}
