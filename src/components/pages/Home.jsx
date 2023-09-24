import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
    navigate("/login");
  };
  setTimeout(() => {
    logout();
  }, 10000);
  return (
    <div>
      <h2>Logged in </h2>
      <Button onClick={logout} variant="contained">
        Log Out
      </Button>
    </div>
  );
};

export default Home;
