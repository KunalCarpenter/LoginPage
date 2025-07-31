import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import backgroundImg from '../../assets/login-background.png';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short')
    .required('Required'),
});

const Login: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>Welcome back !</h2>
        <p className={styles.subtitle}>
          Enter to get unlimited access to data & information.
        </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={() => {}}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email<span>*</span></label>
                <Field name="email" type="email" placeholder="Enter your email" className={errors.email ? `${styles.input} ${styles.errorInput}` : styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password">Password<span>*</span></label>
                <Field name="password" type="password" placeholder="Enter your password" className={errors.password ? `${styles.input} ${styles.errorInput}` : styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <div className={styles.row}>
              <label className={styles.checkboxLabel}>
                  <Field type="checkbox" name="remember" /> Remember me
              </label>
                <a href="/" className={styles.link}>Forgot your password ?</a>
            </div>

              <button type="submit" className={styles.button}>Log In</button>
              <p className={styles.orText}>or</p>
              <div className={styles.googleWrapper}>
                <button type="button" className={styles.googleBtn}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" />
                    <span>Login with Google</span>
                </button>
              </div>
            <div className={styles.footerText}>
                Don't have an account? <Link to="/register">Register here</Link>
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

export default Login;
