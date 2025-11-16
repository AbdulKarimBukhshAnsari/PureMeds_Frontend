import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-text text-white text-sm pt-10 pb-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">PureMeds</h3>
            <p className="text-gray-300 mb-4">
              Your trusted platform for authentic medicines in Pakistan.
              Verified and blockchain-secured.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
                <li>
              <Link to={"/"} className="block hover:text-primary transition">
                  Home
              </Link>
                  </li>
                <li>
              <Link to={"/categories"} className="block hover:text-primary transition">
                  Categories
              </Link>
                  </li>
              <li>
              <Link to={"/verify"} className="block hover:text-primary transition">
                Verify Medicine
              </Link>
                </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Medical Plaza, Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <span className="text-gray-300">+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <span className="text-gray-300">contact@puremeds.pk</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to get updates on new medicines and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 w-full text-gray-900 bg-white rounded-l focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary px-4 py-2 rounded-r hover:bg-primary-hover transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-3 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} PureMeds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
