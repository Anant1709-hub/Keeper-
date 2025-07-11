import React from "react";
import Aurora from "../components/Aurora";
import SignUp from "../components/SignUpForm";

function SignUppage() {
  return (
    <div>
      <Aurora
        colorStops={["#3b0d71", "#00ffcc", "#ff4ec4"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <SignUp />
    </div>
  );
}

export default SignUppage;
