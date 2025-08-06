import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <h1>Welcome to the Dashboard</h1>
      <button
        onClick={() => {
          toast.success("logout Successfully");
          logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
