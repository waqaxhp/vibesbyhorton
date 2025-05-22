import { useState } from "react";
import {
  Menu,
  X,
  Box,
  Settings,
  BadgeDollarSign,
  Mail,
  Heart,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { id: "features", label: "Features", icon: <Box size={16} /> },
  { id: "process", label: "Process", icon: <Settings size={16} /> },
  { id: "pricing", label: "Pricing", icon: <BadgeDollarSign size={16} /> },
  { id: "contact", label: "Contact", icon: <Mail size={16} /> },
  { id: "reviews", label: "Reviews", icon: <Heart size={16} /> },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#0B0D11] text-white border-b border-[#1a1a1a] fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <a
            href="#hero"
            className="text-xl italic font-medium hover:opacity-80 transition"
          >
            Vibes by Horton
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex space-x-6 bg-[#0B0D11] px-6 py-2 rounded-full border border-[#1a1a1a]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              className="flex items-center gap-1 text-sm font-semibold hover:text-gray-300 transition"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex gap-x-2">
          <Link to="/dashboard">
            <button className="flex items-center cursor-pointer gap-2 bg-[#0B0D11] border border-[#1f1f1f] px-4 py-2 rounded-md hover:bg-[#1c1c1c] transition">
              <LogIn size={16} />
              <span className="text-sm font-semibold">Dashboard</span>
            </button>
          </Link>
          <Link to="/auth/login">
            <button className="flex items-center cursor-pointer gap-2 bg-[#0B0D11] border border-[#1f1f1f] px-4 py-2 rounded-md hover:bg-[#1c1c1c] transition">
              <LogIn size={16} />
              <span className="text-sm font-semibold">Login</span>
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="flex items-center cursor-pointer gap-2 bg-[#0B0D11] border border-[#1f1f1f] px-4 py-2 rounded-md hover:bg-[#1c1c1c] transition">
              <UserPlus size={16} />
              <span className="text-sm font-semibold">Sign Up</span>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0B0D11] border-t border-[#1a1a1a] px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              className="flex items-center gap-2 text-sm font-semibold hover:text-gray-300"
              onClick={() => setMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
          <Link to="/auth/login">
            <button className="flex items-center gap-2 bg-[#0B0D11] border border-[#1f1f1f] px-4 py-2 rounded-md hover:bg-[#1c1c1c] transition w-full">
              <LogIn size={16} />
              <span className="text-sm font-semibold">Login</span>
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="flex items-center gap-2 bg-[#0B0D11] border border-[#1f1f1f] px-4 py-2 rounded-md hover:bg-[#1c1c1c] transition w-full">
              <UserPlus size={16} />
              <span className="text-sm font-semibold">Sign Up</span>
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
