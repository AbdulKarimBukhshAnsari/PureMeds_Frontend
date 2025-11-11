import React from "react";
import { SignIn } from "@clerk/clerk-react";
import bgImage from "../../assets/bg14.png";

function Login() {
  return (
    <>
      <div
        className="flex justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage:`url(${bgImage})`}}
      >
        <div className="flex justify-center items-center w-full h-fit mt-16 mb-10">
          <SignIn
            signUpUrl="/sign-up"
            signInUrl="/sign-in"
            signUpForceRedirectUrl={"/sign-in"}
            appearance={{
              theme: "simple",
              variables: { colorPrimary: "#156874", colorWarning: "white" },
            }}
            forceRedirectUrl={"/dashboard"}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
