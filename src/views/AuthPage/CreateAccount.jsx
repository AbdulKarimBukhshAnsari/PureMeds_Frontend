import React from "react";
import { SignUp } from "@clerk/clerk-react";

function CreateAccount() {
  return (
    <>
      <div className="relative flex justify-center items-center w-full min-h-screen bg-white overflow-hidden">
        
        {/* === Background blobs === */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-10 w-[300px] h-[300px] bg-orange-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 right-[-50px] w-[250px] h-[250px] bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-[-60px] w-[200px] h-[200px] bg-orange-500/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 right-20 w-[350px] h-[350px] bg-orange-500/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-[150px] h-[150px] bg-orange-500/40 rounded-full blur-2xl"></div>
          <div className="absolute top-10 right-1/4 w-[180px] h-[180px] bg-orange-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-[220px] h-[220px] bg-orange-500/15 rounded-full blur-2xl"></div>
        </div>

        {/* === Sign Up Form === */}
        <div className="relative z-10 flex justify-center items-center w-full h-fit mt-8 mb-10">
          <SignUp
            signInUrl="/sign-in"
            signInForceRedirectUrl="/sign-in"
            appearance={{
              theme: "simple",
              variables: { colorPrimary: "#156874", colorWarning: "white" },
            }}
            forceRedirectUrl="/dashboard"
          />
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
