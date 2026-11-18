import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  previewBooking,
  createBooking,
  clearBookingPreview,
} from "../../../redux/features/Booking/bookingSlice";
import {
  Shield,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

const calculateEndDate = (startStr, months) => {
  if (!startStr) return "";
  const [year, month, day] = startStr.split("-").map(Number);
  if (!year || !month || !day) return "";
  const end = new Date(Date.UTC(year, month - 1 + Number(months), day));
  return end.toISOString().split("T")[0];
};

const BookingCard = ({ listing }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
  const {
    preview,
    previewLoading,
    previewError,
    createLoading,
    createError,
  } = useSelector((state) => state.booking);

  const minDur = Math.max(1, parseInt(listing.minDuration, 10) || 1);
  const durationOptions = Array.from(
    new Set([minDur, 1, 2, 3, 6, 9, 12, 18, 24])
  ).sort((a, b) => a - b);

  const todayStr = new Date().toISOString().split("T")[0];
  const initialStart =
    !listing.availableImmediately &&
    listing.availableFrom &&
    new Date(listing.availableFrom) > new Date()
      ? new Date(listing.availableFrom).toISOString().split("T")[0]
      : todayStr;

  const [startDate, setStartDate] = useState(initialStart);
  const [durationMonths, setDurationMonths] = useState(minDur);
  const [submitError, setSubmitError] = useState(null);

  const endDate = calculateEndDate(startDate, durationMonths);

  useEffect(() => {
    if (!listing?._id || !startDate || !endDate) return;

    dispatch(
      previewBooking({
        listingId: listing._id,
        startDate,
        endDate,
        durationMonths: Number(durationMonths),
      })
    );
  }, [dispatch, listing?._id, startDate, endDate, durationMonths]);

  useEffect(() => {
    return () => {
      dispatch(clearBookingPreview());
    };
  }, [dispatch]);

  const pricePerMonth = preview?.monthlyPrice ?? (listing.price || 0);
  const securityDeposit = preview?.securityDeposit ?? (listing.securityDeposit || 0);
  const rentTotal = preview?.rentTotal ?? pricePerMonth * Number(durationMonths);
  const platformFee = preview?.platformFee ?? rentTotal * 0.05;
  const grandTotal = preview?.totalAmount ?? rentTotal + securityDeposit + platformFee;

  const handleBookNow = async () => {
    setSubmitError(null);
    if (!isLoggedIn) {
      navigate("/SignIn-Up");
      return;
    }

    if (previewError) {
      setSubmitError(previewError);
      return;
    }

    const bookingPayload = {
      listingId: listing._id,
      startDate,
      endDate,
      durationMonths: Number(durationMonths),
    };

    try {
      const action = await dispatch(createBooking(bookingPayload));
      if (createBooking.fulfilled.match(action)) {
        const created = action.payload.booking;
        navigate(`/checkout/${created._id || created.id}`);
      } else {
        setSubmitError(action.payload || "Failed to create booking request.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to create booking request.");
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
              min={todayStr}
              value={startDate}
              onChange={(e) => {
                setSubmitError(null);
                setStartDate(e.target.value);
              }}
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
            onChange={(e) => {
              setSubmitError(null);
              setDurationMonths(Number(e.target.value));
            }}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2B7FFF] cursor-pointer"
          >
            {durationOptions.map((m) => (
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

      {/* Availability / Validation Alert */}
      {(previewError || submitError || createError) && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-500" />
          <span>{submitError || previewError || createError}</span>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-2.5 pt-2 border-t border-gray-100 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>
            Rent (₹{pricePerMonth} × {durationMonths} mo)
          </span>
          <span className="font-semibold text-gray-900">
            {previewLoading ? "..." : `₹${rentTotal}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            Security Deposit
            <Info
              size={13}
              className="text-gray-400"
              title="100% refundable upon move out"
            />
          </span>
          <span className="font-semibold text-gray-900">
            {previewLoading ? "..." : `₹${securityDeposit}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Platform Service Fee (5%)</span>
          <span className="font-semibold text-gray-900">
            {previewLoading ? "..." : `₹${platformFee}`}
          </span>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
          <span>Total Payable</span>
          <span className="text-[#2B7FFF]">
            {previewLoading ? "..." : `₹${grandTotal}`}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleBookNow}
        disabled={createLoading || previewLoading || Boolean(previewError)}
        className="w-full py-3.5 bg-[#2B7FFF] hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer text-center text-sm flex items-center justify-center gap-2"
      >
        {createLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating Booking...
          </>
        ) : previewLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Checking Availability...
          </>
        ) : (
          "Book Now"
        )}
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
