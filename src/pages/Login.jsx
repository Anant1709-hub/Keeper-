import React from "react";
import Aurora from "../components/Aurora.jsx";
import LoginForm from "../components/LoginForm.jsx";

function LoginPage() {
  return (
    <div>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
