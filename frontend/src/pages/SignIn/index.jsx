import React from "react";
import { useNavigate } from "react-router-dom";

const index = () => {
  const navigate = useNavigate();
  return (
    <main>
      <h1>This Login Page</h1>
      <button onClick={() => navigate("/sign-up")}>Sign Up</button>
    </main>
  );
};

export default index;
