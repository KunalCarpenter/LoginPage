import React from "react";

import { useGoogleLogin } from '@react-oauth/google';
import styles from './GoogleAuth.module.scss';
const GoogleAuth: React.FC<{buttonlabel : string; onSuccess: (response:any)=>void}> = (props) => {
    const googleAuth = useGoogleLogin({
        onSuccess: handleGoogleAuthSuccess
    });

    async function handleGoogleAuthSuccess(response: any) {
        const { access_token } = response;
        //console.log("Access Token:", access_token);
        const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const data = await res.json();
        //console.log("Email:", data.email);
        //console.log("First Name:", data.given_name);
        //console.log("Last Name:", data.family_name);
        props.onSuccess(data);
    }

    return (
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
            <span>{props.buttonlabel}</span>
        </button>
        
        </div>
    );
};

export default GoogleAuth;
