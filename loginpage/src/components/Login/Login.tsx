import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import backgroundImg from '../../assets/login-background.png';

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
          <Form className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="email">Email<span>*</span></label>
                <Field name="email" type="email" placeholder="Enter your email" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="password">Password<span>*</span></label>
                <Field name="password" type="password" placeholder="Enter your password" className={styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <div className={styles.row}>
              <label className={styles.checkboxLabel}>
                  <Field type="checkbox" name="remember" /> Remember me
              </label>
                <a href="/" className={styles.link}>Forgot your password ?</a>
            </div>

              <button type="submit" className={styles.button}>Log In</button>

            <div className={styles.footerText}>
                Don't have an account? <a href="#">Register here</a>
            </div>
          </Form>
        </Formik>
      </div>
      <div className={styles.rightPanel}>
        <img src={backgroundImg} className={styles.image} />
      </div>
    </div>
  );
};

export default Login;
