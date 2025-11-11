import { UserProfile } from "@clerk/clerk-react";
import React from "react";

function Profile() {
  return (
    <>
      <div className="mt-10">
        <div className="w-full max-w-3xl">
          <UserProfile
            appearance={{
              elements: {
                clcardBox: "w-10", // Tailwind classes applied inside Clerk
              },
              layout: {
                // ↓ Controls the width of the internal Clerk container
                width: "100px", // you can try 350px, 500px, etc.
              },
              theme: "simple",
              variables: { colorPrimary: "#156874", colorWarning: "white" },
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
