import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import backgroundImg from '../../assets/login-background.png';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
//import {GoogleLogin} from '@react-oauth/google';
//import {jwtDecode} from 'jwt-decode';

const LoginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short')
    .required('Required'),
});

const Login: React.FC = () => {
  const googleAuth = useGoogleLogin({
    onSuccess: handleGoogleAuthSuccess
    
  });
  async function handleGoogleAuthSuccess(response: any) {
    
    const { access_token } = response;
    console.log("Access Token:", access_token); 
    const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await res.json();
    console.log("Email:", data.email);
    console.log("First Name:", data.given_name);
    console.log("Last Name:", data.family_name);
    
    // const googleUserInfoResponse = await googleAuthUserInfoService(access_token);
    
    // if (googleUserInfoResponse?.status !== 200) {
      //   return showCustomToast(toastTitles.ERROR, messages.errorWithGoogleAuth);
      // }
      
      // const userInfo = googleUserInfoResponse.data;
      // const params = {
        //   email: userInfo.email,
        //   password: userInfo.id,
        //   authType: authTypes.GOOGLE_SSO
        // };
        
        // userSigninMutation.mutate(params);
        
      }
      
      //const navigate = useNavigate();
      //const handleGoogleLogin = useGoogleLogin({
        //  onSuccess: () => {navigate('/dashboard')},
        //  onError: () =>{console.log("Login failed")}
        //});
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
          // onSubmit={() => {navigate('/dashboard');}}
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
                {/* <GoogleLogin 
                  onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      console.log(jwtDecode(credentialResponse.credential || ""));
                      //navigate('/dashboard');
                    }}
                  onError={() => {console.log("Login Failed")}}/> */}
                <button type="button" className={styles.googleBtn} onClick={() => googleAuth()}>
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
