import React from "react";
import styles from "./Register.module.scss";
import GoogleAuth from "../../components/Auth/GoogleAuth";
import { useFormik } from "formik";
import { registerSchema } from "../../utils/validations";
import { registerUser } from "../../utils/authHelpers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ROUTES } from "../../constants/routes";
import backgroundImage from "../../assets/login-background.png";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async ({ firstname, lastname, email, password }) => {
      const res = await registerUser(firstname, lastname, email, password, "MANUAL");
      res.success ? navigate(ROUTES.DASHBOARD) : toast.error(res.message);
    },
  });

  const handleGoogleRegister = async (user: any) => {
    const { given_name, family_name, email, id } = user;
    const res = await registerUser(given_name, family_name, email, id, "GOOGLE_SSO");
    res.success ? navigate(ROUTES.DASHBOARD) : toast.error(res.message);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>Create an account</h2>
        <p className={styles.subtitle}>Join us get unlimited access to data & information.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>

          <div className={styles.formGroup}>
            <label htmlFor="firstname">
                    First Name<span>*</span>
                  </label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              className={`${styles.input} ${errors.firstname && touched.firstname ? styles.errorInput : ""}`}
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              />
            {errors.firstname && touched.firstname && (
              <span className={styles.error}>{errors.firstname}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastname">
                    Last Name<span>*</span>
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Enter your last name"
              className={`${styles.input} ${errors.lastname && touched.lastname ? styles.errorInput : ""}`}
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              />
            {errors.lastname && touched.lastname && (
              <span className={styles.error}>{errors.lastname}</span>
            )}
          </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">
                  Email<span>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className={`${styles.input} ${errors.email && touched.email ? styles.errorInput : ""}`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <span className={styles.error}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
                  Password<span>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className={`${styles.input} ${errors.password && touched.password ? styles.errorInput : ""}`}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <span className={styles.error}>{errors.password}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">
                  Confirm Password<span>*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className={`${styles.input} ${errors.confirmPassword && touched.confirmPassword ? styles.errorInput : ""}`}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className={styles.error}>{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className={styles.button}>Register</button>
        </form>

        <div className={styles.orText}>Or</div>

        <GoogleAuth buttonlabel="Register with Google" onSuccess={handleGoogleRegister} />

        <div className={styles.footerText}>
          Already have an account? <a href={ROUTES.LOGIN}>Login</a>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <img src={backgroundImage} alt="Register" className={styles.image} />
      </div>
    </div>
  );
};

export default Register;
