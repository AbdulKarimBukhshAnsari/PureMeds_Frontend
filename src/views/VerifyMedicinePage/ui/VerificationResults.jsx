import { AlertTriangle, CheckCircle } from "lucide-react";
import React from "react";
import { SupplyChain } from "../../../utils/mockData";
import Button from "../../../components/ui/Buttons/Button";
import { Link } from "react-router-dom";

function VerificationResults({
  result,
  VerificationMethod,
  VerificationResult,
}) {
  const supplyChainRecord = SupplyChain?.[0];
  const events = supplyChainRecord?.events ?? [];
  return (
    <div>
      {result === "verified" ? (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Authentic Medicine
            </h2>
            <p className="text-gray-600">
              This medicine has been verified as authentic through our
              blockchain verification system.
            </p>
          </div>
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Supply Chain Details
            </h3>
            <div className="relative">
              {events.map((event, index) => (
                <div key={index} className="flex mb-8 last:mb-0">
                  {/* Timeline circle */}
                  <div className="relative flex flex-col items-center mr-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        event.verified ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <CheckCircle
                        className={`h-5 w-5 ${
                          event.verified ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                    {index < events.length - 1 && (
                      <div className="h-full w-0.5 bg-gray-200 absolute top-8"></div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="pb-8">
                    <div className="flex items-center">
                      <p className="font-semibold text-gray-800">
                        {event.stage}
                      </p>
                      {event.verified && (
                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700">{event.actor}</p>
                    <p className="text-gray-500 text-sm">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center">
            <Button
              onClick={() => {
                VerificationMethod?.(null);
                VerificationResult?.(null);
              }}
            >
              Verify Another Medicine
            </Button>
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
