import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../../components/ui/Loader/Loading";


function PrivateRouter({ children }) {
  const { isLoaded, isSignedIn } = useAuth(); // provided by clerk
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="bg-background min-h-screen flex flex-col justify-center items-center text-center">
        <Loading/>
      </div>
    );
  }
  return isSignedIn ? children : <Navigate to={"/sign-in"} replace state={{ from: location }} />;
}

export default PrivateRouter;
