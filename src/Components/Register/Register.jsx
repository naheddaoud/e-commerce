import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {BallTriangle} from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"

export default function Signup() {
  let navigate = useNavigate()
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const register = async (values) => {
    setLoading(true)
    let {data} = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setApiError(err.responce.data.message);
        setLoading(false)
      });
    console.log(data);
    if (data.message ==="success") {
      setLoading(false);
      navigate('/login')
    }

  };

  let validationSchema = Yup.object({
    name: Yup.string().required("The name is required").min("3").max("25"),

    email: Yup.string()
      .required("The email is required")
      .email("Email is invalid"),

    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][\w@$!#]{5,8}$/,
        "Invalid syntax must be include one of @ $ ! # and one character upercase and lowercase"
      ),

    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Password dosn't match"),

    phone: Yup.string()
      .required("The phone is required")
      .matches(/^01[0-9]{9}$/, "The Phone number is not Egyption number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,
    onSubmit: register,
  });

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 w-150`}>
      <div className= {`p-4 border rounded border-radius-10 border-color-#D4D4EA ${styles.form}`}>
      <h2 className= "text-left mb-4">Register</h2>
      <form onSubmit= {formik.handleSubmit} action="">
        {apiError ? (
          <div class="alert alert-danger py-2" role="alert">
            {apiError}
          </div>
        ) : (
          ""
        )}
        <label htmlFor="name">Name<spam className='text-danger'> *</spam></label>
        <input
          type="text"
          id="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          name
          className="form-control mb-3"
        />
        {formik.errors.name && formik.touched.name ? (
          <div class="alert alert-danger py-2" role="alert">
            {formik.errors.name}
          </div>
        ) : null}
        <label htmlFor="email">Email address<spam className='text-danger'> *</spam></label>
        <input
          type="email"
          id="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          email
          className="form-control mb-3"
        />
        {formik.errors.email && formik.touched.email ? (
          <div class="alert alert-danger py-2" role="alert">
            {formik.errors.email}
          </div>
        ) : null}
        <label htmlFor="password">Password<spam className='text-danger'> *</spam></label>
        <input
          type="password"
          id="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          password
          className="form-control mb-3"
        />
        {formik.errors.password && formik.touched.password ? (
          <div class="alert alert-danger py-2" role="alert">
            {formik.errors.password}
          </div>
        ) : null}
        <label htmlFor="rePassword">rePassword<spam className='text-danger'> *</spam></label>
        <input
          type="password"
          id="rePassword"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          rePassword
          className="form-control mb-3"
        />
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <div class="alert alert-danger py-2" role="alert">
            {formik.errors.rePassword}
          </div>
        ) : null}
        <label htmlFor="phone">Phone<spam className='text-danger'> *</spam></label>
        <input
          type="tel"
          id="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          phone
          className="form-control mb-3"
        />
        {formik.errors.phone && formik.touched.phone ? (
          <div class="alert alert-danger py-2" role="alert">
            {formik.errors.phone}
          </div>
        ) : null}
        {loading ? (
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
         />):(
          <button type="submit" disabled={!(formik.isValid && formik.dirty)} className="btn bg-main text-light">
          Signup
        </button>
         )}
      </form>
      </div>
    </div>
  );
}
