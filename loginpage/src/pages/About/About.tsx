import styles from "./About.module.scss";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import UserAvatar from '../../components/nav/UserAvatar';

const About: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <header className={styles.navbar}>
        <div>
          <img
            src="/logo.svg"
            alt="Logo"
            height="50"
            style={{ borderRadius: "50%" }}
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
          <div className={styles.About}>
            <NavLink to="/dashboard/about">About</NavLink>
          </div>
        </nav>
        <UserAvatar />
      </header>
      <main className={styles.content}>
        <Outlet />
        <div className={styles.about}>
      <h1>About This Application</h1>
      <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
        This is a comprehensive product management dashboard built with React and TypeScript.
      </p>
      <h2>Features:</h2>
      <ul>
        <li>Manual and Bulk Product Management (Add, Edit, Delete)</li>
        <li>Advanced Data Import/Export (XLSX & CSV)</li>
        <li>Client-side Filtering and Pagination</li>
        <li>Secure User Authentication</li>
      </ul>
    </div>
      </main>
    </div>
  )
}

export default About;