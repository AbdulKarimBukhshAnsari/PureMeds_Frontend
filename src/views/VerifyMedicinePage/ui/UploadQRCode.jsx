import React, { useRef, useState } from "react";
import Button from "../../../components/ui/Buttons/Button";
import { ArrowLeft, Upload, AlertCircle } from "lucide-react";
import ToastNotification from "../../../components/ui/Alert/ToastNotification";
import { useToast } from "../../../hooks/Toast/useToast";
import { verifyMedicineByQRCode } from "../../../apis/verification.api";
import VerificationResultModal from "./VerificationResultModal";
import { useNavigate } from "react-router-dom";

function UploadQRCode({ onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileRef = useRef(null);
  const [toast, showSuccess, showError, hideToast] = useToast();
  const navigate = useNavigate();

  const openFilePicker = () => {
    // Trigger hidden input click
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset previous file
      fileRef.current.click();
    }
    setUploadError(null);
  };

  const onFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      showError("Please upload an image file");
      return;
    }
    
    // Validate file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      showError("File size must be less than 5MB");
      return;
    }
    
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setUploadError(null);
  };

  const verifyQRCode = async () => {
    if (!file) return;
    setIsLoading(true);
    setUploadError(null);

    try {
      // Call the verification API with the image file
      const response = await verifyMedicineByQRCode(file);
      
      setVerificationResult(response.data);
      setShowResultModal(true);
      
      // Show appropriate toast based on result
      if (response.data.isValid && response.data.isDistributedByPureMeds) {
        if (response.data.isExpired) {
          showError("⚠️ Medicine verified but EXPIRED!");
        } else if (response.data.daysUntilExpiry <= 30) {
          showError(`⚠️ Medicine expires in ${response.data.daysUntilExpiry} days`);
        } else {
          showSuccess("✅ Medicine verified successfully!");
        }
      } else {
        showError("❌ FAKE medicine detected!");
      }
    } catch (err) {
      console.error("QR verification error:", err);
      
      // Handle specific errors
      if (err.response?.data?.message) {
        setUploadError(err.response.data.message);
        showError(err.response.data.message);
      } else if (err.message.includes("Invalid QR")) {
        setUploadError("The uploaded image is not a valid QR code");
        showError("Invalid QR code - please upload a valid medicine QR");
      } else {
        setUploadError("Failed to verify QR code");
        showError("Failed to verify - please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle complaint navigation
  const handleComplaint = () => {
    setShowResultModal(false);
    navigate("/complaint", { 
      state: { 
        fromVerification: true,
        medicineData: verificationResult?.product 
      } 
    });
  };

  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm relative">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-primary transition"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header Section */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Upload QR Code
          </h2>
          <p className="text-gray-600 mb-6">
            Select an image of the medicine QR code from your device
          </p>
        </div>

        {/* Upload Box */}
        <div
          className="w-full aspect-square max-w-xs mx-auto mb-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-gray-50"
          onClick={openFilePicker}
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-500">Verifying QR code...</p>
            </div>
          ) : preview ? (
            <div className="flex flex-col items-center p-4">
              <img
                src={preview}
                alt="QR Code Preview"
                className="w-full h-full max-w-[250px] max-h-[250px] object-contain rounded-md"
              />
              <p className="text-xs text-gray-500 mt-2">Click to change image</p>
            </div>
          ) : (
            <>
              <Upload className="h-16 w-16 text-primary mb-4" />
              <p className="text-sm text-gray-600 font-medium">Click to upload QR code</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG (Max 5MB)</p>
            </>
          )}
        </div>

        {/* Error Display */}
        {uploadError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-700">{uploadError}</p>
              {uploadError.includes("not a valid") && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => navigate("/complaint")}
                  className="mt-2"
                >
                  Report Fake Medicine
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {preview && !uploadError && (
          <div className="flex justify-center space-x-3 mt-4">
            <Button 
              variant="secondary" 
              onClick={openFilePicker}
              disabled={isLoading}
            >
              Change Image
            </Button>
            <Button
              variant="primary"
              onClick={verifyQRCode}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify QR Code"}
            </Button>
          </div>
        )}

        {/* Hidden input for file selection */}
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
          disabled={isLoading}
        />

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            How to Upload:
          </h3>
          <ul className="text-left text-sm text-blue-700 space-y-1">
            <li>• Take a clear photo of the medicine QR code</li>
            <li>• Ensure good lighting and focus</li>
            <li>• Upload the image (PNG, JPG, JPEG)</li>
            <li>• System will verify authenticity</li>
          </ul>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        isVisible={toast.isVisible}
        type={toast.type}
        message={toast.message}
        duration={toast.duration}
        onClose={hideToast}
      />

      {/* Verification Result Modal */}
      <VerificationResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        verificationData={verificationResult}
        onComplaint={handleComplaint}
      />
    </>
  );
}

export default UploadQRCode;