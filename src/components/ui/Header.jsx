import { Menu, QrCode, ShoppingCart, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-background shadow-sm sticky top-0 z-10 font-sans">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">PureMeds</span>

        <div className="hidden md:flex items-center space-x-8">
          <span >Home</span>
          <span >Categories</span>
          <span className="flex items-center gap-1">
            <QrCode size={18} /> <span>Verify Medicine</span>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-text  p-2 relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </div>

          <User size={22} />
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-3">
            Home Categories
            <QrCode size={18} />
            <span>Verify Medicine</span>
            <ShoppingCart size={18} />
            <span>Cart (3)</span>
            <User size={18} />
            <span>Admin</span>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
