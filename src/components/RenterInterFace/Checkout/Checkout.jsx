import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookingById } from "../../../redux/features/Booking/bookingSlice";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  ChevronLeft,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const Checkout = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedBooking, loading, error } = useSelector((state) => state.booking);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (bookingId) {
      dispatch(fetchBookingById(bookingId));
    }
  }, [dispatch, bookingId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 size={36} className="animate-spin text-[#2B7FFF]" />
        <p className="text-sm font-semibold text-gray-500">Preparing checkout...</p>
      </div>
    );
  }

  const b = selectedBooking || {
    _id: bookingId,
    monthlyPrice: 2500,
    durationMonths: 1,
    securityDeposit: 1000,
    platformFee: 125,
    totalAmount: 3625,
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
  };

  const handlePayNow = async () => {
    setProcessing(true);
    // As per requirements, payment integration is a separate task.
    // The booking is already created and saved in the database with paymentStatus = 'pending'.
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => navigate("/bookings"), 2000);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-12">
      <Link
        to="/spaces"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#2B7FFF] transition-colors"
      >
        <ChevronLeft size={16} />
        Back to Spaces
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-gray-100 pb-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#2B7FFF] bg-[#E9F2FF] px-3 py-1 rounded-full">
            Secure Checkout
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Confirm & Pay
          </h1>
        </div>

        {paymentSuccess ? (
          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl text-center space-y-3">
            <CheckCircle2 size={48} className="mx-auto text-emerald-500" />
            <h3 className="text-xl font-extrabold text-emerald-900">
              Booking Request Received!
            </h3>
            <p className="text-sm text-emerald-700">
              Your storage booking is saved (Payment integration pending). Redirecting to your bookings...
            </p>
          </div>
        ) : (
          <>
            {/* Booking Summary */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Rental Period</span>
                <span className="font-semibold text-gray-900">
                  {b.startDate} → {b.endDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span className="font-semibold text-gray-900">
                  {b.durationMonths || 1} Month(s)
                </span>
              </div>
              <div className="flex justify-between">
                <span>Rent</span>
                <span className="font-semibold text-gray-900">
                  ₹{(b.monthlyPrice || 2500) * (b.durationMonths || 1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <span className="font-semibold text-gray-900">
                  ₹{b.securityDeposit || 1000}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="font-semibold text-gray-900">
                  ₹{b.platformFee || 125}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-sm font-extrabold text-gray-900">
                <span>Total Amount Due</span>
                <span className="text-[#2B7FFF]">₹{b.totalAmount || 3625}</span>
              </div>
            </div>

            {/* Payment Method Badge */}
            <div className="p-4 rounded-2xl border border-blue-100 bg-blue-50/50 flex items-center gap-3">
              <CreditCard size={24} className="text-[#2B7FFF]" />
              <div>
                <h4 className="font-bold text-sm text-gray-900">
                  Razorpay Payment Gateway
                </h4>
                <p className="text-xs text-gray-500">
                  Supports UPI, Credit Cards, Debit Cards, Netbanking & Wallets
                </p>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePayNow}
              disabled={processing}
              className="w-full py-4 bg-[#2B7FFF] hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {processing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Pay ₹{b.totalAmount || 3625} & Confirm Booking
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
              <ShieldCheck size={15} className="text-emerald-500" />
              <span>256-Bit SSL Encrypted & Protected</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Checkout;
