import React, { useState, useRef, useEffect } from "react";
import MethodSelection from "./ui/MethodSelection";
import ScanQRCode from "./ui/ScanQRCode";
import UploadQRCode from "./ui/UploadQRCode";
import VerificationResults from "./ui/VerificationResults";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInLeft } from "../../components/ui/Animation/ScrollAnimation";


// BREAK INTO COMPONENTS - hehe
const VerifyMedicine = () => {
  const [verificationMethod, setVerificationMethod] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
const list = ["#fff", "#156874", "#000" ]
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-32">
        
              <FadeInLeft>

              <h1 className="text-5xl font-bold text-orange-400 mb-10 p-4 text-center">
                Verify Your Medicine
              </h1>
              </FadeInLeft>
            

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
