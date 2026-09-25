import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn, logout } from "../../redux/features/User/user";
import { clearLogin } from "../../redux/features/Login/loginSlice";
import {
  Search,
  Heart,
  MessageSquare,
  Bell,
  User,
  LogOut,
  Building2,
  Menu as MenuIcon,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const RenterNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loginInfo = useSelector((state) => state.loginInfo);
  const unreadNotifications = useSelector(
    (state) => state.notification?.unreadCount || 0
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request error:", err);
    } finally {
      dispatch(clearLogin());
      dispatch(logout());
      setUserDropdownOpen(false);
      navigate("/SignIn-Up");
    }
  };

  const navLinks = [
    { label: "Browse Spaces", path: "/spaces", icon: Search },
    { label: "Favorites", path: "/favorites", icon: Heart },
    { label: "Bookings", path: "/bookings", icon: Building2 },
    { label: "Messages", path: "/messages", icon: MessageSquare },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/box-stroke-rounded.svg"
              alt="SpareSpace Logo"
              className="w-9 h-9 rounded-xl p-1.5 bg-[#2B7FFF] group-hover:scale-105 transition-transform"
            />
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Spare<span className="text-[#2B7FFF]">Space</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-[#E9F2FF] text-[#2B7FFF]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={17} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-3">
            {/* Host Link */}
            <Link
              to="/DashBoard"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Sparkles size={16} className="text-[#2B7FFF]" />
              Become a Host
            </Link>

            {/* Notifications */}
            {isLoggedIn && (
              <Link
                to="/notifications"
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                title="Notifications"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </Link>
            )}

            {/* Auth / Profile */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2B7FFF] text-white flex items-center justify-center font-semibold text-sm">
                    {loginInfo.username ? loginInfo.username[0].toUpperCase() : "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
                    {loginInfo.username || "User"}
                  </span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {loginInfo.email || loginInfo.username}
                      </p>
                    </div>

                    <Link
                      to="/renter/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} />
                      Dashboard
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} />
                      Profile Settings
                    </Link>

                    <Link
                      to="/payments"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Building2 size={16} />
                      Payment History
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left cursor-pointer"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/SignIn-Up"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/spaces"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-[#2B7FFF] hover:bg-blue-600 transition-colors shadow-xs hover:shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? "bg-[#E9F2FF] text-[#2B7FFF]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}

          <Link
            to="/DashBoard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-semibold text-gray-900 bg-gray-100"
          >
            <Sparkles size={20} className="text-[#2B7FFF]" />
            Become a Host
          </Link>

          <div className="border-t border-gray-100 pt-3">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="px-3 py-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {loginInfo.username}
                  </p>
                  <p className="text-xs text-gray-500">{loginInfo.email}</p>
                </div>
                <Link
                  to="/renter/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Renter Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/SignIn-Up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/spaces"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 bg-[#2B7FFF] text-white rounded-xl font-semibold"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default RenterNavbar;
