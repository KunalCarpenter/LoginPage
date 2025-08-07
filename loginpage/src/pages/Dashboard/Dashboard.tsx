import React from "react";
import { getUser, clearUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import styles from "./Dashboard.module.scss";

const Dashboard: React.FC = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>
        Welcome, {user?.firstname} {user?.lastname}
      </h1>
      <p>Email: {user?.email}</p>
      <p>Type: {user?.type}</p>
      <button onClick={handleLogout} className={styles.LogoutButton}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
