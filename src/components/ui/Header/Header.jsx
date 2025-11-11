import { LogIn, Menu, QrCode, ShoppingCart, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/Cart/CartContext";
import { useAuth } from "@clerk/clerk-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown
  const { cartItems } = useCart();
  const {isSignedIn} = useAuth()

  return (
    <header
      className={`
        fixed top-4 left-1/2 z-50
        -translate-x-1/2
        backdrop-blur-md bg-white/40
        shadow-lg border border-primary/20
        rounded-2xl
        transition-all duration-300
        max-w-6xl w-[90%]
      `}
    >
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
          <span className="text-2xl font-bold text-primary">PureMeds</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-primary/90">
          <Link to={"/"} className="hover:text-primary-hover">
            Home
          </Link>
          <Link to={"categories"} className="hover:text-primary-hover">
            Categories
          </Link>
          <Link
            to={"verify"}
            className="flex items-center gap-1 hover:text-primary-hover"
          >
            <QrCode size={18} />
            <span>Verify Medicine</span>
          </Link>
        </div>

        {/* Icons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 text-primary/90 relative">
          {/* Cart Icon */}
          <Link
            to={"/cart"}
            className="relative text-support hover:text-primary transition-colors"
          >
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="hover:text-primary transition-colors"
            >
              {isSignedIn ? 
              <User size={22} className="mt-1" /> : 
              <Link to={'/sign-in'}>
              <LogIn size={22} className="mt-1"/> 
              </Link>}
              
            </button>

            {profileOpen && isSignedIn && (
              <div
                className="absolute right-0 mt-3 w-44 bg-white/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg overflow-hidden z-50"
                onMouseLeave={() => setProfileOpen(false)}
              >
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  to="/dashboard/user-complaints"
                  className="block px-4 py-2 text-sm hover:bg-primary/10 cursor-pointer transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  Complaints
                </Link>
                <Link to={"/dashboard/user-profile"}>
                <div
                  className="block px-4 py-2 text-sm hover:bg-primary/10 cursor-pointer transition-colors"
                  onClick={() => setProfileOpen(false)}
                  >
                  Profile
                </div>
                  </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-[#156874]/20 pb-4 px-4 rounded-b-2xl shadow-md">
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="p-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link
              to="/categories"
              className="p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/verify"
              className="p-2 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Verify Medicine
            </Link>
            <Link
              to="/cart"
              className="p-2 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              to="/dashboard"
              className="p-2 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
