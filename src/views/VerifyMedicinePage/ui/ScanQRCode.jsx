import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/ui/Buttons/Button";
import { Html5Qrcode } from "html5-qrcode";
import { SupplyChain } from "../../../utils/mockData";

function ScanQRCode({ onVerified, onFake, onBack }) {
  const [isLoading, setIsLoading] = useState(true);
  const [decodedText, setDecodedText] = useState(null);
  const html5QrCodeRef = useRef(null);
  const readerRef = useRef(null);

  // TBI (to be implemented)
  // function for searching whether the batch id belong on the etherum block chain
  // Function to start scanning
  const startCamera = async (cameraId) => {
    try {
      const html5QrCode = new Html5Qrcode(readerRef.current.id);
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        { deviceId: { exact: cameraId } },
        {
          fps: 10, // scan 10 frames per second
          qrbox: { width: 250, height: 250 }, // bounding box size
        },
        (decodedText) => {
          console.log("QR Code Decoded:", decodedText);
          setDecodedText(decodedText);

          // Stop camera after successful scan
          stopCamera();
          try {
            const decodedObj = JSON.parse(decodedText);
            setTimeout(() => {
              if (decodedObj.batchId === SupplyChain[0].batchId) {
                onVerified();
              } else {
                onFake();
              }
            }, 300);
          } catch (err) {
            console.error("Invalid QR data:", err);
            onFake();
          }
        },
        (errorMessage) => {
          // Can safely ignore small scanning errors
          console.log("Scan error:", errorMessage);
        }
      );

      setIsLoading(false);
    } catch (err) {
      console.error("Error starting QR scanner:", err);
      setIsLoading(false);
    }
  };

  // Function to stop scanning
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

  // Get available cameras and start scanning
  useEffect(() => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id; // use first available camera
          startCamera(cameraId);
        } else {
          console.warn("No cameras found.");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error getting cameras:", err);
        setIsLoading(false);
      });

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Scan QR Code
          </h2>
          <p className="text-gray-600 mb-6">
            Position the QR code within the camera frame.
          </p>

          <div className="relative w-full aspect-square max-w-xs mx-auto mb-8 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <p className="mt-4 text-gray-500">Starting camera...</p>
              </div>
            ) : (
              <div id="reader" ref={readerRef} style={{ width: "100%" }} />
            )}
          </div>
          <Button onClick={onBack} className="mt-4" variant="secondary">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ScanQRCode;
