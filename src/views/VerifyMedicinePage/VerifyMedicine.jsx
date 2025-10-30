import React, { useState, useRef, useEffect } from "react";
import MethodSelection from "./ui/MethodSelection";
import ScanQRCode from "./ui/ScanQRCode";
import UploadQRCode from "./ui/UploadQRCode";
import VerificationResults from "./ui/VerificationResults";
import { motion, AnimatePresence } from "framer-motion";


// BREAK INTO COMPONENTS - hehe
const VerifyMedicine = () => {
  const [verificationMethod, setVerificationMethod] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
const list = ["#fff", "#156874", "#000" ]
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-32">
        <AnimatePresence mode="wait">
          {!verificationMethod && !verificationResult && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Verify Your Medicine
              </h1>
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Ensure your medicine is authentic by scanning the QR code on the
                packaging or uploading an image of the QR code.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

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
