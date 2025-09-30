import { Menu, QrCode, ShoppingCart, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="bg-background shadow-sm sticky top-0 z-10 font-sans">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={"/"} >
          <span className="text-2xl font-bold text-primary">PureMeds</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to={"/"}>
            <span className="hover:text-primary-hover">Home</span>
          </Link>
          <Link to={"categories"}>
            <span className="hover:text-primary-hover">Categories</span>
          </Link>
          <span className="flex items-center gap-1 hover:text-primary-hover">
            <QrCode size={18} /> 
          <Link to={'verify'}>
            <span >Verify Medicine</span>
          </Link>
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
            <div className="p-2 flex items-center gap-2">
              <span>Verify Medicine</span>
            </div>
            <div className="p-2 flex items-center gap-2">
              <span>Cart</span>
            </div>
            <div className="p-2 flex items-center gap-2">
              <span>Profile</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
