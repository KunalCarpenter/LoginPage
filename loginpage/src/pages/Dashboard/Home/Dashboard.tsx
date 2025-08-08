import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import styles from "./Dashboard.module.scss";
import UserAvatar from "../../../components/nav/UserAvatar";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.navbar}>
        <div className={styles.logo}>🛒 E-Commerce</div>
        <nav className={styles.navLinks}>
          <NavLink to="/dashboard">Home</NavLink>
          <NavLink to="/dashboard/product-editor">Product Editor</NavLink>
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
