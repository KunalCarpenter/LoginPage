import React from "react";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Home/Dashboard.tsx";
import ProductEditor from "./pages/Dashboard/ProductEditor/ProductEditor.tsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import UnProtectedRoute from "./components/Auth/UnProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ROUTES } from "./constants/routes";

const App: React.FC = () => (
  <div>
    <Toaster />
    <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<UnProtectedRoute><Login /></UnProtectedRoute>} />
        <Route path={ROUTES.REGISTER} element={<UnProtectedRoute><Register /></UnProtectedRoute>} />
        <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path={ROUTES.PRODUCTEDITOR} element={<ProtectedRoute><ProductEditor /></ProtectedRoute>} />
      </Routes>
    </Router>
  </div>
);

export default App;
