import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookingById,
  cancelBooking,
  clearSelectedBooking,
} from "../../../redux/features/Booking/bookingSlice";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  MessageSquare,
  XCircle,
  FileText,
  ShieldCheck,
  Loader2,
  AlertCircle,
  User,
} from "lucide-react";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedBooking, loading, error } = useSelector((state) => state.booking);
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingById(bookingId));
    }
    return () => {
      dispatch(clearSelectedBooking());
    };
  }, [dispatch, bookingId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 size={36} className="animate-spin text-[#2B7FFF]" />
        <p className="text-sm font-semibold text-gray-500">Loading booking information...</p>
      </div>
    );
  }

  if (error || !selectedBooking) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-xs">
        <AlertCircle size={48} className="mx-auto text-red-500" />
        <h2 className="text-xl font-bold text-gray-900">Booking Not Found</h2>
        <p className="text-sm text-gray-500">
          {error || "We couldn't find the requested booking details."}
        </p>
        <Link
          to="/bookings"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2B7FFF] text-white font-semibold text-xs rounded-xl hover:bg-blue-600 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to My Bookings
        </Link>
      </div>
    );
  }

  const b = selectedBooking;
  const listing = b.listing || {};
  const host = b.host || listing.owner || {};

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await dispatch(cancelBooking(b._id));
    }
  };

  const handleMessageHost = () => {
    navigate(`/messages?hostId=${host._id || host}&listingId=${listing._id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Navigation */}
      <Link
        to="/bookings"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#2B7FFF] transition-colors"
      >
        <ChevronLeft size={16} />
        Back to My Bookings
      </Link>

      {/* Main Booking Summary Card */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs text-gray-400 font-mono block">
              BOOKING REFERENCE
            </span>
            <h1 className="text-xl font-extrabold text-gray-900">
              #{b._id}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
              {b.bookingStatus || "Confirmed"}
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#2B7FFF] border border-blue-200">
              {b.paymentStatus || "Paid"}
            </span>
          </div>
        </div>

        {/* Space Overview */}
        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <img
            src={
              listing.images && listing.images.length > 0
                ? listing.images[0].url
                : "/garage.jpg"
            }
            alt={listing.title}
            className="w-full sm:w-40 h-32 rounded-2xl object-cover bg-gray-100 shrink-0"
          />
          <div className="space-y-2 flex-1">
            <span className="text-xs font-semibold text-[#2B7FFF] bg-[#E9F2FF] px-2.5 py-0.5 rounded-md">
              {listing.category || "Storage Space"}
            </span>
            <h2 className="text-lg font-bold text-gray-900">
              {listing.title || "Untitled Space"}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <MapPin size={14} className="text-gray-400" />
              <span>
                {listing.street}, {listing.city}, {listing.state} - {listing.pincode}
              </span>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-gray-400 block mb-0.5">Start Date</span>
            <span className="font-bold text-gray-900 text-sm">{b.startDate}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">End Date</span>
            <span className="font-bold text-gray-900 text-sm">{b.endDate}</span>
          </div>
          <div>
            <span className="text-gray-400 block mb-0.5">Total Duration</span>
            <span className="font-bold text-gray-900 text-sm">
              {b.durationMonths || 1} Month(s)
            </span>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-gray-900">Payment Breakdown</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Monthly Rent (₹{b.monthlyPrice} / mo)</span>
              <span className="font-semibold text-gray-900">
                ₹{(b.monthlyPrice || 0) * (b.durationMonths || 1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Security Deposit (Refundable)</span>
              <span className="font-semibold text-gray-900">
                ₹{b.securityDeposit || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Platform Service Fee</span>
              <span className="font-semibold text-gray-900">
                ₹{b.platformFee || 0}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-3 text-sm font-extrabold text-gray-900">
              <span>Total Paid</span>
              <span className="text-[#2B7FFF]">₹{b.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Host Details */}
        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2B7FFF] text-white flex items-center justify-center font-bold text-sm">
              {host.username ? host.username[0].toUpperCase() : "H"}
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-900">
                Host: {host.username || "Verified Host"}
              </h4>
              <p className="text-xs text-gray-500">
                {host.email || "Contact via messages"}
              </p>
            </div>
          </div>

          <button
            onClick={handleMessageHost}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-800 hover:text-[#2B7FFF] rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <MessageSquare size={15} />
            Message Host
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl text-xs font-semibold cursor-pointer"
          >
            <FileText size={15} />
            View Receipt
          </button>

          {b.bookingStatus !== "cancelled" && (
            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <XCircle size={15} />
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
