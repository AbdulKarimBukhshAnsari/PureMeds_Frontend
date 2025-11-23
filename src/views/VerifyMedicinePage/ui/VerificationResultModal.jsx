import React, { useState, useEffect, useCallback } from "react";
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
  Loader2,
} from "lucide-react";
import Button from "../../../components/ui/Buttons/Button";
import { getSupplyChainByBatchId } from "../../../apis/supplyChain.api";
import { useAuth } from "@clerk/clerk-react";
import SupplyChainFlow from "../../../components/ui/SupplyChain/SupplyChainFlow";

const VerificationResultModal = ({ 
  isOpen, 
  onClose, 
  verificationData, 
  onComplaint 
}) => {
  const [supplyChainData, setSupplyChainData] = useState(null);
  const [loadingSupplyChain, setLoadingSupplyChain] = useState(false);
  const [supplyChainError, setSupplyChainError] = useState(null);
  const { getToken } = useAuth();

  const product = verificationData?.product;
  
  const fetchSupplyChain = useCallback(async () => {
    if (!product?.batchId) return;
    
    setLoadingSupplyChain(true);
    setSupplyChainError(null);
    try {
      const token = await getToken({ template: "puremeds" });
      if (!token) {
        throw new Error("Authentication required");
      }
      const response = await getSupplyChainByBatchId(product.batchId, token);
      setSupplyChainData(response?.data || response);
    } catch (err) {
      console.error("Error fetching supply chain:", err);
      setSupplyChainError(err.response?.data?.message || err.message || "Failed to load supply chain data");
    } finally {
      setLoadingSupplyChain(false);
    }
  }, [product?.batchId, getToken]);

  useEffect(() => {
    const showSupplyChain = product && product.batchId && verificationData?.isValid && verificationData?.isDistributedByPureMeds;
    if (isOpen && showSupplyChain && !supplyChainData && !loadingSupplyChain) {
      fetchSupplyChain();
    }
  }, [isOpen, product, verificationData?.isValid, verificationData?.isDistributedByPureMeds, fetchSupplyChain, supplyChainData, loadingSupplyChain]);
  
  if (!isOpen || !verificationData) {
    return null;
  }

  const {
    isValid,
    isDistributedByPureMeds,
    isExpired,
    daysUntilExpiry,
    blockchainVerification,
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
      title: "AUTHENTIC MEDICINE",
      message: "This medicine is genuine and safe to use",
    };
  };

  const statusConfig = getStatusConfig();
  const showComplaintButton = !isValid || !isDistributedByPureMeds || isExpired;
  const showSupplyChain = product && product.batchId && isValid && isDistributedByPureMeds;


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-gradient-to-r from-primary to-primary-hover text-white px-6 py-3 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {React.cloneElement(statusConfig.icon, { className: "h-12 w-12" })}
            </div>
            <div>
              <h3 className="text-lg font-semibold tracking-wide">
                {statusConfig.title}
              </h3>
              <p className="text-white/90 text-xs mt-0.5">{statusConfig.message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition p-1 rounded-lg hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body - No Scroll, Fixed Height */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          {/* Supply Chain Flow - Big Size (Main Focus) */}
          {showSupplyChain && (
            <div className="flex-1 flex flex-col justify-center mb-6">
              {loadingSupplyChain ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-base text-gray-500">Loading supply chain...</p>
                </div>
              ) : supplyChainError ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <XCircle className="h-12 w-12 text-red-500 mb-4" />
                  <p className="text-base text-red-600 text-center mb-4">{supplyChainError}</p>
                  <button
                    onClick={fetchSupplyChain}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition"
                  >
                    Retry
                  </button>
                </div>
              ) : supplyChainData ? (
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                    Blockchain Supply Chain Journey
                  </h4>
                  <SupplyChainFlow supplyChainData={supplyChainData} />
                </div>
              ) : null}
            </div>
          )}

          {/* Medicine Details - Horizontal Bar */}
          { !showSupplyChain &&
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* Blockchain Status */}
              <div className={`bg-white border rounded-lg p-3 ${
                blockchainVerification?.isValid 
                  ? "border-blue-200 bg-blue-50" 
                  : "border-gray-200"
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className={`h-4 w-4 ${
                    blockchainVerification?.isValid ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <p className="font-semibold text-gray-800 text-xs">
                    Blockchain
                  </p>
                </div>
                <p className="text-xs text-gray-600">
                  {blockchainVerification?.isValid
                    ? "✓ Verified"
                    : "⚠ Unavailable"}
                </p>
              </div>
            </div>
          
          </div>
}

          {/* Red Flag Warning */}
          {showComplaintButton && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 flex-shrink-0">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-800 text-sm mb-2">
                    ⚠️ Action Required
                  </p>
                  <p className="text-red-700 text-xs mb-3">
                    {!isValid || !isDistributedByPureMeds
                      ? "This medicine appears to be counterfeit. Please report this immediately."
                      : "This medicine has expired and should not be used."}
                  </p>
                  <Button
                    variant="danger"
                    onClick={onComplaint}
                    className="text-xs px-4 py-2"
                  >
                    Report This Medicine
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center flex-shrink-0">
          <p className="text-sm text-gray-500">
            {isValid && isDistributedByPureMeds
              ? "✓ Distributed by PureMeds"
              : "✗ Not from PureMeds"}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationResultModal;
