import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchListingById, clearSelectedListing } from "../../../redux/features/Listing/listingSlice";
import ImageGallery from "./ImageGallery";
import BookingCard from "./BookingCard";
import ReviewSection from "./ReviewSection";
import ReportModal from "./ReportModal";
import {
  MapPin,
  Shield,
  Clock,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Star,
  Flag,
  ChevronLeft,
  Loader2,
  Info,
  Calendar,
  Lock,
} from "lucide-react";

const SpaceDetails = () => {
  const { listingId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedListing, selectedLoading, selectedError } = useSelector(
    (state) => state.listing
  );
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);

  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    if (listingId) {
      dispatch(fetchListingById(listingId));
    }
    return () => {
      dispatch(clearSelectedListing());
    };
  }, [dispatch, listingId]);

  if (selectedLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 size={36} className="animate-spin text-[#2B7FFF]" />
        <p className="text-sm font-semibold text-gray-500">Loading space details...</p>
      </div>
    );
  }

  if (selectedError || !selectedListing) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-lg mx-auto my-12 space-y-4 shadow-xs">
        <AlertCircle size={48} className="mx-auto text-red-500" />
        <h2 className="text-xl font-bold text-gray-900">Space Not Found</h2>
        <p className="text-sm text-gray-500">
          {selectedError || "The space you are looking for does not exist or has been removed."}
        </p>
        <Link
          to="/spaces"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2B7FFF] text-white font-semibold text-xs rounded-xl hover:bg-blue-600 transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Browse Spaces
        </Link>
      </div>
    );
  }

  const listing = selectedListing;
  const owner = listing.owner || {};

  const handleMessageHost = () => {
    if (!isLoggedIn) {
      alert("Please sign in to message the host.");
      navigate("/SignIn-Up");
      return;
    }
    navigate(`/messages?hostId=${owner._id || owner}&listingId=${listing._id}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/spaces"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#2B7FFF] transition-colors"
        >
          <ChevronLeft size={16} />
          Back to all spaces
        </Link>

        <button
          onClick={() => setReportModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        >
          <Flag size={14} />
          Report Listing
        </button>
      </div>

      {/* Main Grid: Info + Sticky Booking Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Images */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <ImageGallery images={listing.images} title={listing.title} />

          {/* Basic Header Info */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2B7FFF] bg-[#E9F2FF] px-3 py-1 rounded-full">
                {listing.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                <Star size={16} className="fill-amber-400" />
                <span>4.8</span>
                <span className="text-gray-400 font-normal text-xs">(12 reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
              {listing.title}
            </h1>

            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin size={16} className="text-[#2B7FFF] shrink-0" />
              <span>
                {listing.street}, {listing.city}, {listing.state} - {listing.pincode}
              </span>
            </div>

            {/* Overview Key Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-400 block">Total Area</span>
                <span className="text-sm font-bold text-gray-900">
                  {listing.area} {listing.unit || "sq ft"}
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-400 block">Access Hours</span>
                <span className="text-sm font-bold text-gray-900 truncate block">
                  {listing.accessHours || "24/7 Access"}
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-400 block">Min Duration</span>
                <span className="text-sm font-bold text-gray-900">
                  {listing.minDuration || "1 Month"}
                </span>
              </div>

              <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <span className="text-xs text-gray-400 block">Cancellation</span>
                <span className="text-sm font-bold text-gray-900 capitalize">
                  {listing.cancellationPolicy || "Moderate"}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-3 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900">About this space</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900">Amenities & Security</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(listing.amenities || {}).map(([key, val]) => {
                if (!val) return null;
                const formatted = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase());
                return (
                  <div
                    key={key}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-blue-50/50 border border-blue-100 text-xs font-semibold text-gray-800"
                  >
                    <CheckCircle2 size={16} className="text-[#2B7FFF] shrink-0" />
                    <span>{formatted}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rules & Policies */}
          {listing.rules && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-3 shadow-xs">
              <h2 className="text-lg font-bold text-gray-900">Space Rules</h2>
              <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                {listing.rules}
              </p>
            </div>
          )}

          {/* Host Info Section */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-gray-900">Hosted by Neighbor</h2>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#2B7FFF] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                  {owner.username ? owner.username[0].toUpperCase() : "H"}
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900">
                    {owner.username || "Verified Host"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {owner.email ? `Contact: ${owner.email}` : "SpareSpace Verified Partner"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleMessageHost}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:border-[#2B7FFF] text-gray-800 hover:text-[#2B7FFF] rounded-2xl font-semibold text-xs transition-all cursor-pointer"
              >
                <MessageSquare size={16} />
                Message Host
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <ReviewSection rating={4.8} />
        </div>

        {/* Right Column: Sticky Booking Sidebar */}
        <div className="lg:col-span-1">
          <BookingCard listing={listing} />
        </div>
      </div>

      {/* Report Modal */}
      <ReportModal
        listingId={listing._id}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />
    </div>
  );
};

export default SpaceDetails;
