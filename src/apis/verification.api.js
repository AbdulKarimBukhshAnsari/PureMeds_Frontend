import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const verifyMedicineByQRCode = async (qrImageFile, token = null) => {
  try {
    const URL = `${API_URL}/customer/verify/qrcode`;
    const formData = new FormData();
    formData.append("qrCode", qrImageFile);
    
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.post(URL, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error verifying medicine by QR code:", error);
    throw error;
  }
};

export const verifyMedicineByHash = async (hash, token = null) => {
  try {
    const URL = `${API_URL}/customer/verify/hash`;
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const response = await axios.post(URL, { hash }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error verifying medicine by hash:", error);
    throw error;
  }
};

export const verifyQRData = async (qrData, token = null) => {
  try {
    // Parse QR data
    const parsedData = JSON.parse(qrData);
    
    if (!parsedData.hash) {
      throw new Error("Invalid QR code format - missing hash");
    }
    
    // Verify using hash
    return await verifyMedicineByHash(parsedData.hash, token);
  } catch (error) {
    if (error.message.includes("JSON")) {
      throw new Error("Invalid QR code format - not a PureMeds QR code");
    }
    throw error;
  }
};
