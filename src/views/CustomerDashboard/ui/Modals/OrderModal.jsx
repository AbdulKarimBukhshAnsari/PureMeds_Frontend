import React, { useEffect, useState } from "react";
import {
  X as CloseIcon,
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Truck,
  DollarSign,
} from "lucide-react";
import ModalConfirmationAlert from "../../../../components/ui/Alert/ModalConfirmationAlert";

export default function OrderModal({ order, isOpen, onClose, onCancel }) {
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
  const [modalData, setModalData] = useState({
    isOpen: false,
    onClose: () => {},
    onConfirm: () => {},
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    confirmVariant: "",
    cancelVariant: "",
    isAsync: false,
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-purple-100 text-purple-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const canCancel =
    order?.status &&
    !["delivered", "cancelled"].includes(order.status.toLowerCase());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[550px] overflow-hidden animate-in fade-in duration-200 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center bg-primary text-white px-6 py-3 flex-shrink-0">
          <h3 className="text-lg md:text-xl font-semibold tracking-wide">
            Order Details – {order?.orderId}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
          >
            <CloseIcon size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col p-4 space-y-3 overflow-hidden">
          {/* Status Badge */}
          <div className="flex justify-between items-center flex-shrink-0">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                order?.status
              )}`}
            >
              {order?.status || "Pending"}
            </span>
            {canCancel && (
              <button
                // onClick={() => {
                //   if (window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
                //     onCancel(order?._id);
                //   }
                // }}

                onClick={() => {
                  setModalData({
                    isOpen: true,
                    onClose: () =>
                      setModalData((prev) => ({
                        ...prev,
                        isOpen: false,
                      })),
                    onConfirm: async () => onCancel(order?._id),
                    title: "Confirm Delete",
                    message: "Are you sure you want to cancel this order?",
                    confirmText: "Yes",
                    cancelText: "No",
                    confirmVariant: "primary",
                    cancelVariant: "secondary",
                    isAsync: true,
                  });
                }}
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
              >
                Cancel Order
              </button>
            )}
          </div>

          {/* Grid Layout for better space utilization */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-3 min-h-0">
            {/* Customer Info - Left Column */}
            <div className="lg:col-span-1 bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col overflow-hidden">
              <h4 className="text-sm font-semibold text-support mb-2 flex items-center flex-shrink-0">
                <MapPin size={14} className="mr-2 text-primary" />
                Delivery Address
              </h4>
              <div className="text-sm text-gray-700 space-y-0.5 flex-1 overflow-y-auto">
                <p className="font-medium text-sm">
                  {order?.customerInfo?.firstName}{" "}
                  {order?.customerInfo?.lastName}
                </p>
                <p className="text-sm">{order?.customerInfo?.address}</p>
                <p className="text-sm">
                  {order?.customerInfo?.city}, {order?.customerInfo?.state}{" "}
                  {order?.customerInfo?.zip}
                </p>
                <p className="text-sm">{order?.customerInfo?.country}</p>
                <p className="mt-1 text-sm">
                  Phone: {order?.customerInfo?.phone}
                </p>
                <p className="text-sm">Email: {order?.customerInfo?.email}</p>
              </div>
            </div>

            {/* Products - Middle Column */}
            <div className="lg:col-span-1 bg-gray-50 border border-gray-200 rounded-xl p-3 flex flex-col overflow-hidden">
              <h4 className="text-sm font-semibold text-support mb-2 flex items-center flex-shrink-0">
                <Package size={14} className="mr-2 text-primary" />
                Products ({order?.products?.length || 0})
              </h4>
              <div className="flex-1 space-y-1.5 overflow-y-auto">
                {order?.products?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-1.5 bg-white rounded-lg border border-gray-200"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-medium text-sm truncate">
                        {item.productName ||
                          item.productId?.productName ||
                          "Product"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × Rs. {item.price?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                    <p className="font-semibold text-sm whitespace-nowrap">
                      Rs.{" "}
                      {((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary & Payment Info - Right Column */}
            <div className="lg:col-span-1 flex flex-col space-y-3 min-h-0">
              {/* Order Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex-shrink-0">
                <h4 className="text-sm font-semibold text-support mb-2 flex items-center">
                  <DollarSign size={14} className="mr-2 text-primary" />
                  Order Summary
                </h4>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">
                      Rs. {order?.subtotal?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">
                      Rs. {order?.shipping?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1.5 border-t border-gray-300">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">
                      Rs. {order?.totalAmount?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment & Date Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex-shrink-0">
                <h4 className="text-sm font-semibold text-support mb-2 flex items-center">
                  <CreditCard size={14} className="mr-2 text-primary" />
                  Payment Method
                </h4>
                <p className="text-sm text-gray-700 capitalize mb-2">
                  {order?.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : order?.paymentMethod || "N/A"}
                </p>
                <h4 className="text-sm font-semibold text-support mb-2 flex items-center">
                  <Calendar size={14} className="mr-2 text-primary" />
                  Order Date
                </h4>
                <p className="text-sm text-gray-700">
                  {order?.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-2 border-t border-gray-200 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-1.5 border border-gray-300 rounded-lg text-support hover:bg-gray-50 transition text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <ModalConfirmationAlert {...modalData} />
    </div>
  );
}
