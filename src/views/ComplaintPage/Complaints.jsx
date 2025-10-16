import React from "react";
import Form from "./ui/Form";
import { AlertTriangle, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";

function Complaints() {
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-7  ">
        <div className="bg-primary text-white p-6 flex items-center rounded-t-lg shadow-md">
          <AlertTriangle size={24} className="mr-3" />
          <div>
            <h2 className="text-xl font-semibold">
              Report Counterfeit Medicine
            </h2>
            <p className="text-sm opacity-90">
              Help us combat fake medicines by reporting suspicious products
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <Info size={20} className="text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-blue-700">
                  Please provide as much information as possible about the
                  suspected counterfeit medicine. Your report will be kept
                  confidential and will help protect others.
                </p>
              </div>
            </div>
          </div>

          <Form />
        </div>
      </div>
    </div>
  );
}

export default Complaints;
