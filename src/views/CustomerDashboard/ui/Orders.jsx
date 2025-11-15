import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getOrdersByUserId, getOrderById, deleteOrder } from "../../../apis/order.api";
import OrderModal from "./Modals/OrderModal";
import Loading from "../../../components/ui/Loader/Loading";

function Orders() {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = await getToken({ template: "puremeds" });
        if (!token) {
          throw new Error("Authentication required");
        }
        const response = await getOrdersByUserId(token);
        if (response?.data) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getToken]);

  const handleViewClick = async (orderId) => {
    try {
      setLoadingOrder(true);
      const token = await getToken({ template: "puremeds" });
      if (!token) {
        throw new Error("Authentication required");
      }
      const response = await getOrderById(orderId, token);
      if (response?.data) {
        setSelectedOrder(response.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoadingOrder(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrder(orderId);
      const token = await getToken({ template: "puremeds" });
      if (!token) {
        throw new Error("Authentication required");
      }
      await deleteOrder(orderId, token);
      // Refresh orders list
      const response = await getOrdersByUserId(token);
      if (response?.data) {
        setOrders(response.data);
      }
      // Close modal
      setIsModalOpen(false);
      setSelectedOrder(null);
      alert("Order cancelled successfully. Stock has been restored and payment has been deleted.");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setCancellingOrder(null);
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">My Orders</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No orders found. Place your first order to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {order.products?.length || 0}{" "}
                      {order.products?.length === 1 ? "item" : "items"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      Rs. {order.totalAmount?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleViewClick(order._id)}
                        disabled={loadingOrder}
                        className="text-[#156874] hover:underline cursor-pointer disabled:opacity-50"
                      >
                        {loadingOrder ? "Loading..." : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedOrder(null);
          }}
          onCancel={handleCancelOrder}
        />
      )}
    </div>
  );
}

export default Orders;
