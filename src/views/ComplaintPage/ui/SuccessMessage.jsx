import React from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessMessage = ({ onReset }) => (
  <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-xl w-full">
    <CheckCircle className="text-green-500 h-14 w-14 mx-auto mb-4" />

    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Thank you for your report!
    </h2>

    <p className="text-gray-600 mb-6">
      Your complaint has been submitted successfully. Our team will investigate
      and get back to you shortly.
    </p>

    <div className="flex flex-col gap-3 items-center">
      <button
        onClick={onReset}
        className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition w-full"
      >
        Submit Another Report
      </button>

      <button
        onClick={onReset}
        className="text-primary flex items-center gap-2 cursor-pointer mt-2"
      >
        <ArrowLeft size={18} />
        Back
      </button>
    </div>
  </div>
);

export default SuccessMessage;
