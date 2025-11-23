import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const getSupplyChainByBatchId = async (batchId, token = null) => {
  try {
    if (!token) {
      throw new Error("Authentication token is required");
    }
    const URL = `${API_URL}/customer/supply-chain/batch/${batchId}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching supply chain by batch ID:", error);
    throw error;
  }
};

