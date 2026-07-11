import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Mail, 
  Eye, 
  Calendar, 
  Building, 
  ShieldCheck, 
  Check, 
  Volume2, 
  Image as ImageIcon,
  User,
  SlidersHorizontal,
  ChevronRight,
  MoreVertical,
  X,
  Mic,
  MessageSquare
} from 'lucide-react';

// Custom utility style to hide scrollbars
const scrollbarHiddenStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const Message = () => {
  // Mock conversations database
  const [conversations, setConversations] = useState([
    {
      id: 1,
      guestName: "Ava Cooper",
      avatar: "AC",
      avatarColor: "bg-blue-100 text-[#2B7FFF]",
      email: "ava.cooper@example.com",
      phone: "+1 (206) 555-0142",
      online: true,
      unread: false,
      lastMessage: "Voice memo • 0:12",
      lastMessageTime: "10 mins ago",
      space: "Climate-Controlled Garage",
      location: "1420 Pine St, Seattle",
      bookingDates: "Jul 10, 2026 - Jan 10, 2027",
      bookingPrice: "$1,110.00",
      bookingStatus: "Confirmed",
      messages: [
        { sender: 'guest', type: 'text', content: "Hi there! I was wondering if I could drop off my storage boxes a bit earlier on the 10th?", time: "10:30 AM" },
        { sender: 'host', type: 'text', content: "Hello Ava! Yes, that works perfectly. I'll make sure the garage door access code is activated by 9:00 AM.", time: "10:32 AM" },
        { sender: 'guest', type: 'text', content: "Awesome! I've attached a picture of the storage containers so you can see what they look like.", time: "10:35 AM" },
        { sender: 'guest', type: 'image', content: "/garage.jpg", time: "10:36 AM" },
        { sender: 'guest', type: 'voice', content: "Audio message (12s)", duration: "0:12", time: "10:37 AM" }
      ]
    },
    {
      id: 2,
      guestName: "Liam Patterson",
      avatar: "LP",
      avatarColor: "bg-purple-100 text-purple-600",
      email: "liam.p@example.com",
      phone: "+1 (206) 555-0189",
      online: false,
      unread: false,
      lastMessage: "Awesome, thanks for confirming.",
      lastMessageTime: "2 hours ago",
      space: "Climate-Controlled Vault",
      location: "405 Pike St, Seattle",
      bookingDates: "Jun 15, 2026 - Dec 15, 2026",
      bookingPrice: "$900.00",
      bookingStatus: "Confirmed",
      messages: [
        { sender: 'guest', type: 'text', content: "Is the security monitoring system active 24/7 in the vault?", time: "Yesterday" },
        { sender: 'host', type: 'text', content: "Yes, Liam. We have motion sensor cameras and a secure code lock active around the clock.", time: "Yesterday" },
        { sender: 'guest', type: 'text', content: "Awesome, thanks for confirming.", time: "Yesterday" }
      ]
    },
    {
      id: 3,
      guestName: "Sophia Martinez",
      avatar: "SM",
      avatarColor: "bg-amber-100 text-amber-600",
      email: "sophia.m@example.com",
      phone: "+1 (206) 555-0111",
      online: true,
      unread: true,
      lastMessage: "Hi, I just submitted a lease request...",
      lastMessageTime: "Just now",
      space: "Clean Driveway Parking Spot",
      location: "2101 N 34th St, Seattle",
      bookingDates: "May 01, 2026 - Oct 01, 2026",
      bookingPrice: "$375.00",
      bookingStatus: "Pending",
      messages: [
        { sender: 'guest', type: 'text', content: "Hi, I just submitted a lease request. Looking forward to renting your driveway spot!", time: "11:05 AM" }
      ]
    }
  ]);

  const [activeId, setActiveId] = useState(1);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  // Statistics
  const totalConversations = conversations.length;
  const unreadCount = conversations.filter(c => c.unread).length;

  // Active Chat details
  const activeChat = conversations.find(c => c.id === activeId);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, isTyping]);

  // Handle select conversation
  const selectConversation = (id) => {
    setActiveId(id);
    // Mark as read
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: false } : c));
  };

  // Handle send message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      sender: 'host',
      type: 'text',
      content: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update messages
    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          lastMessage: inputText,
          lastMessageTime: "Just now",
          messages: [...c.messages, newMessage]
        };
      }
      return c;
    }));

    setInputText('');

    // Trigger mock guest response after 2 seconds
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const guestReply = {
        sender: 'guest',
        type: 'text',
        content: `Thanks for the response! Let me know if there's anything else I should prepare.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeId) {
          return {
            ...c,
            lastMessage: guestReply.content,
            lastMessageTime: "Just now",
            messages: [...c.messages, guestReply]
          };
        }
        return c;
      }));
    }, 2500);
  };

  // Filter conversations
  const filteredConversations = conversations.filter(c => 
    c.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.space.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animations variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scrollbarHiddenStyle }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col bg-[#FBFDFE] text-slate-800 font-sans selection:bg-[#2B7FFF]/10 selection:text-[#2B7FFF]"
      >
        {/* HEADER & STATISTICS OVERVIEW (Top Row) */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950">Messages</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Communicate with guests.</p>
          </div>

          {/* Quick Statistics Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Conversations</span>
              <span className="text-xs font-black text-slate-900">{totalConversations}</span>
            </div>
            <div className="bg-white border border-[#2B7FFF]/10 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#2B7FFF] uppercase tracking-wider">Unread Messages</span>
              <span className="text-xs font-black text-[#2B7FFF] px-1.5 py-0.5 rounded-full bg-blue-50">{unreadCount}</span>
            </div>
            <div className="bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Response Rate</span>
              <span className="text-xs font-black text-emerald-600">98%</span>
            </div>
            <div className="bg-white border border-slate-100 px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Response Time</span>
              <span className="text-xs font-black text-slate-900">&lt; 15m</span>
            </div>
          </div>
        </div>

        {/* THREE COLUMN MESSAGING WORKSPACE */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          
          {/* COLUMN 1: CONVERSATIONS LIST (Left, 300px) */}
          <div className="w-80 border-r border-slate-100 flex flex-col bg-white shrink-0">
            {/* Search Bar */}
            <div className="p-4 border-b border-slate-50">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search guest or space..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8.5 pr-4 py-1.5 w-full text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
              <AnimatePresence>
                {filteredConversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    onClick={() => selectConversation(conv.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition ${
                      activeId === conv.id 
                        ? 'bg-blue-50/70 border border-blue-100/50' 
                        : 'border border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${conv.avatarColor}`}>
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 truncate">{conv.guestName}</h4>
                        <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">{conv.space}</p>
                        <p className={`text-[10px] truncate mt-1 ${conv.unread ? 'text-[#2B7FFF] font-extrabold' : 'text-slate-500 font-semibold'}`}>
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                      <span className="text-[8px] text-slate-400 font-bold">{conv.lastMessageTime}</span>
                      {conv.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#2B7FFF]" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* COLUMN 2: ACTIVE CHAT THREAD (Center, Flexible) */}
          <div className="flex-1 flex flex-col bg-slate-50/40 min-w-0">
            {activeChat ? (
              <>
                {/* Active Chat Header */}
                <div className="px-6 py-4.5 bg-white border-b border-slate-100 flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${activeChat.avatarColor}`}>
                        {activeChat.avatar}
                      </div>
                      {activeChat.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{activeChat.guestName}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                        {activeChat.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Messages Stream */}
                <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
                  <div className="flex justify-center my-2">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest">Today</span>
                  </div>

                  <AnimatePresence>
                    {activeChat.messages.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex ${msg.sender === 'host' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] rounded-2xl p-3.5 text-xs shadow-xs ${
                          msg.sender === 'host' 
                            ? 'bg-[#2B7FFF] text-white rounded-tr-none' 
                            : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-[0_4px_20px_rgba(0,0,0,0.01)]'
                        }`}>
                          {/* Text Message */}
                          {msg.type === 'text' && <p className="font-semibold leading-relaxed">{msg.content}</p>}

                          {/* Image Message */}
                          {msg.type === 'image' && (
                            <div className="rounded-xl overflow-hidden max-w-xs border border-slate-100">
                              <img src={msg.content} alt="Attachment" className="w-full h-36 object-cover" />
                            </div>
                          )}

                          {/* Voice Message */}
                          {msg.type === 'voice' && (
                            <div className="flex items-center gap-3 py-1">
                              <button className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition ${
                                msg.sender === 'host' ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-blue-50 text-[#2B7FFF] hover:bg-blue-100'
                              }`}>
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <div className="flex items-center gap-1">
                                {[3, 6, 4, 8, 2, 9, 5, 7, 3, 6].map((h, i) => (
                                  <span key={i} className={`w-0.5 rounded-full ${
                                    msg.sender === 'host' ? 'bg-white' : 'bg-slate-300'
                                  }`} style={{ height: `${h * 2}px` }} />
                                ))}
                              </div>
                              <span className="text-[10px] font-bold">{msg.duration}</span>
                            </div>
                          )}

                          <span className={`block text-[8px] text-right mt-1.5 font-bold ${
                            msg.sender === 'host' ? 'text-white/60' : 'text-slate-400'
                          }`}>
                            {msg.time}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                        <motion.span animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <motion.span animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.15 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        <motion.span animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={chatBottomRef} />
                </div>

                {/* Input Controls Bar */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <button type="button" className="p-2 rounded-full hover:bg-slate-50 hover:text-slate-600 transition cursor-pointer">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button type="button" className="p-2 rounded-full hover:bg-slate-50 hover:text-slate-600 transition cursor-pointer">
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type message here..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2B7FFF] focus:border-transparent transition-all text-slate-800"
                  />

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="p-2.5 bg-[#2B7FFF] hover:bg-[#1A6EEF] text-white rounded-xl shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Select a Conversation</h3>
                <p className="text-xs text-slate-400 max-w-xs font-semibold px-6">Select a guest thread to begin communicating.</p>
              </div>
            )}
          </div>

          {/* COLUMN 3: GUEST & LEASE DETAILS (Right, 280px) */}
          {activeChat && (
            <div className="hidden xl:flex w-72 border-l border-slate-100 flex-col bg-white overflow-y-auto no-scrollbar shrink-0 p-5 space-y-6">
              
              {/* Profile Card */}
              <div className="text-center space-y-3 pb-5 border-b border-slate-100">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-base mx-auto shadow-sm ${activeChat.avatarColor}`}>
                  {activeChat.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">{activeChat.guestName}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Lease Subscriber</p>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ID Verified</span>
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-3">
                <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Contact Info</h5>
                <div className="space-y-2 text-xs font-semibold text-slate-600">
                  <a href={`mailto:${activeChat.email}`} className="flex items-center gap-2 hover:text-[#2B7FFF] transition">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{activeChat.email}</span>
                  </a>
                  <a href={`tel:${activeChat.phone}`} className="flex items-center gap-2 hover:text-[#2B7FFF] transition">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{activeChat.phone}</span>
                  </a>
                </div>
              </div>

              {/* Lease Detail Box */}
              <div className="space-y-3 pt-2">
                <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Active Lease</h5>
                <div className="bg-slate-50 border border-slate-100/60 p-4 rounded-2xl space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-950 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#2B7FFF] shrink-0" />
                      {activeChat.space}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{activeChat.location}</p>
                  </div>
                  
                  <div className="space-y-2 pt-2 border-t border-slate-200/40 text-[11px] font-semibold text-slate-500">
                    <div className="flex justify-between">
                      <span>Term:</span>
                      <span className="text-slate-800 font-bold">{activeChat.bookingDates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="text-[#2B7FFF] font-extrabold">{activeChat.bookingPrice}</span>
                    </div>
                    <div className="flex justify-between items-center pt-0.5">
                      <span>Status:</span>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                        activeChat.bookingStatus === 'Confirmed' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                      }`}>{activeChat.bookingStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions row */}
              <div className="space-y-2 pt-4 border-t border-slate-50">
                <h5 className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Quick Actions</h5>
                <div className="grid grid-cols-2 gap-2">
                  <a href={`tel:${activeChat.phone}`} className="flex py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-slate-700 items-center justify-center gap-1 cursor-pointer">
                    <Phone className="w-3 h-3 text-slate-400" /> Call
                  </a>
                  <a href={`mailto:${activeChat.email}`} className="flex py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-slate-700 items-center justify-center gap-1 cursor-pointer">
                    <Mail className="w-3 h-3 text-slate-400" /> Email
                  </a>
                </div>
                <button className="w-full flex py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-bold items-center justify-center gap-1 cursor-pointer shadow-sm">
                  View Booking Details
                </button>
              </div>

            </div>
          )}

        </div>

      </motion.div>
    </>
  );
};

export default Message;
