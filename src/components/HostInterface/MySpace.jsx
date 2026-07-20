import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Building2,
  CheckCircle2,
  User,
  Star,
  TrendingUp,
  Eye,
  Pencil,
  Trash2,
  X,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  FileText,
  Check,
  Info
} from "lucide-react";

// Custom utility style to hide scrollbar in scrollable sections
const scrollbarHiddenStyle = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Animated Counter component matching Dashboard design


const MySpace = ({ActivePage,setActivePage}) => {
  const initialMockSpaces = [
    {
      id: null,
      title: "",
      category: "",
      status: "AVAILABLE",
      address: "",
      price: null,
      image:
        "",
      area: "",
      access: "",
      duration: "",
    }
  ];

  const [spaces, setSpaces] = useState(initialMockSpaces);
  useEffect(() => {
    if (spaces.availableImmediately == true) {

    } else {
      spaces.status = ""
    }

  }, [])

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    async function fetchSpaces() {
      try {
        const response = await fetch("http://localhost:3000/api/my-spaces", {
          method: "POST",
          credentials: "include"
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setSpaces(data.listings || []);
          }
        }
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    }
    fetchSpaces();
  }, []);

  return (
    <>
      <div className=" grid grid-cols-5 grid-rows-8 gap-4 h-dvh overflow-y-scroll">
        {/* navbar */}
        <div className="col-span-5 ">
          <div className="bg-white border-b border-slate-200 px-8 py-6">
            <div className="flex items-center justify-between">

              {/* Left */}
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">
                  My Spaces
                </h1>
                <p className="mt-1 text-sm text-slate-500 font-medium">
                  Manage your storage listings.
                </p>
              </div>
              {/* Right */}
              <div className="flex items-center gap-4">

                {/* Search */}
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    placeholder="Search listings, locations..."
                    className="w-72 rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Filter */}
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">

                  <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
                    All
                  </button>

                  <button className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white">
                    Available
                  </button>

                  <button className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-white">
                    Occupied
                  </button>

                </div>

                {/* Button */}
                <button
                  onClick={() => setActivePage("ListSpace") }
                  className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600">
                  <Plus size={18} strokeWidth={2.5} />
                  Add New Space
                </button>

              </div>

            </div>
          </div>
        </div>
        {/* info cards */}
        <div className="col-span-5 row-span-2 row-start-2  p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ">
            {/* Total Spaces */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  TOTAL SPACES
                </span>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                {spaces.length}
              </h2>

              <p className="mt-2 text-xs font-semibold text-slate-400">
                Listed listings capacity
              </p>
            </div>

            {/* Available */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  AVAILABLE
                </span>

                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
              </div>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                7
              </h2>

              <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-500">
                <TrendingUp className="w-3.5 h-3.5" />
                Ready to rent immediately
              </p>
            </div>

            {/* Occupied */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  OCCUPIED
                </span>

                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-violet-500" />
                </div>
              </div>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                1
              </h2>

              <p className="mt-2 text-xs font-semibold text-violet-500">
                Active subscription leases
              </p>
            </div>

            {/* Average Rating */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  AVERAGE RATING
                </span>

                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
              </div>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                4.8
              </h2>

              <p className="mt-2 text-xs font-semibold text-amber-500">
                Based on recent host ratings
              </p>
            </div>

          </div>
        </div>
        {/* space cards */}

        <div className="col-span-5 row-span-5 row-start-4 p-4">
          <span className='text-3xl p-2 font-bold'>Listed Spaces</span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {spaces.map((space) => {
              const coverImage = space.images && space.images.length > 0
                ? space.images[0].url
                : space.image;
              const addressText = (space.street && space.city)
                ? `${space.street}, ${space.city}`
                : space.address;
              const areaText = (space.area && space.unit)
                ? `${space.area} ${space.unit}`
                : space.area;
              const accessHours = space.accessHours || space.access;
              const durationText = (space.minDuration && space.maxDuration)
                ? `${space.minDuration}-${space.maxDuration}`
                : space.duration;
              return (

                <div
                  key={space.id || space._id}
                  className="mt-4 w-80 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative h-40">
                    <img
                      src={coverImage}
                      alt={space.title}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${space.availableImmediately == true
                          ? "bg-emerald-500"
                          : "bg-red-500"
                          }`}
                      >
                        {space.status}
                      </span>

                      <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-slate-800">
                        {space.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 ">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-lg font-bold">{space.title}</h2>

                        <p className="text-sm text-slate-500 mt-1">
                          📍 {addressText}
                        </p>
                      </div>

                      <div className="text-right">
                        <h2 className="text-lg font-bold text-blue-600">
                          ₹{space.price}
                        </h2>
                        <span className="text-xs text-slate-400">/ month</span>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="rounded-2xl bg-slate-50 p-1 text-center">
                        <p className="text-[11px] uppercase text-slate-400">Area</p>
                        <p className="text-sm">{areaText}</p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-1 text-center">
                        <p className="text-[11px] uppercase text-slate-400">Access</p>
                        <p className=" text-sm">{accessHours}</p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-1 text-center">
                        <p className="text-[11px] uppercase text-slate-400">
                          Duration
                        </p>
                        <p className=" text-sm">{durationText}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 pt-3 border-t border-slate-200 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedSpace(space);
                          setActiveImageIndex(0);
                        }}
                        className="flex-1 rounded-xl bg-slate-900 py-2 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>

                      <button className="flex-1 rounded-xl border border-slate-200 py-2 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600">
                        <Pencil className="w-4 h-4" />
                        Edit
                      </button>

                      <button className="w-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Styled Utility Scrollbar CSS Injection */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarHiddenStyle }} />

      {/* Premium View Space Details Modal */}
      {selectedSpace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-8">

            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wide">
                  {selectedSpace.category}
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedSpace.title}</h2>
              </div>
              <button
                onClick={() => setSelectedSpace(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto no-scrollbar flex-1 space-y-6">

              {/* Gallery / Images Section */}
              <div>
                {/* Main Large Image */}
                <div className="relative h-96 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={
                      selectedSpace.images && selectedSpace.images.length > 0
                        ? selectedSpace.images[activeImageIndex]?.url
                        : selectedSpace.image
                    }
                    alt={selectedSpace.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {/* Thumbnails */}
                {selectedSpace.images && selectedSpace.images.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto py-1">
                    {selectedSpace.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${activeImageIndex === idx ? "border-blue-500 scale-95" : "border-transparent opacity-75 hover:opacity-100"
                          }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2-Column Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Column: Basic Details, Location, Rules */}
                <div className="space-y-6">

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-blue-500" /> Description
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-wrap">
                      {selectedSpace.description || "No description provided."}
                    </p>
                  </div>

                  {/* Full Location */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-blue-500" /> Full Location
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-600 space-y-2">
                      <p><span className="font-semibold text-slate-700">Street:</span> {selectedSpace.street || selectedSpace.address || "N/A"}</p>
                      <p><span className="font-semibold text-slate-700">City:</span> {selectedSpace.city || "N/A"}</p>
                      <p><span className="font-semibold text-slate-700">State:</span> {selectedSpace.state || "N/A"}</p>
                      <p><span className="font-semibold text-slate-700">Pincode:</span> {selectedSpace.pincode || "N/A"}</p>
                    </div>
                  </div>

                  {/* Space Rules */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Info className="w-5 h-5 text-blue-500" /> Space Rules & Policies
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-600 space-y-3">
                      <div>
                        <p className="font-semibold text-slate-700 mb-1">Cancellation Policy:</p>
                        <span className="inline-block rounded-lg bg-orange-50 text-orange-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                          {selectedSpace.cancellationPolicy || "moderate"}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-700 mb-1">House Rules:</p>
                        <p className="whitespace-pre-wrap">{selectedSpace.rules || "No specific rules listed."}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Pricing, Space, Booking, Amenities */}
                <div className="space-y-6">

                  {/* Pricing & Duration */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-blue-500" /> Rental & Pricing Details
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Price</p>
                        <p className="text-lg font-extrabold text-blue-600 mt-1">₹{selectedSpace.price}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Security Deposit</p>
                        <p className="text-lg font-extrabold text-slate-700 mt-1">₹{selectedSpace.securityDeposit || 0}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Late Fee Rate</p>
                        <p className="text-lg font-extrabold text-slate-700 mt-1">₹{selectedSpace.lateFee || 0}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Rental Period</p>
                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          {selectedSpace.minDuration && selectedSpace.maxDuration
                            ? `${selectedSpace.minDuration} to ${selectedSpace.maxDuration}`
                            : selectedSpace.duration || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Space Specifications */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-blue-500" /> Space Specifications
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Area</p>
                        <p className="text-sm font-bold text-slate-700 mt-1">{selectedSpace.area}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Unit</p>
                        <p className="text-sm font-bold text-slate-700 mt-1">{selectedSpace.unit || "sq ft"}</p>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Access Hours</p>
                        <p className="text-xs font-bold text-slate-700 mt-1">{selectedSpace.accessHours || selectedSpace.access}</p>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-blue-500" /> Availability
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-600 space-y-2">
                      <p>
                        <span className="font-semibold text-slate-700">Available Immediately:</span>{" "}
                        {selectedSpace.availableImmediately === true || selectedSpace.availableImmediately === "true" ? (
                          <span className="text-emerald-600 font-bold">Yes</span>
                        ) : (
                          <span className="text-amber-600 font-bold">No</span>
                        )}
                      </p>
                      {!(selectedSpace.availableImmediately === true || selectedSpace.availableImmediately === "true") && (
                        <>
                          <p>
                            <span className="font-semibold text-slate-700">Available From:</span>{" "}
                            {selectedSpace.availableFrom ? new Date(selectedSpace.availableFrom).toLocaleDateString('en-IN') : "N/A"}
                          </p>
                          <p>
                            <span className="font-semibold text-slate-700">Available Until:</span>{" "}
                            {selectedSpace.availableUntil ? new Date(selectedSpace.availableUntil).toLocaleDateString('en-IN') : "N/A"}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Booking Preferences */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Check className="w-5 h-5 text-blue-500" /> Booking Preferences
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-600">
                      {(() => {
                        let prefs = {};
                        if (selectedSpace.bookingPrefs) {
                          if (typeof selectedSpace.bookingPrefs === 'string') {
                            try { prefs = JSON.parse(selectedSpace.bookingPrefs); } catch (e) { }
                          } else {
                            prefs = selectedSpace.bookingPrefs;
                          }
                        }
                        const prefLabels = {
                          instantBooking: "Instant Booking Enabled",
                          manualApproval: "Requires Manual Approval",
                          weekendBookings: "Weekend Bookings Allowed",
                          longTermOnly: "Long Term Only",
                          recurringRentals: "Recurring Rentals Allowed",
                          autoRenewal: "Auto-Renewal Eligible"
                        };
                        const activePrefs = Object.entries(prefLabels).filter(([key]) => prefs && prefs[key] === true);
                        if (activePrefs.length === 0) {
                          return <p className="text-slate-400 italic">No specific preferences set</p>;
                        }
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activePrefs.map(([key, label]) => (
                              <div key={key} className="flex items-center gap-2 text-slate-700">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>{label}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                      <Check className="w-5 h-5 text-blue-500" /> Amenities
                    </h3>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-600">
                      {(() => {
                        let amenitiesObj = {};
                        if (selectedSpace.amenities) {
                          if (typeof selectedSpace.amenities === 'string') {
                            try { amenitiesObj = JSON.parse(selectedSpace.amenities); } catch (e) { }
                          } else {
                            amenitiesObj = selectedSpace.amenities;
                          }
                        }
                        const amenityLabels = {
                          climateControlled: "Climate Controlled",
                          cctvSurveillance: "CCTV Surveillance",
                          lockAvailable: "Lock Available",
                          lighting: "Lighting",
                          electricity: "Electricity",
                          fireSafety: "Fire Safety",
                          insurance: "Insurance Covered",
                          loadingAssistance: "Loading Assistance"
                        };
                        const activeAmenities = Object.entries(amenityLabels).filter(([key]) => amenitiesObj && amenitiesObj[key] === true);
                        if (activeAmenities.length === 0) {
                          return <p className="text-slate-400 italic">No amenities specified</p>;
                        }
                        return (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {activeAmenities.map(([key, label]) => (
                              <div key={key} className="flex items-center gap-2 text-slate-700">
                                <Check className="w-4 h-4 text-blue-500 shrink-0" />
                                <span>{label}</span>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MySpace;
