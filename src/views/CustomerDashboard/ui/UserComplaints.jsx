import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import Button from "../../../components/ui/Buttons/Button";
import { Link } from "react-router-dom";
import { getComplaintsByUserId, getComplaintById, deleteComplaint } from "../../../apis/complaint.api";
import ComplaintModal from "./Modals/ComplaintModal";
import Loading from "../../../components/ui/Loader/Loading";

function UserComplaints() {
  const { getToken } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingComplaint, setLoadingComplaint] = useState(false);
  const [deletingComplaint, setDeletingComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const token = await getToken({ template: "puremeds" });
        if (!token) {
          throw new Error("Authentication required");
        }
        const response = await getComplaintsByUserId(token);
        if (response?.data) {
          setComplaints(response.data);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [getToken]);

  const handleViewClick = async (complaintId) => {
    try {
      setLoadingComplaint(true);
      const token = await getToken({ template: "puremeds" });
      if (!token) {
        throw new Error("Authentication required");
      }
      const response = await getComplaintById(complaintId, token);
      if (response?.data) {
        setSelectedComplaint(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching complaint details:", error);
    } finally {
      setLoadingComplaint(false);
    }
  };

  const handleDeleteClick = async (complaintId) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) {
      return;
    }

    try {
      setDeletingComplaint(complaintId);
      const token = await getToken({ template: "puremeds" });
      if (!token) {
        throw new Error("Authentication required");
      }
      await deleteComplaint(complaintId, token);
      // Refresh complaints list
      const response = await getComplaintsByUserId(token);
      if (response?.data) {
        setComplaints(response.data);
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
      alert("Failed to delete complaint. Please try again.");
    } finally {
      setDeletingComplaint(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">My Complaints</h2>
        <Link to={"/complaint"}>
          <Button variant="primary" size="sm">
            New Complaint
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {complaints.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No complaints found. Submit your first complaint to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Medicine
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Manufacturer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    Store
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {complaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {complaint.complaintId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {complaint.medicineName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {complaint.manufacturer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">
                      {complaint.store}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleViewClick(complaint._id)}
                          disabled={loadingComplaint}
                          className="text-[#156874] hover:underline cursor-pointer disabled:opacity-50"
                        >
                          {loadingComplaint ? "Loading..." : "View"}
                        </button>
                        <button
                          onClick={() => handleDeleteClick(complaint._id)}
                          disabled={deletingComplaint === complaint._id}
                          className="text-red-600 hover:text-red-800 cursor-pointer disabled:opacity-50"
                        >
                          {deletingComplaint === complaint._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedComplaint(null);
          }}
        />
      )}
    </div>
  );
}

export default UserComplaints;
