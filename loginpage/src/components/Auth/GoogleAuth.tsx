import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import styles from "./GoogleAuth.module.scss";

interface GoogleAuthProps {
  buttonlabel: string;
  onSuccess: (response: any) => void;
}

const GoogleAuth: React.FC<GoogleAuthProps> = ({ buttonlabel, onSuccess }) => {
  const googleAuth = useGoogleLogin({ onSuccess: handleGoogleAuthSuccess });

  async function handleGoogleAuthSuccess(response: any) {
    const { access_token } = response;
    const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const data = await res.json();
    onSuccess(data);
  }

  return (
    <div className={styles.googleWrapper}>
      <button
        type="button"
        className={styles.googleBtn}
        onClick={() => googleAuth()}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google icon"
        />
        <span>{buttonlabel}</span>
      </button>
    </div>
  );
};

export default GoogleAuth;
