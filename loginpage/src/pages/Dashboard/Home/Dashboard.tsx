import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import UserAvatar from "../../../components/nav/UserAvatar";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <header className={styles.navbar}>
        <div>
          <img
            src="/logo.svg"
            alt="Logo"
            height="50"
            style={{ borderRadius: "20%" }}
            onClick={() => navigate("/dashboard")}
          />
        </div>
        <nav className={styles.navLinks}>
          <div className={styles.Home}>
            <NavLink to="/dashboard">Home</NavLink>
          </div>
          <div className={styles.ProductEditor}>
            <NavLink to="/dashboard/product-editor">Product Editor</NavLink>
          </div>
        </nav>
        <UserAvatar />
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
