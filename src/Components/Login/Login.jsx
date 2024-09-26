import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../Context/UserContext";

export default function Login () {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  let {setUserToken} = useContext(UserContext)

  // Define validation schema using
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrors({ apiError: "Invalid email or password" });
        } else {
          setErrors({
            apiError: "An unexpected error occurred. Please try again.",
          });
        }
        setSubmitting(false);
        setLoading(false);
      });
    console.log(data);
    if (data.message === "success") {
      setLoading(false);
      setUserToken(data.token)
      localStorage.setItem('userToken', data.token)
      navigate("/");    
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center vh-100 w-150`}
    >
      <div
        className={`p-4 border rounded border-radius-10 border-color-#D4D4EA ${styles.form}`}
      >
        <h2 className="text-center mb-4">Welcome back</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.apiError && (
                <div className="alert alert-danger">{errors.apiError}</div>
              )}

              <div className="form-group mb-3">
                <label htmlFor="email">
                  Email address<spam className="text-danger"> *</spam>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">
                  Password<spam className="text-danger"> *</spam>
                </label>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                disabled={isSubmitting}
              >
                {/* Define Loading spiner */}
                {isSubmitting ? (
                  <ThreeDots
                    visible={true}
                    height="25"
                    width="100"
                    color="#02fa1f"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Login"
                )}
              </button>
              <p>Don't have an account? <Link to="/Register">Register</Link>  </p>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
