import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Button from "../../../components/ui/Buttons/Button";
import { ArrowLeft, Upload } from "lucide-react";
import { SupplyChain } from "../../../utils/mockData";

function UploadQRCode({ onFake, onVerified, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const openFilePicker = () => {
    // Trigger hidden input click
    if (fileRef.current) {
      fileRef.current.value = ""; // Reset previous file
      fileRef.current.click();
    }
  };

  const onFileChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const verifyQRCode = async () => {
    if (!file) return;
    setIsLoading(true);

    try {
      // Initialize QR scanner (use an ID not already in DOM)
      const html5QrCode = new Html5Qrcode("qr-reader-file");

      const decodedText = await html5QrCode.scanFile(file, true);
      console.log("QR Code Decoded:", decodedText);

      let decodedObj;
      try {
        decodedObj = JSON.parse(decodedText);
        console.log(typeof decodedObj);
      } catch {
        decodedObj = {};
      }

      // Simulated verification
      if (decodedObj.batchId === SupplyChain[0].batchId) {
        onVerified();
      } else {
        onFake();
      }

      // Stop and clear the QR reader instance to avoid double rendering
      html5QrCode.clear();
    } catch (err) {
      console.error("QR scan error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm relative">
      {/* Back Button (inside card, top-left) */}
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upload QR Code
        </h2>
        <p className="text-gray-600 mb-6">
          Select an image of the QR code from your device.
        </p>
      </div>

      {/* Upload Box */}
      <div
        className="w-full aspect-square max-w-xs mx-auto mb-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#156874] transition-colors"
        onClick={openFilePicker}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-500">Processing...</p>
          </div>
        ) : preview ? (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="preview"
              className="w-64 aspect-square object-contain rounded-md mb-3"
            />
          </div>
        ) : (
          <>
            <Upload className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-gray-500">Click to upload QR code</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG</p>
          </>
        )}
      </div>

      {preview && (
        <div className="flex justify-center space-x-3 mt-4">
          <Button variant="outline" size="sm" onClick={openFilePicker}>
            Change Image
          </Button>
          <Button
            variant="outline"
            size="sm"
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

      {/* Hidden QR Reader Container */}
      <div id="qr-reader-file" className="hidden" />
    </div>
  );
}

export default UploadQRCode;
