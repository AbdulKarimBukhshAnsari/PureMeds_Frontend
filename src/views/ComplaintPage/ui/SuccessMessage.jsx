import React from "react";
import { CheckCircle } from "lucide-react";

const SuccessMessage = ({ onReset }) => (
  <div className="bg-white rounded-xl shadow-md p-8 text-center">
    <CheckCircle className="text-green-500 h-14 w-14 mx-auto mb-4" />
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
      Thank you for your report!
    </h2>
    <p className="text-gray-600 mb-6">
      Your complaint has been submitted successfully. Our team will investigate and get back to you shortly.
    </p>
    <button
      onClick={onReset}
      className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-medium transition"
    >
      Submit Another Report
    </button>
  </div>
);

export default SuccessMessage;
