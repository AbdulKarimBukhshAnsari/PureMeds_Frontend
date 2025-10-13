import { Camera, Upload } from "lucide-react";
import React from "react";

function MethodSelection({ onSelect }) {
  const options = [
    {
      id: "scan",
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Scan QR Code",
      desc: "Use your camera to scan the QR code on your medicine packaging.",
    },
    {
      id: "upload",
      icon: <Upload className="h-8 w-8 text-primary" />,
      title: "Upload QR Code",
      desc: "Upload an image of the QR code from your medicine packaging.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {options.map((option) => (
        <div
        key={option.id}
          className="bg-white p-8 rounded-lg shadow-sm border-2 border-transparent hover:border-primary transition-all cursor-pointer flex flex-col items-center text-center"
          onClick={() => onSelect(option.id)}
        >
          <div className="bg-background bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            {option.icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {option.title}
          </h2>
          <p className="text-gray-600">
            {option.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MethodSelection;
