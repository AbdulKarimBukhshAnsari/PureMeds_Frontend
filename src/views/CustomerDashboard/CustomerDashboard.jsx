import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  AlertTriangle,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";

function CustomerDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    {
      path: "/dashboard/orders",
      label: "Orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      path: "/dashboard/user-complaints",
      label: "Complaints",
      icon: <AlertTriangle className="h-5 w-5" />,
    },
    {
      path: "/dashboard", //currently redirects to orders
      label: "Profile",
      icon: <User className="h-5 w-5" />,
    },
  ];

  // Helper: check if a route is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-background min-h-screen pt-32">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-800">Dashboard Menu</span>
              <ChevronRight
                className={`h-5 w-5 transition-transform ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <div
            className={`md:w-1/4 ${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-10">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-primary">Dashboard</h2>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                          isActive(item.path)
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span
                          className={`mr-3 ${
                            isActive(item.path)
                              ? "text-primary"
                              : "text-primary/60"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {/* it will be in clerk so maybe can be removed */}
                  {/* Logout button — should be handled by Clerk*/}
                  <li className="pt-4 mt-4 border-t border-gray-200">
                    <button
                      className="flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                      onClick={() => {
                        // Temporary: You’ll replace this with Clerk signOut()
                        console.log("Logging out...");
                      }}
                    >
                      <LogOut className="h-5 w-5 text-primary/60 mr-3" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
