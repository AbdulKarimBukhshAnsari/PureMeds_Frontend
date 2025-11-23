import React from "react";
import {
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Calendar,
  Building2,
  Package,
  Hash,
  Clock,
  ShieldOff,
} from "lucide-react";
import Button from "../../../components/ui/Buttons/Button";

const VerificationResultModal = ({ 
  isOpen, 
  onClose, 
  verificationData, 
  onComplaint 
}) => {
  if (!isOpen || !verificationData) return null;

  const {
    isValid,
    isDistributedByPureMeds,
    isExpired,
    daysUntilExpiry,
    product,
    blockchainVerification,
    verifiedAt,
  } = verificationData;

  // Determine status color and icon
  const getStatusConfig = () => {
    if (!isValid || !isDistributedByPureMeds) {
      return {
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-600",
        icon: <ShieldOff className="h-16 w-16 text-red-500" />,
        title: "❌ FAKE MEDICINE DETECTED",
        message: "This medicine is NOT authentic and NOT distributed by PureMeds!",
      };
    }

    if (isExpired) {
      return {
        color: "red",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-600",
        icon: <XCircle className="h-16 w-16 text-red-500" />,
        title: "⚠️ EXPIRED MEDICINE",
        message: "This medicine has expired. DO NOT USE!",
      };
    }

    if (daysUntilExpiry <= 30) {
      return {
        color: "yellow",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-600",
        icon: <AlertTriangle className="h-16 w-16 text-yellow-500" />,
        title: "⚠️ EXPIRING SOON",
        message: `Medicine expires in ${daysUntilExpiry} days`,
      };
    }

    return {
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      icon: <CheckCircle className="h-16 w-16 text-green-500" />,
      title: "✅ AUTHENTIC MEDICINE",
      message: "This medicine is genuine and safe to use",
    };
  };

  const statusConfig = getStatusConfig();
  const showComplaintButton = !isValid || !isDistributedByPureMeds || isExpired;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header with status */}
        <div className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-b-2 px-6 py-4`}>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              {statusConfig.icon}
              <div>
                <h2 className={`text-2xl font-bold ${statusConfig.textColor}`}>
                  {statusConfig.title}
                </h2>
                <p className="text-gray-600 mt-1">{statusConfig.message}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[60vh] p-6">
          {/* Blockchain Status */}
          <div className={`rounded-lg p-4 mb-6 ${
            blockchainVerification?.isValid 
              ? "bg-blue-50 border border-blue-200" 
              : "bg-gray-50 border border-gray-200"
          }`}>
            <div className="flex items-center space-x-3">
              <Shield className={`h-6 w-6 ${
                blockchainVerification?.isValid ? "text-blue-600" : "text-gray-400"
              }`} />
              <div>
                <p className="font-semibold text-gray-800">
                  Blockchain Verification
                </p>
                <p className="text-sm text-gray-600">
                  {blockchainVerification?.isValid
                    ? "✓ Verified on blockchain"
                    : "⚠ Blockchain verification unavailable"}
                </p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          {product && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Medicine Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Package className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Product Name</p>
                    <p className="font-medium text-gray-900">
                      {product.productName || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Hash className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Batch ID</p>
                    <p className="font-medium text-gray-900 font-mono text-sm">
                      {product.batchId || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Manufacturer</p>
                    <p className="font-medium text-gray-900">
                      {product.manufacturer || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className={`font-medium ${
                      isExpired ? "text-red-600" : "text-gray-900"
                    }`}>
                      {formatDate(product.expiryDate)}
                      {isExpired && " (EXPIRED)"}
                    </p>
                  </div>
                </div>

                {product.chemicalName && (
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Chemical Name</p>
                      <p className="font-medium text-gray-900">
                        {product.chemicalName}
                      </p>
                    </div>
                  </div>
                )}

                {product.category && (
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium text-gray-900">
                        {product.category}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Verification Time */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Verified at: {formatDate(verifiedAt)}</span>
            </div>
          </div>

          {/* Red Flag Warning */}
          {showComplaintButton && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-red-800 mb-2">
                    ⚠️ Action Required
                  </p>
                  <p className="text-red-700 text-sm mb-3">
                    {!isValid || !isDistributedByPureMeds
                      ? "This medicine appears to be counterfeit. Please report this immediately to prevent others from being affected."
                      : "This medicine has expired and should not be used. Please dispose of it safely and report if it was sold recently."}
                  </p>
                  <Button
                    variant="danger"
                    onClick={onComplaint}
                    className="mt-3"
                  >
                    Report This Medicine
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {isValid && isDistributedByPureMeds
                ? "✓ Distributed by PureMeds"
                : "✗ Not from PureMeds"}
            </p>
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationResultModal;
