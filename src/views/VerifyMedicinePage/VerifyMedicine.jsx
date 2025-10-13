import React, { useState, useRef, useEffect } from "react";
import { Upload, Camera, CheckCircle, AlertTriangle } from "lucide-react";
import { SupplyChain } from "../../utils/mockData";
import Button from "../../components/ui/Buttons/Button";
import MethodSelection from "./ui/MethodSelection";
import ScanQRCode from "./ui/ScanQRCode";
import UploadQRCode from "./ui/UploadQRCode";
import VerificationResults from "./ui/VerificationResults";

// BREAK INTO COMPONENTS - hehe
const VerifyMedicine = () => {
  const [verificationMethod, setVerificationMethod] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraId, setCameraId] = useState(null);
  const fileInputRef = useRef(null);
  const scannerRef = useRef(null);

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  // Get available cameras when scan mode is selected
  useEffect(() => {
    if (verificationMethod === "scan" && !cameraId && window.Html5Qrcode) {
      window.Html5Qrcode.getCameras().then((devices) => {
        if (devices && devices.length) {
          setCameraId(devices[0].id);
        }
      });
    }
  }, [verificationMethod, cameraId]);

  // Start QR scanning using html5-qrcode
  useEffect(() => {
    if (
      verificationMethod === "scan" &&
      cameraId &&
      !verificationResult &&
      window.Html5Qrcode
    ) {
      const html5QrCode = new window.Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;
      html5QrCode
        .start(
          cameraId,
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            setIsLoading(true);
            html5QrCode.stop().then(() => {
              setTimeout(() => {
                setVerificationResult("verified");
                setIsLoading(false);
              }, 1000);
            });
          },
          (error) => {
            // Optionally handle scan errors
          }
        )
        .catch(() => {});
    }
    // Cleanup on mode change
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, [verificationMethod, cameraId, verificationResult]);

  const handleMethodSelect = (method) => {
    setVerificationMethod(method);
    setVerificationResult(null);
    setCameraId(null);
  };

  // File upload QR scan
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0] && window.Html5Qrcode) {
      setIsLoading(true);
      const html5QrCode = new window.Html5Qrcode("qr-reader-file");
      html5QrCode
        .scanFile(e.target.files[0], true)
        .then((decodedText) => {
          setVerificationResult("verified");
          setIsLoading(false);
        })
        .catch(() => {
          setVerificationResult("fake");
          setIsLoading(false);
        });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Verify Your Medicine
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Ensure your medicine is authentic by scanning the QR code on the
          packaging or uploading an image of the QR code.
        </p>

        {/* Method selection cards */}
        {!verificationMethod && !verificationResult && (
          <div className="max-w-3xl mx-auto">
            <MethodSelection onSelect={setVerificationMethod} />
          </div>
        )}

        {/* Scan QR Code */}
        {verificationMethod === "scan" && !verificationResult && (
          <ScanQRCode
            onBack={() => setVerificationMethod(null)}
            onFake={() => setVerificationResult("fake")}
            onVerified={() => setVerificationResult("verified")}
          />
        )}

        {verificationMethod === "upload" && !verificationResult && (
          <UploadQRCode
            onBack={() => setVerificationMethod(null)}
            onFake={() => setVerificationResult("fake")}
            onVerified={() => setVerificationResult("verified")}
          />
        )}

        {verificationResult === "verified" && (
          <VerificationResults
            result={"verified"}
            VerificationMethod={setVerificationMethod}
            VerificationResult={setVerificationResult}
          />
        )}
        {verificationResult === "fake" && (
          <VerificationResults
            result={"fake"}
            VerificationMethod={setVerificationMethod}
            VerificationResult={setVerificationResult}
          />
        )}
      </div>
    </div>
  );
};

export default VerifyMedicine;
