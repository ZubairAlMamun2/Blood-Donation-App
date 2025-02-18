import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">About RedHope</h2>
          <p className="text-sm text-gray-200">
            RedHope is a community-driven blood donation platform dedicated to saving lives by connecting donors with those in need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-gray-200">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/donation" className="hover:text-gray-300">Donation Requests</Link></li>
            <li><Link to="/blogs" className="hover:text-gray-300">Blogs</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h2 className="text-xl font-bold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 hover:text-gray-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 hover:text-gray-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 hover:text-gray-300" />
            </a>
            <a href="mailto:contact@redhope.com">
              <Mail className="w-6 h-6 hover:text-gray-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 text-center text-gray-300 text-sm border-t border-gray-500 pt-4">
        © {new Date().getFullYear()} RedHope. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
