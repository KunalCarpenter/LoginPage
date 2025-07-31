import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import backgroundImg from '../../assets/login-background.png';

const RegisterSchema = Yup.object({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too short').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Required')
});

const Register: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>Create an account</h2>
        <p className={styles.subtitle}>Join us get unlimited access to data & information.</p>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={() => {}}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor='firstname'>First Name<span>*</span></label>
                <Field name="firstname" type="text" placeholder="Enter your first name" className={errors.firstname ? `${styles.input} ${styles.errorInput}` : styles.input} />
                <ErrorMessage name="firstname" component="div" className={styles.error} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor='lastname'>Last Name<span>*</span></label>
                <Field name="lastname" type="text" placeholder="Enter your last name" className={errors.lastname ? `${styles.input} ${styles.errorInput}` : styles.input} />
                <ErrorMessage name="lastname" component="div" className={styles.error} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='email'>Email<span>*</span></label>
              <Field name="email" type="email" placeholder="Enter your email" className={errors.email ? `${styles.input} ${styles.errorInput}` : styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='password'>Password<span>*</span></label>
              <Field name="password" type="password" placeholder="Enter your password" className={errors.password ? `${styles.input} ${styles.errorInput}` : styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='confirmPassword'>Confirm Password<span>*</span></label>
              <Field name="confirmPassword" type="password" placeholder="Confirm your password" className={errors.confirmPassword ? `${styles.input} ${styles.errorInput}` : styles.input} />
              <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
            </div>

            <button type='submit' className={styles.button}>Register</button>
            <p className={styles.orText}>or</p>
            <div className={styles.googleWrapper}>
                <button type="button" className={styles.googleBtn}>
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google icon" />
                    <span>Register with Google</span>
                </button>
            </div>
            {/* <p className={styles.footerText}>
              By registering, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p> */}

            <div className={styles.footerText}>
              Already have an account? <Link to="/">Log in here</Link>
            </div>
          </Form>)}
        </Formik>
      </div>

      <div className={styles.rightPanel}>
        <img src={backgroundImg}  className={styles.image} />
      </div>
    </div>
  );
};

export default Register;
