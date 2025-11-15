import React, { useEffect } from "react";
import {
  X as CloseIcon,
  Calendar,
  Hash,
  MapPin,
  Store,
  PillBottle,
  Weight,
  Building2,
  FileText,
  MessageSquare,
} from "lucide-react";

export default function ComplaintModal({ complaint, isOpen, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Reviewed":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center bg-primary text-white px-6 py-3">
          <h3 className="text-lg md:text-xl font-semibold tracking-wide">
            Complaint Details – {complaint.complaintId}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {/* Status Badge */}
          <div className="flex justify-end -mt-1">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                complaint.status
              )}`}
            >
              {complaint.status}
            </span>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Medicine Info Card */}
            <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-support mb-2">
                Medicine Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-start space-x-2">
                  <PillBottle size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Medicine Name</p>
                    <p className="font-medium text-sm">{complaint.medicineName}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Weight size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Dose</p>
                    <p className="font-medium text-sm">{complaint.medicineDose}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Building2 size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Manufacturer</p>
                    <p className="font-medium text-sm">{complaint.manufacturer}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Hash size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Batch ID</p>
                    <p className="font-medium text-sm">{complaint.batchId}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Calendar size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Manufacturing Date</p>
                    <p className="font-medium text-sm">{complaint.manufacturerDate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Calendar size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Expiry Date</p>
                    <p className="font-medium text-sm">{complaint.expiryDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Complaint + QR Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
              <h4 className="text-sm font-semibold text-support mb-2">
                Complaint Info
              </h4>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-start space-x-2">
                  <Store size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">Store Name</p>
                    <p className="font-medium text-sm">{complaint.store}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs">City</p>
                    <p className="font-medium text-sm">{complaint.city}</p>
                  </div>
                </div>
                <div className="pt-1.5">
                  <p className="text-gray-500 text-xs mb-1.5">QR Code</p>
                  <div className="border border-gray-200 rounded-lg p-1.5 flex justify-center">
                    <img
                      src={complaint.qrCode}
                      alt="QR Code"
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
            <h4 className="text-sm font-semibold text-support mb-1.5 flex items-center">
              <FileText size={14} className="mr-2 text-primary" />
              Description
            </h4>
            <p className="text-gray-700 text-sm">{complaint.description}</p>
          </div>

          {/* Admin Remarks - Always show */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
            <h4 className="text-sm font-semibold text-support mb-1.5 flex items-center">
              <MessageSquare size={14} className="mr-2 text-primary" />
              Admin Remarks
            </h4>
            {complaint.adminRemarks && complaint.adminRemarks.trim() !== "" ? (
              <p className="text-gray-700 text-sm">{complaint.adminRemarks}</p>
            ) : (
              <p className="text-gray-500 text-sm italic">Wait for admin response</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-2 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-gray-300 rounded-lg text-support hover:bg-gray-50 transition text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

