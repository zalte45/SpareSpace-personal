import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotifications,
  markAsRead,
} from "../../../redux/features/Notification/notificationSlice";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Star,
  RefreshCw,
  Clock,
  Loader2,
} from "lucide-react";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const dummyNotifications = [
    {
      _id: "n1",
      type: "booking_confirmed",
      title: "Booking Confirmed!",
      message: "Your storage space booking for Bandra Garage has been confirmed.",
      read: false,
      createdAt: "10 minutes ago",
    },
    {
      _id: "n2",
      type: "payment_success",
      title: "Payment Successful",
      message: "Payment of ₹3,625 for Booking #BKG-7712 was processed successfully.",
      read: true,
      createdAt: "2 hours ago",
    },
    {
      _id: "n3",
      type: "review_request",
      title: "How was your experience?",
      message: "Your rental period ended. Leave a review for Host Rajesh Kumar.",
      read: false,
      createdAt: "1 day ago",
    },
  ];

  const list = notifications.length > 0 ? notifications : dummyNotifications;

  const getIcon = (type) => {
    if (type === "booking_confirmed" || type === "payment_success")
      return <CheckCircle2 size={18} className="text-emerald-500" />;
    if (type === "host_message")
      return <MessageSquare size={18} className="text-[#2B7FFF]" />;
    if (type === "review_request")
      return <Star size={18} className="text-amber-500" />;
    return <Bell size={18} className="text-blue-500" />;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-xs text-gray-500 mt-1">
            Stay updated with your bookings, payments, and host messages
          </p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#2B7FFF]" />
        </div>
      )}

      {!loading && list.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-3 shadow-xs">
          <Bell size={36} className="mx-auto text-gray-300" />
          <h3 className="text-base font-bold text-gray-900">No notifications</h3>
          <p className="text-xs text-gray-500">You're all caught up!</p>
        </div>
      )}

      {!loading && list.length > 0 && (
        <div className="space-y-3">
          {list.map((n) => (
            <div
              key={n._id}
              onClick={() => !n.read && dispatch(markAsRead(n._id))}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                n.read
                  ? "bg-white border-gray-100 opacity-80"
                  : "bg-blue-50/40 border-blue-100 shadow-xs"
              }`}
            >
              <div className="p-2 bg-white rounded-xl shadow-2xs border border-gray-100">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-gray-900">
                    {n.title}
                  </h4>
                  <span className="text-[10px] text-gray-400">
                    {n.createdAt}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
