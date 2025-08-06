import React from "react";
import { getUser, clearUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const Dashboard: React.FC = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate(ROUTES.LOGIN);
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI" }}>
      <h1 style={{ marginBottom: "10px" }}>
        Welcome, {user?.firstname} {user?.lastname}
      </h1>
      <p>Email: {user?.email}</p>
      <p>Type: {user?.type}</p>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
