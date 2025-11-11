import React from "react";
import { SignUp } from "@clerk/clerk-react";
import bgImage from "../../assets/bg14.png";

function CreateAccount() {
  return (
    <>
      <div
        className="flex justify-center items-center w-full min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="flex justify-center items-center w-full h-fit mt-8 mb-10">
          <SignUp
            signInUrl="/sign-in"
            signInForceRedirectUrl={"/sign-in"}
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

export default CreateAccount;
