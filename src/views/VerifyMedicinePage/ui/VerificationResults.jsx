import { AlertTriangle, CheckCircle } from "lucide-react";
import React from "react";
import { SupplyChain } from "../../../utils/mockData";
import Button from "../../../components/ui/Buttons/Button";
import { Link } from "react-router-dom";
import {
  Package,
  Factory,
  TestTube,
  Server,
  UserRound,
} from "lucide-react";

function VerificationResults({
  result,
  VerificationMethod,
  VerificationResult,
}) {
  
const iconMap = {
  "Raw Material": Package,
  Manufacturer: Factory,
  "Quality Testing": TestTube,
  Platform: Server,
  Customer: UserRound,
};
  
const isVerified = result === "verified";
  const supplyChainRecord = SupplyChain?.[0];
  const events = supplyChainRecord?.events ?? [];
  const paddedEvents = [
    events[0],
    events[1],
    events[2],
    events[3],
    events[4],
    events[5] || { stage: "", actor: "", verified: false },
  ];
  return (
    <div>
      {result === "verified" ? (
        <div className="w-full flex justify-center mt-10">
      <div className="relative w-[90%] h-[480px] bg-white border-2 border-[#156874] rounded-2xl shadow-lg">

        {/* CENTRAL VERIFICATION SECTION */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        flex flex-col items-center text-center p-6">

          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-md
              ${isVerified ? "bg-green-100" : "bg-red-100"}`}
          >
            {isVerified ? (
              <CheckCircle className="h-14 w-14 text-green-600" />
            ) : (
              <XCircle className="h-14 w-14 text-red-600" />
            )}
          </div>

          <h2 className="text-2xl font-bold mt-4 text-[#156874]">
            {isVerified ? "Authentic Medicine" : "Unverified"}
          </h2>

          <p className="text-gray-600 mt-2 w-60">
            {isVerified
              ? "This product has been authenticated via blockchain supply chain verification."
              : "This product could not be authenticated. It may be tampered or invalid."}
          </p>
        </div>

        {/* SUPPLY CHAIN STEPS AROUND RECTANGLE */}
        {paddedEvents.map((event, i) => {
          if (!event) return null;
          const Icon = iconMap[event.stage] || CheckCircle;

          // Calculate positions on rectangle edges
          const positions = [
            "top-4 left-8",        // Top-left
            "top-4 left-1/2 -translate-x-1/2", // Top-center
            "top-4 right-8",       // Top-right
            "bottom-4 left-8",     // Bottom-left
            "bottom-4 left-1/2 -translate-x-1/2", // Bottom-center
            "bottom-4 right-8",    // Bottom-right
          ];

          return (
            <div
              key={i}
              className={`absolute ${positions[i]} flex flex-col items-center w-40`}
            >
              <div
                className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-md border-2
                  ${event.verified ? "bg-green-100 border-green-300" : "bg-gray-100 border-gray-300"}
                `}
              >
                <Icon
                  className={`h-9 w-9 ${
                    event.verified ? "text-green-600" : "text-gray-500"
                  }`}
                />
              </div>

              <p className="mt-3 font-semibold text-[#156874] text-center">
                {event.stage}
              </p>

              {event.verified && (
                <span className="mt-1 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Verified
                </span>
              )}

              <p className="text-gray-700 text-sm text-center mt-1">
                {event.actor}
              </p>

              <p className="text-gray-500 text-xs">
                {event.timestamp
                  ? new Date(event.timestamp).toLocaleDateString()
                  : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Potential Counterfeit Medicine
            </h2>
            <p className="text-gray-600">
              This medicine could not be verified as authentic through our
              blockchain verification system.
            </p>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6 text-center">
            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => {
                  VerificationMethod?.(null);
                  VerificationResult?.(null);
                }}
              >
                Verify Another Medicine
              </Button>
              <Link to={"/complaint"}>
                <Button>Report Fake Medicine</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerificationResults;
