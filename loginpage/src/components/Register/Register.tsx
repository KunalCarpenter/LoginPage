import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Register.module.scss";
import { Link, useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/login-background.png";
import GoogleAuth from "../GoogleAuth/GoogleAuth";
import { saveuser } from "../../Utilities/database";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";
import { registerSchema } from "./utilities";

const Register: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      navigate("/dashboard");
    }
  }, []);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedData = await bcrypt.hash(values.password, salt);
      console.log(hashedData, values.password);

      await saveuser({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: hashedData,
        authType: "MANUAL",
        createdAt: new Date(),
      });
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div>
        <Toaster />
      </div>
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>Create an account</h2>
        <p className={styles.subtitle}>
          Join us get unlimited access to data & information.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors }) => (
            <Form className={styles.form}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstname">
                    First Name<span>*</span>
                  </label>
                  <Field
                    name="firstname"
                    type="text"
                    placeholder="Enter your first name"
                    className={
                      errors.firstname
                        ? `${styles.input} ${styles.errorInput}`
                        : styles.input
                    }
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastname">
                    Last Name<span>*</span>
                  </label>
                  <Field
                    name="lastname"
                    type="text"
                    placeholder="Enter your last name"
                    className={
                      errors.lastname
                        ? `${styles.input} ${styles.errorInput}`
                        : styles.input
                    }
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className={
                    errors.email
                      ? `${styles.input} ${styles.errorInput}`
                      : styles.input
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">
                  Password<span>*</span>
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className={
                    errors.password
                      ? `${styles.input} ${styles.errorInput}`
                      : styles.input
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">
                  Confirm Password<span>*</span>
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className={
                    errors.confirmPassword
                      ? `${styles.input} ${styles.errorInput}`
                      : styles.input
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button type="submit" className={styles.button}>
                Register
              </button>
              <p className={styles.orText}>or</p>
              <GoogleAuth
                buttonlabel="Register with Google"
                onSuccess={async (response) => {
                  try {
                    await saveuser({
                      firstname: response.given_name,
                      lastname: response.family_name,
                      email: response.email,
                      password: response.id,
                      authType: "GOOGLE_SSO",
                      createdAt: new Date(),
                    });
                    toast.success("Registration successful!");
                  } catch (error) {
                    toast.error("Already Registered");
                  }
                }}
              />
              <p className={styles.footerText}>
                By registering, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>

              <div className={styles.footerText}>
                Already have an account? <Link to="/">Log in here</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className={styles.rightPanel}>
        <img src={backgroundImg} className={styles.image} />
      </div>
    </div>
  );
};

export default Register;
