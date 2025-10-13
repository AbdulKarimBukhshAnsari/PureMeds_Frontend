import React, { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Button from "../../../components/ui/Buttons/Button";
import { Upload } from "lucide-react";

function UploadQRCode({ onFake, onVerified, onBack }) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const openFilePicker = () => {
    fileRef.current?.click();
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setIsLoading(true);

      try {
        // Initialize html5-qrcode instance
        const html5QrCode = new Html5Qrcode("qr-reader-file");

        // Scan the file
        const decodedText = await html5QrCode.scanFile(file, true);

        console.log("QR Code Decoded:", decodedText);

        // Try to parse JSON if it is JSON-like data
        let data;
        try {
          data = JSON.parse(decodedText);
        } catch {
          data = decodedText;
        }

        // Example verification logic (you can customize this)
        if (data?.batchId && data?.medicineName) {
          onVerified(data);
        } else {
          onFake("Invalid or unrecognized QR data.");
        }
      } catch (err) {
        console.error("QR scan error:", err);
        onFake(`Scan error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload QR Code
          </h2>
          <p className="text-gray-600 mb-6">
            Select an image of the QR code from your device.
          </p>

          <div
            className="w-full aspect-square max-w-xs mx-auto mb-8 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#156874] transition-colors"
            onClick={openFilePicker}
          >
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-500">Processing...</p>
              </div>
            ) : !preview ? (
              <>
                <Upload className="h-16 w-16 text-primary mb-4" />
                <p className="text-sm text-gray-500">Click to upload QR code</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG</p>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={preview}
                  alt="preview"
                  className="h-60 w-96 object-cover rounded-md mb-3"
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={openFilePicker}
                >
                  Change Image
                </Button>
              </div>
            )}
          </div>

          {/* Hidden input for file selection */}
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="image/*"
            capture
            onChange={onFileChange}
            disabled={isLoading}
          />

          <Button onClick={onBack} className="mt-4" variant="secondary">
            Go Back
          </Button>

          {/* Container required by html5-qrcode */}
          <div id="qr-reader-file" style={{ width: "100%", marginTop: 16 }} />
        </div>
      </div>
    </div>
  );
}

export default UploadQRCode;
