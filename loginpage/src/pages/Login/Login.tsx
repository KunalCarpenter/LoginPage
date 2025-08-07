import React from "react";
import styles from "./Login.module.scss";
import GoogleAuth from "../../components/Auth/GoogleAuth";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/validations";
import { loginUser } from "../../utils/authHelpers";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ROUTES } from "../../constants/routes";
import backgroundImage from "../../assets/login-background.png";
const Login: React.FC = () => {
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async ({ email, password }) => {
      const res = await loginUser(email, password);
      res.success ? navigate(ROUTES.DASHBOARD) : toast.error(res.message);
    },
  });

  const handleGoogleLogin = async (user: any) => {
    const { email, id } = user;
    const res = await loginUser(email, id);
    res.success ? navigate(ROUTES.DASHBOARD) : toast.error(res.message);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>Welcome Back !</h2>
        <p className={styles.subtitle}>Enter to get unlimited access to data & information.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">
                  Email<span>*</span>
                </label>
            <input
              className={`${styles.input} ${errors.email && touched.email ? styles.errorInput : ""}`}
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">
                  Password<span>*</span>
                </label>
            <input
              className={`${styles.input} ${errors.password && touched.password ? styles.errorInput : ""}`}
              type="password"
              name="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          <div className={styles.row}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkboxLabel} />
              <div> Remember me </div>
            </label>
            <a href="/" className={styles.link}>
                  Forgot your password ?
            </a>
            </div>
          <button type="submit" className={styles.button}>Log In</button>
        </form>

        <div className={styles.orText}>Or</div>

        <GoogleAuth buttonlabel="Login with Google" onSuccess={handleGoogleLogin} />

        <div className={styles.footerText}>
          Don't have an account? <a href={ROUTES.REGISTER}>Register</a>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <img src={backgroundImage} alt="Login" className={styles.image} />
      </div>
    </div>
  );
};

export default Login;
