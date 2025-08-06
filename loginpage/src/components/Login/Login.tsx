import React,{useEffect} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import backgroundImg from '../../assets/login-background.png';
import { Link } from 'react-router-dom';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { getUserByEmail } from '../../Utilities/database';
import { useNavigate } from 'react-router-dom';
//import { useGoogleLogin } from '@react-oauth/google';
//import {GoogleLogin} from '@react-oauth/google';
//import {jwtDecode} from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import bcrypt from 'bcryptjs';

const LoginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Too short')
    .required('Required'),
});

const Login: React.FC = () => {

  // const googleAuth = useGoogleLogin({
  //   onSuccess: handleGoogleAuthSuccess
    
  // });
  // async function handleGoogleAuthSuccess(response: any) {
    
  //   const { access_token } = response;
  //   console.log("Access Token:", access_token); 
  //   const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   });

  //   const data = await res.json();
  //   console.log("Email:", data.email);
  //   console.log("First Name:", data.given_name);
  //   console.log("Last Name:", data.family_name);
    
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
        
      //}
      
      const navigate = useNavigate();
      useEffect(()=>{
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          navigate("/dashboard");
        }
      },[]);
      //const handleGoogleLogin = useGoogleLogin({
        //  onSuccess: () => {navigate('/dashboard')},
        //  onError: () =>{console.log("Login failed")}
        //});
      return (
    <div className={styles.wrapper}>
      <div><Toaster/></div>
      <div className={styles.leftPanel}>
        <h2 className={styles.title}>Welcome back !</h2>
        <p className={styles.subtitle}>
          Enter to get unlimited access to data & information.
        </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          // onSubmit={() => {navigate('/dashboard');}}
          onSubmit={async (values) => {
            const user = await getUserByEmail(values.email);
            if (!user) return toast.error("User not found");
            if (user.authType !== "MANUAL") return toast("! Use Google login");
            //const hashingPasswordtoCheck = await bcrypt.hash(user.password,10);
            
            
            const hashingPasswordtoCheck = await bcrypt.compare(values.password, user.password);
            if (!hashingPasswordtoCheck) return toast.error("Wrong password");
            //if (user.password !== values.password) return toast.error("Wrong password");
            console.log("hashed Password",hashingPasswordtoCheck);
            localStorage.setItem("userEmail",user.email);
            navigate("/dashboard");
            toast.success("Login successful!");

          }}
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

              <GoogleAuth buttonlabel="Login with Google" 
              onSuccess={async (response) => {
                const user = await getUserByEmail(response.email);
                if (!user) return toast.error("User not registered");
                if (user.authType !== "GOOGLE_SSO") return toast("! Use manual login");
                localStorage.setItem("userEmail",user.email);
                toast.success("Login successful!");
                navigate("/dashboard");
              }}/>
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
