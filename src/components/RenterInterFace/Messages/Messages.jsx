import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  fetchConversations,
  fetchMessages,
  sendMessage,
} from "../../../redux/features/Message/messageSlice";
import { MessageSquare, Send, User, Search, Clock } from "lucide-react";

const Messages = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const hostIdFromQuery = searchParams.get("hostId");
  const listingIdFromQuery = searchParams.get("listingId");

  const { conversations, messages, loading } = useSelector(
    (state) => state.message
  );
  const loginInfo = useSelector((state) => state.loginInfo);

  const [activeConv, setActiveConv] = useState(null);
  const [inputMessage, setInputMessage] = useState("");

  const dummyConversations = [
    {
      _id: "c1",
      hostName: "Rajesh Kumar",
      listingTitle: "Spacious Garage in Bandra",
      lastMessage: "Hi, is the space available for immediate move-in?",
      updatedAt: "10:30 AM",
      unread: 1,
    },
    {
      _id: "c2",
      hostName: "Anita Sharma",
      listingTitle: "Climate Controlled Basement",
      lastMessage: "Yes, you can visit tomorrow at 4 PM.",
      updatedAt: "Yesterday",
      unread: 0,
    },
  ];

  const convList = conversations.length > 0 ? conversations : dummyConversations;

  useEffect(() => {
    dispatch(fetchConversations());
    if (convList.length > 0 && !activeConv) {
      setActiveConv(convList[0]);
    }
  }, [dispatch]);

  useEffect(() => {
    if (activeConv) {
      dispatch(fetchMessages(activeConv._id));
    }
  }, [dispatch, activeConv]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;

    dispatch(
      sendMessage({
        conversationId: activeConv._id,
        recipientId: activeConv.hostId,
        content: inputMessage,
      })
    );
    setInputMessage("");
  };

  const dummyMessages = [
    { _id: "m1", sender: "other", content: "Hello! How can I help you regarding my space?", time: "10:28 AM" },
    { _id: "m2", sender: "me", content: "Hi, is the space available for immediate move-in?", time: "10:30 AM" },
  ];

  const currentMessages = messages.length > 0 ? messages : dummyMessages;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden h-[75vh] flex">
      {/* Left: Conversation List */}
      <div className="w-full sm:w-80 border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h1 className="font-bold text-lg text-gray-900">Messages</h1>
          <p className="text-xs text-gray-500">Host conversations</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {convList.map((c) => (
            <div
              key={c._id}
              onClick={() => setActiveConv(c)}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-start gap-3 ${
                activeConv?._id === c._id ? "bg-[#E9F2FF]/60" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#2B7FFF] text-white flex items-center justify-center font-bold text-sm shrink-0">
                {c.hostName ? c.hostName[0].toUpperCase() : "H"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-gray-900 truncate">
                    {c.hostName}
                  </h4>
                  <span className="text-[10px] text-gray-400">{c.updatedAt}</span>
                </div>
                <p className="text-[11px] text-[#2B7FFF] font-medium truncate mt-0.5">
                  {c.listingTitle}
                </p>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {c.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Message Window */}
      {activeConv ? (
        <div className="hidden sm:flex flex-1 flex-col h-full bg-gray-50/50">
          {/* Top Bar */}
          <div className="p-4 bg-white border-b border-gray-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2B7FFF] text-white flex items-center justify-center font-bold text-sm">
              {activeConv.hostName ? activeConv.hostName[0].toUpperCase() : "H"}
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">
                {activeConv.hostName}
              </h3>
              <p className="text-xs text-[#2B7FFF]">
                {activeConv.listingTitle}
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {currentMessages.map((m) => {
              const isMe = m.sender === "me" || m.sender === loginInfo.id;
              return (
                <div
                  key={m._id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-xs space-y-1 shadow-xs ${
                      isMe
                        ? "bg-[#2B7FFF] text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                    }`}
                  >
                    <p className="leading-relaxed">{m.content}</p>
                    <span
                      className={`text-[9px] block text-right ${
                        isMe ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      {m.time || "Just now"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex gap-2"
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#2B7FFF]"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#2B7FFF] text-white rounded-xl hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center justify-center text-gray-400 text-xs">
          Select a conversation to start messaging
        </div>
      )}
    </div>
  );
};

export default Messages;
