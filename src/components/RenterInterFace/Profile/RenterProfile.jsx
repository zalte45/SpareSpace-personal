import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsLoggedIn, logout } from "../../../redux/features/User/user";
import { clearLogin } from "../../../redux/features/Login/loginSlice";
import { User, Shield, Bell, LogOut, Key, Save } from "lucide-react";

const RenterProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginInfo = useSelector((state) => state.loginInfo);

  const [username, setUsername] = useState(loginInfo.username || "");
  const [email] = useState(loginInfo.email || "");
  const [phone, setPhone] = useState("9876543210");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    dispatch(clearLogin());
    dispatch(logout());
    navigate("/SignIn-Up");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage your account information, security, and storage preferences
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 rounded-2xl text-xs font-semibold">
          Profile preferences updated successfully!
        </div>
      )}

      {/* Personal Info */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 rounded-full bg-[#2B7FFF] text-white flex items-center justify-center font-extrabold text-lg">
            {username ? username[0].toUpperCase() : "U"}
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">
              {username || "User"}
            </h3>
            <p className="text-xs text-gray-400">{email}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2B7FFF]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#2B7FFF] hover:bg-blue-600 text-white font-semibold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Save size={15} />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Account Actions / Logout */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-4 shadow-xs">
        <h3 className="font-bold text-base text-gray-900">Account Security</h3>
        <div className="flex items-center justify-between pt-2">
          <div>
            <h4 className="font-semibold text-sm text-gray-800">Sign Out</h4>
            <p className="text-xs text-gray-400">
              Log out of your current session on this device
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenterProfile;
