import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./screens/Dashboard";
import { useStores } from "./store/rootStore";

const AppRoutes = () => {
  const store = useStores();
  useEffect(() => {
    store.authStore.init();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;
