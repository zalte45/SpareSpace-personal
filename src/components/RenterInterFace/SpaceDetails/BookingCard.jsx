import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBooking } from "../../../redux/features/Booking/bookingSlice";
import { Calendar, Shield, Info, CheckCircle2 } from "lucide-react";

const BookingCard = ({ listing }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [durationMonths, setDurationMonths] = useState(1);

  const pricePerMonth = listing.price || 0;
  const securityDeposit = listing.securityDeposit || 0;

  // Price calculations
  const rentTotal = pricePerMonth * durationMonths;
  const platformFee = Math.round(rentTotal * 0.05); // 5% fee
  const grandTotal = rentTotal + securityDeposit + platformFee;

  // Calculate End Date
  const calculateEndDate = (start, months) => {
    const d = new Date(start);
    d.setMonth(d.getMonth() + parseInt(months));
    return d.toISOString().split("T")[0];
  };

  const endDate = calculateEndDate(startDate, durationMonths);

  const handleBookNow = async () => {
    if (!isLoggedIn) {
      alert("Please sign in to book this storage space.");
      navigate("/SignIn-Up");
      return;
    }

    const bookingPayload = {
      listingId: listing._id,
      startDate,
      endDate,
      durationMonths: parseInt(durationMonths),
      monthlyPrice: pricePerMonth,
      securityDeposit,
      platformFee,
      totalAmount: grandTotal,
    };

    try {
      const action = await dispatch(createBooking(bookingPayload));
      if (createBooking.fulfilled.match(action)) {
        const created = action.payload.booking;
        navigate(`/checkout/${created._id || created.id}`);
      } else {
        alert(action.payload || "Failed to create booking request.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl sticky top-24 space-y-5">
      {/* Price Header */}
      <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            ₹{pricePerMonth}
          </span>
          <span className="text-sm text-gray-500 font-medium"> / month</span>
        </div>
        {listing.availableImmediately && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={13} />
            Available Now
          </span>
        )}
      </div>

      {/* Date & Duration Selection */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2B7FFF]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Duration (Months)
          </label>
          <select
            value={durationMonths}
            onChange={(e) => setDurationMonths(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2B7FFF] cursor-pointer"
          >
            {[1, 2, 3, 6, 9, 12, 18, 24].map((m) => (
              <option key={m} value={m}>
                {m} {m === 1 ? "Month" : "Months"}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center justify-between">
          <span>End Date:</span>
          <span className="font-semibold text-gray-900">{endDate}</span>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2.5 pt-2 border-t border-gray-100 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>
            Rent (₹{pricePerMonth} × {durationMonths} mo)
          </span>
          <span className="font-semibold text-gray-900">₹{rentTotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            Security Deposit
            <Info size={13} className="text-gray-400" title="100% refundable upon move out" />
          </span>
          <span className="font-semibold text-gray-900">
            ₹{securityDeposit}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Platform Service Fee</span>
          <span className="font-semibold text-gray-900">₹{platformFee}</span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
          <span>Total Payable</span>
          <span className="text-[#2B7FFF]">₹{grandTotal}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleBookNow}
        className="w-full py-3.5 bg-[#2B7FFF] hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer text-center text-sm"
      >
        Book Now
      </button>

      {/* Security Guarantee Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
        <Shield size={15} className="text-[#2B7FFF]" />
        <span>Protected by SpareSpace Safety Guarantee</span>
      </div>
    </div>
  );
};

export default BookingCard;
