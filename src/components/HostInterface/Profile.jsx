import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Shield, 
  Laptop, 
  Smartphone, 
  Download, 
  Trash2, 
  Check, 
  AlertCircle, 
  Camera, 
  Key,
  Globe,
  X
} from 'lucide-react';

const Profile = () => {
  const [toasts, setToasts] = useState([]);
  
  // Account Form states
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (206) 555-0142",
    role: "Host",
    memberSince: "July 2025"
  });

  // Password fields
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // Toggle Switches State
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    bookingRequests: true,
    payoutAlerts: true,
    twoFactor: false
  });

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Helper to trigger custom toasts
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Submit handlers
  const handleSavePersonalInfo = (e) => {
    e.preventDefault();
    triggerToast("Personal details updated successfully", "success");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      triggerToast("New passwords do not match!", "error");
      return;
    }
    triggerToast("Account password updated successfully", "success");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleDownloadData = () => {
    triggerToast("Compiling host archive... download will begin shortly", "success");
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    setIsDeleteModalOpen(false);
    triggerToast("Account deletion request submitted", "error");
  };

  // Toggle switch helper
  const toggleSwitch = (key) => {
    setNotifications(prev => {
      const newVal = !prev[key];
      triggerToast(
        `${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} ${newVal ? 'Enabled' : 'Disabled'}`,
        'success'
      );
      return { ...prev, [key]: newVal };
    });
  };

  // Animations configuration
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="h-full overflow-y-auto bg-[#FBFDFE] text-slate-800 font-sans selection:bg-[#2B7FFF]/10 selection:text-[#2B7FFF]"
    >
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 relative">
        
        {/* Floating Custom Toast Messages */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="pointer-events-auto bg-slate-900 border border-slate-800 text-white px-4.5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs md:text-sm font-semibold max-w-sm"
              >
                {toast.type === 'success' ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                  </div>
                )}
                <span>{toast.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* HEADER */}
        <motion.header 
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="border-b border-slate-100 pb-6"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">Profile Settings</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage your account and profile parameters.</p>
        </motion.header>

        {/* GRID WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* LEFT SECTION (Profile Card & Stats) */}
          <div className="space-y-6">
            
            {/* Profile Card */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] text-center relative overflow-hidden"
            >
              {/* Background accent ring */}
              <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-blue-50/40 -z-10" />
              
              {/* Avatar with Glow hover */}
              <div className="relative w-24 h-24 mx-auto group">
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(43, 127, 255, 0.4)" }}
                  className="w-full h-full rounded-full bg-gradient-to-tr from-[#2B7FFF] to-purple-500 p-1 cursor-pointer transition shadow-lg flex items-center justify-center"
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-2xl text-[#2B7FFF] border-2 border-white shadow-inner">
                    JD
                  </div>
                </motion.div>
                
                {/* Upload camera button */}
                <button className="absolute bottom-0 right-0 p-2 bg-slate-900 border-2 border-white text-white rounded-full hover:bg-slate-800 transition cursor-pointer shadow-md">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-4.5 space-y-1">
                <h3 className="text-base font-extrabold text-slate-900">{personalInfo.fullName}</h3>
                <p className="text-xs text-[#2B7FFF] font-bold uppercase tracking-wider">{personalInfo.role}</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">Host Member since {personalInfo.memberSince}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-50 text-xs font-semibold text-slate-500">
                <div className="border-r border-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ID Verification</span>
                  <span className="text-emerald-500 font-extrabold flex items-center justify-center gap-1 mt-1">
                    <Check className="w-4 h-4 stroke-[2.5]" /> Verified
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Portfolio Size</span>
                  <span className="text-slate-800 font-extrabold block mt-1">8 Active Spaces</span>
                </div>
              </div>
            </motion.div>

            {/* Notification settings panel */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5"
            >
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Bell className="w-4.5 h-4.5 text-[#2B7FFF]" />
                  <span>Notification Toggles</span>
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Control mail and alerts preferences.</p>
              </div>

              {/* Switches */}
              <div className="space-y-4 pt-1.5">
                {[
                  { key: 'emailUpdates', label: 'General Email Updates', desc: 'Receive monthly newsletter updates.' },
                  { key: 'bookingRequests', label: 'Booking Request Alerts', desc: 'Notify instantly on new reservations.' },
                  { key: 'payoutAlerts', label: 'Payout Clearances', desc: 'Alert when bank payouts settle.' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-800">{item.label}</span>
                      <p className="text-[9px] text-slate-400 font-semibold">{item.desc}</p>
                    </div>
                    
                    {/* Sliding Switch Box */}
                    <div 
                      onClick={() => toggleSwitch(item.key)}
                      className={`w-10 h-5.5 rounded-full p-0.5 cursor-pointer flex items-center transition-colors duration-200 ${
                        notifications[item.key] ? 'bg-[#2B7FFF]' : 'bg-slate-200'
                      }`}
                    >
                      <motion.div 
                        layout 
                        className="w-4.5 h-4.5 rounded-full bg-white shadow-md"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CENTER & RIGHT SECTION (Forms, Security & Devices) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal & Contact Information form */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
            >
              <div className="mb-5 border-b border-slate-50 pb-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4.5 h-4.5 text-[#2B7FFF]" />
                  <span>Personal Details</span>
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage your personal profiles.</p>
              </div>

              <form onSubmit={handleSavePersonalInfo} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={personalInfo.fullName}
                        onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                        className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">System Role</label>
                    <input
                      type="text"
                      disabled
                      value={personalInfo.role}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-100 bg-slate-50 text-xs text-slate-400 font-bold"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white text-xs font-bold shadow-md shadow-blue-500/10 transition cursor-pointer"
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Password Update Form */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
            >
              <div className="mb-5 border-b border-slate-50 pb-4">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Lock className="w-4.5 h-4.5 text-[#2B7FFF]" />
                  <span>Update Password</span>
                </h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Keep your account safe.</p>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Current Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={passwords.current}
                        onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                        className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">New Password</label>
                    <div className="relative">
                      <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={passwords.new}
                        onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Confirm New Password</label>
                    <div className="relative">
                      <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        className="w-full pl-9.5 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-50 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white text-xs font-bold shadow-md shadow-blue-500/10 transition cursor-pointer"
                  >
                    Update Password
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Security Toggles, Active Devices & Archives */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white border border-slate-100 rounded-[20px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6"
            >
              {/* Security section title */}
              <div className="border-b border-slate-50 pb-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Shield className="w-4.5 h-4.5 text-[#2B7FFF]" />
                    <span>Security & Sessions</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Manage access keys and device logins.</p>
                </div>
                
                {/* 2FA switch */}
                <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-600">Two-Factor Auth</span>
                  <div 
                    onClick={() => toggleSwitch('twoFactor')}
                    className={`w-9 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-colors duration-200 ${
                      notifications.twoFactor ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  >
                    <motion.div 
                      layout 
                      className="w-4 h-4 rounded-full bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </div>
                </div>
              </div>

              {/* Active Device log list */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Device Sessions</h5>
                
                <div className="space-y-3">
                  {/* Session 1 */}
                  <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-50 text-[#2B7FFF] rounded-xl">
                        <Laptop className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Chrome on Windows 11</h5>
                        <p className="text-[9px] text-slate-400 font-semibold flex items-center gap-1.5 mt-0.5">
                          <Globe className="w-3 h-3 text-slate-400" /> IP: 198.162.1.28
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="text-emerald-500 font-extrabold uppercase">Active Session</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">Seattle, USA</span>
                  </div>

                  {/* Session 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                        <Smartphone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">Safari on iPhone 15 Pro</h5>
                        <p className="text-[9px] text-slate-400 font-semibold flex items-center gap-1.5 mt-0.5">
                          <Globe className="w-3 h-3 text-slate-400" /> IP: 172.56.21.9
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span>Last login: 2 hours ago</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold">Seattle, USA</span>
                  </div>
                </div>
              </div>

              {/* Data Archive & Danger zone */}
              <div className="pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Download Archive */}
                <div className="border border-slate-100 p-4 rounded-2xl flex flex-col justify-between items-start gap-3 bg-slate-50/30">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">Request Data Archive</h5>
                    <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Download a copy of your hosted data files.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDownloadData}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-[10px] font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" /> Download Data
                  </motion.button>
                </div>

                {/* Delete Account */}
                <div className="border border-rose-100/60 p-4 rounded-2xl flex flex-col justify-between items-start gap-3 bg-rose-50/20">
                  <div>
                    <h5 className="text-xs font-bold text-rose-600">Danger Zone</h5>
                    <p className="text-[9px] text-rose-400 font-semibold mt-0.5">Permanently delete your host listing account.</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-[10px] font-bold flex items-center gap-1.5 cursor-pointer shadow-md shadow-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Account
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className="relative bg-white rounded-[24px] shadow-2xl p-6 w-full max-w-sm border border-slate-100 z-10"
            >
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="absolute top-4.5 right-4.5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Are you absolutely sure?</h3>
                  <p className="text-xs text-slate-400 font-semibold mt-1">This action cannot be undone. This will permanently delete your Host profile and remove all listings from SpareSpace.</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-4">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDeleteAccount}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/10 transition cursor-pointer"
                >
                  Delete Permanently
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default Profile;
