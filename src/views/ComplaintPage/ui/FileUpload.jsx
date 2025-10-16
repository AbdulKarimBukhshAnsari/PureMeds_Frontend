import React, { useState } from "react";
import { Upload } from "lucide-react";

const FileUpload = ({ onFileSelect, error }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onFileSelect(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        QR Code Image
      </label>
      <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-primary-hover transition  ${error ? "border-red-500" : "border-gray-300"}`}>
        {preview ? (
          <img
            src={preview}
            alt="QR Preview"
            className="max-h-40 object-contain mb-3"
          />
        ) : (
          <>
            <Upload className="text-primary h-10 w-10 mb-2" />
            <p className="text-gray-600 text-sm">Click to upload QR image</p>
          </>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="qrFile"
        />
        <label
          htmlFor="qrFile"
          className="text-primary text-md font-semibold cursor-pointer mt-2"
        >
          {preview ? "Change File" : "Choose File"}
        </label>
        
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default FileUpload;
