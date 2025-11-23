import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/ui/Buttons/Button";
import { Html5Qrcode } from "html5-qrcode";
import { ArrowLeft, AlertCircle, Camera } from "lucide-react";
import VerificationResultModal from "./VerificationResultModal";
import { useNavigate } from "react-router-dom";
import { verifyMedicineByQRCode } from "../../../apis/verification.api";

function ScanQRCode({ onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  
  const html5QrCodeRef = useRef(null);
  const readerRef = useRef(null);
  const navigate = useNavigate();

  // Convert base64 to file for API
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  };

  // Verify medicine by sending captured QR image to backend
  const verifyScannedQR = async (decodedText) => {
    setIsVerifying(true);
    setScanError(null);

    try {
      // Capture the current frame as an image
      if (html5QrCodeRef.current) {
        // Get canvas from the QR scanner
        const canvas = document.querySelector('#reader canvas');
        if (canvas) {
          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);
          
          // Convert to file and send to API
          const file = base64ToFile(imageData, 'scanned-qr.png');
          const response = await verifyMedicineByQRCode(file);
          
          setVerificationResult(response.data);
          setShowResultModal(true);
        } else {
          // Fallback: create QR data object and send as JSON
          const qrData = { hash: decodedText, batchId: "SCAN-" + Date.now() };
          const blob = new Blob([JSON.stringify(qrData)], { type: 'application/json' });
          const file = new File([blob], 'qr-data.json', { type: 'application/json' });
          
          const response = await verifyMedicineByQRCode(file);
          setVerificationResult(response.data);
          setShowResultModal(true);
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      
      if (error.response?.data?.message) {
        setScanError(error.response.data.message);
      } else if (error.message.includes("Invalid QR")) {
        setScanError("This is not a valid PureMeds QR code");
      } else {
        setScanError(error.message || "Failed to verify medicine");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Start camera scanning
  const startCamera = async (cameraId) => {
    try {
      const html5QrCode = new Html5Qrcode(readerRef.current.id);
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        {  facingMode: { exact: "environment"}  },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText) => {
          console.log("QR Code Detected:", decodedText);
          
          // Stop camera after successful scan
          stopCamera();
          
          // Verify the scanned QR
          await verifyScannedQR(decodedText);
        },
        (errorMessage) => {
          // Ignore minor scanning errors
          if (!errorMessage.includes("NotFoundException")) {
            console.log("Scan error:", errorMessage);
          }
        }
      );

      setIsLoading(false);
      setScanError(null);
    } catch (err) {
      console.error("Error starting QR scanner:", err);
      setScanError("Failed to start camera. Please check permissions.");
      setIsLoading(false);
    }
  };

  // Stop camera
  const stopCamera = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
        console.log("Camera stopped.");
      } catch (err) {
        console.error("Failed to stop camera:", err);
      }
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

  // Restart scanning
  const restartScanning = () => {
    setCapturedImage(null);
    setScanError(null);
    setVerificationResult(null);
    
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          startCamera(cameraId);
        }
      })
      .catch((err) => {
        console.error("Error restarting camera:", err);
      });
  };

  // Initialize camera on mount
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          startCamera(cameraId);
        } else {
          setScanError("No cameras found. Please use upload option instead.");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error getting cameras:", err);
        setScanError("Camera access denied. Please allow camera access or use upload option.");
        setIsLoading(false);
      });

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto mb-10">
        {/* Card Container */}
        <div className="bg-white p-8 rounded-lg shadow-sm relative">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-primary transition"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="text-center mt-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">
              Scan QR Code
            </h2>
            <p className="text-gray-600 mb-6">
              Position the QR code within the camera frame
            </p>

            {/* QR Scanner Box or Captured Image */}
            <div className="relative w-full aspect-square max-w-xs mx-auto mb-6 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {capturedImage ? (
                <div className="flex flex-col items-center p-4">
                  <img 
                    src={capturedImage} 
                    alt="Captured QR" 
                    className="w-full h-full object-contain rounded"
                  />
                  <p className="text-xs text-gray-500 mt-2">QR Code Captured</p>
                </div>
              ) : isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-500">Starting camera...</p>
                </div>
              ) : isVerifying ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="mt-4 text-gray-500">Verifying medicine...</p>
                </div>
              ) : scanError ? (
                <div className="flex flex-col items-center p-4">
                  <AlertCircle className="h-12 w-12 text-yellow-500 mb-3" />
                  <p className="text-sm text-gray-600">{scanError}</p>
                  {scanError.includes("not a valid PureMeds") && (
                    <p className="text-xs text-red-600 mt-2">
                      Please report if you believe this is fake
                    </p>
                  )}
                </div>
              ) : (
                <div id="reader" ref={readerRef} style={{ width: "100%" }} />
              )}
            </div>

            {/* Action Buttons */}
            {(scanError || capturedImage) && !isVerifying && (
              <div className="flex justify-center space-x-3">
                <Button
                  variant="secondary"
                  onClick={restartScanning}
                  className="flex items-center space-x-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>Try Again</span>
                </Button>
                {scanError && scanError.includes("not a valid") && (
                  <Button
                    variant="danger"
                    onClick={() => navigate("/complaint")}
                  >
                    Report Fake Medicine
                  </Button>
                )}
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                Scanning Tips:
              </h3>
              <ul className="text-left text-sm text-blue-700 space-y-1">
                <li>• Hold camera steady over QR code</li>
                <li>• Ensure good lighting</li>
                <li>• Keep QR code within the frame</li>
                <li>• Wait for automatic detection</li>
              </ul>
            </div>

            {/* Error Action */}
            {scanError && (scanError.includes("Camera") || scanError.includes("permission")) && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  Camera not available? Use the upload option instead.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Verification Result Modal */}
      <VerificationResultModal
        isOpen={showResultModal}
        onClose={() => {
          setShowResultModal(false);
          restartScanning();
        }}
        verificationData={verificationResult}
        onComplaint={handleComplaint}
      />
    </>
  );
}

export default ScanQRCode;