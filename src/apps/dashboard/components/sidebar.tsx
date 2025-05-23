import { useState } from "react";
import {
  Mic,
  Home as HomeIcon,
  PhoneIcon,
  User,
  Spline,
  CalendarSync,
  Pause,
  ChevronDown,
  ChevronUp,
  Settings,
  Users,
  Logs,
  Speaker,
  Calendar,
  History,
  CreditCard,
  Text,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <HomeIcon size={20} />, to: "/dashboard" },
    {
      label: "Calendar",
      icon: <Calendar size={20} />,
      to: "/dashboard/calendar",
    },
    {
      label: "Live Call",
      icon: <PhoneIcon size={20} />,
      to: "/dashboard/live-call",
    },
    {
      label: "Voice Chats",
      icon: <Mic size={20} />,
      to: "/dashboard/voice-bot-chat",
    },
    {
      label: "Live Chats",
      icon: <Text size={20} />,
      to: "/dashboard/live-chat",
    },
    {
      label: "Call Logs",
      icon: <Logs size={20} />,
      to: "/dashboard/call-logs",
    },
    {
      label: "Voices",
      icon: <Mic size={20} />,
      to: "/dashboard/voices",
    },
    {
      label: "Text to Speech",
      icon: <Speaker size={20} />,
      to: "/dashboard/text-to-speech",
    },
  ];

  return (
    <aside className="w-64 bg-[#1a1d22] text-white h-screen p-4 flex flex-col">
      <div className="text-xl font-bold mb-6">Vibes By Horton</div>
      <nav className="flex flex-col space-y-4">
        {navItems.map(({ label, icon, to }) => (
          <Link
            key={label}
            to={to}
            className={`flex items-center space-x-2 hover:text-blue-400 ${
              location.pathname === to ? "text-blue-400 font-semibold" : ""
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}

        {/* Integrations Dropdown */}
        <div>
          <button
            onClick={() => setIsIntegrationsOpen(!isIntegrationsOpen)}
            className="flex items-center space-x-2 w-full hover:text-blue-400"
          >
            <Spline size={20} />
            <span className="flex-1 text-left">Integrations</span>
            {isIntegrationsOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {isIntegrationsOpen && (
            <div className="ml-6 mt-2 flex flex-col space-y-2">
              <Link
                to="/dashboard/integration/google-calendar"
                className={`flex items-center space-x-2 hover:text-blue-400 ${
                  location.pathname === "/dashboard/integration/google-calendar"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                <CalendarSync size={18} />
                <span>Google Calendar</span>
              </Link>
              <Link
                to="/dashboard/integration/eleven-labs"
                className={`flex items-center space-x-2 hover:text-blue-400 ${
                  location.pathname === "/dashboard/integration/eleven-labs"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                <Pause size={18} />
                <span>ElevenLabs</span>
              </Link>
            </div>
          )}
        </div>

        {/* Settings Dropdown */}
        <div>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="flex items-center space-x-2 w-full hover:text-blue-400"
          >
            <Settings size={20} />
            <span className="flex-1 text-left">Settings</span>
            {isSettingsOpen ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
          {isSettingsOpen && (
            <div className="ml-6 mt-2 flex flex-col space-y-2">
              <Link
                to="/dashboard/settings/profile"
                className={`flex items-center space-x-2 hover:text-blue-400 ${
                  location.pathname === "/dashboard/settings/profile"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                <User size={18} />
                <span>Profile</span>
              </Link>
              <Link
                to="/dashboard/settings/users"
                className={`flex items-center space-x-2 hover:text-blue-400 ${
                  location.pathname === "/dashboard/settings/users"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                <Users size={18} />
                <span>Users</span>
              </Link>
              <Link
                to="/dashboard/settings/history"
                className={`flex items-center space-x-2 hover:text-blue-400 ${
                  location.pathname === "/dashboard/settings/history"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                <History size={18} />
                <span>History</span>
              </Link>
              <Link
                to="/dashboard/settings/billings"
                className={`flex items-center space-x-2 hover:text-blue-400 ${
                  location.pathname === "/dashboard/settings/billings"
                    ? "text-blue-400 font-semibold"
                    : ""
                }`}
              >
                <CreditCard size={18} />
                <span>Billings</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
