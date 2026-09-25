import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyBookings } from "../../../redux/features/Booking/bookingSlice";
import { Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Loader2,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

const TABS = ["Upcoming", "Active", "Completed", "Cancelled"];

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);
  const [activeTab, setActiveTab] = useState("Upcoming");

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const filteredBookings = bookings.filter((b) => {
    const status = (b.bookingStatus || "confirmed").toLowerCase();
    if (activeTab === "Upcoming") return status === "confirmed" || status === "pending";
    if (activeTab === "Active") return status === "active";
    if (activeTab === "Completed") return status === "completed";
    if (activeTab === "Cancelled") return status === "cancelled";
    return true;
  });

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "confirmed" || s === "active")
      return (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <CheckCircle2 size={13} />
          {status}
        </span>
      );
    if (s === "cancelled")
      return (
        <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-3 py-1 rounded-full border border-red-200">
          <XCircle size={13} />
          Cancelled
        </span>
      );
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
        <Clock size={13} />
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage your current, upcoming, and past storage rentals
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar pb-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#2B7FFF] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#2B7FFF]" />
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBookings.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs my-8">
          <div className="w-16 h-16 bg-[#E9F2FF] text-[#2B7FFF] rounded-2xl flex items-center justify-center mx-auto">
            <Building2 size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              No {activeTab.toLowerCase()} bookings found
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              You don't have any bookings under this tab right now.
            </p>
          </div>
          <Link
            to="/spaces"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2B7FFF] text-white font-semibold text-xs rounded-xl hover:bg-blue-600 transition-colors shadow-xs"
          >
            Find a Space
          </Link>
        </div>
      )}

      {/* Booking List Cards */}
      {!loading && filteredBookings.length > 0 && (
        <div className="space-y-4">
          {filteredBookings.map((b) => {
            const listing = b.listing || {};
            const image =
              listing.images && listing.images.length > 0
                ? listing.images[0].url
                : "/garage.jpg";

            return (
              <div
                key={b._id}
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={image}
                    alt={listing.title || "Space"}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 bg-gray-100"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(b.bookingStatus)}
                      <span className="text-xs text-gray-400 font-mono">
                        ID: {b._id ? b._id.substring(0, 8) : "N/A"}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 line-clamp-1">
                      {listing.title || "Storage Space"}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MapPin size={13} className="text-gray-400" />
                      <span>
                        {listing.city || "Location"}, {listing.state || ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar size={13} className="text-gray-400" />
                      <span>
                        {b.startDate} → {b.endDate} ({b.durationMonths || 1} mo)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-3">
                  <div>
                    <span className="text-xs text-gray-400 block text-right">Total Paid</span>
                    <span className="text-lg font-extrabold text-gray-900">
                      ₹{b.totalAmount}
                    </span>
                  </div>

                  <Link
                    to={`/bookings/${b._id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 bg-[#E9F2FF] text-[#2B7FFF] hover:bg-[#2B7FFF] hover:text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
                  >
                    View Details
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
