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
  Trash2
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


const MySpace = () => {


  // useEffect(() => {
  //   async function fetchSpaces() {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/my-spaces", {
  //         method: "POST",
  //         credentials: "include"
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data.success) {
  //           setSpaces(data.listings || []);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching spaces:", error);
  //     }
  //   }
  //   fetchSpaces();
  // }, []);
  const spaces = [
    {
      id: 1,
      title: "Secure Basement",
      category: "BASEMENT",
      status: "AVAILABLE",
      address: "MG Road, Pune",
      price: 2800,
      image:
        "https://res.cloudinary.com/kanfjcj7/image/upload/v1784286400/SpareSpace/knh3mcuowmblhfrauj5z.png",
      area: "180 sq ft",
      access: "24 Hours",
      duration: "1-12 Months",
    },
    {
      id: 2,
      title: "Private Garage",
      category: "GARAGE",
      status: "AVAILABLE",
      address: "Baner, Pune",
      price: 3500,
      image:
        "https://res.cloudinary.com/kanfjcj7/image/upload/v1784286399/SpareSpace/hpb7pe1inqopxkcfzem0.png",
      area: "220 sq ft",
      access: "24 Hours",
      duration: "3-12 Months",
    },
    {
      id: 3,
      title: "Warehouse Storage",
      category: "WAREHOUSE",
      status: "OCCUPIED",
      address: "Hinjewadi, Pune",
      price: 6500,
      image:
        "https://res.cloudinary.com/kanfjcj7/image/upload/v1784286401/SpareSpace/e90mrfcskxlxmeqdtb4e.png",
      area: "500 sq ft",
      access: "8 AM - 8 PM",
      duration: "6-24 Months",
    },
    {
      id: 3,
      title: "Warehouse Storage",
      category: "WAREHOUSE",
      status: "OCCUPIED",
      address: "Hinjewadi, Pune",
      price: 6500,
      image:
        "https://res.cloudinary.com/kanfjcj7/image/upload/v1784286401/SpareSpace/e90mrfcskxlxmeqdtb4e.png",
      area: "500 sq ft",
      access: "8 AM - 8 PM",
      duration: "6-24 Months",
    },
    {
      id: 3,
      title: "Warehouse Storage",
      category: "WAREHOUSE",
      status: "OCCUPIED",
      address: "Hinjewadi, Pune",
      price: 6500,
      image:
        "https://res.cloudinary.com/kanfjcj7/image/upload/v1784286401/SpareSpace/e90mrfcskxlxmeqdtb4e.png",
      area: "500 sq ft",
      access: "8 AM - 8 PM",
      duration: "6-24 Months",
    },
  ];








  return (
    <>
      <div className=" grid grid-cols-5 grid-rows-8 gap-4 h-dvh">
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
                <button className="flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600">
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
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  TOTAL SPACES
                </span>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              <h2 className="mt-2 text-3xl font-black text-slate-900">
                8
              </h2>

              <p className="mt-2 text-xs font-semibold text-slate-400">
                Listed listings capacity
              </p>
            </div>

            {/* Available */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
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
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
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
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
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
        <div className="col-span-5 row-span-5 row-start-4 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaces.map((space) => (
              <div
                key={space.id}
                className="w-80 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${space.status === "AVAILABLE"
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
                <div className="p-5">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{space.title}</h2>

                      <p className="text-sm text-slate-500 mt-1">
                        📍 {space.address}
                      </p>
                    </div>

                    <div className="text-right">
                      <h2 className="text-2xl font-bold text-blue-600">
                        ₹{space.price}
                      </h2>

                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-[11px] uppercase text-slate-400">Area</p>
                      <p className="font-semibold mt-1">{space.area}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-[11px] uppercase text-slate-400">Access</p>
                      <p className="font-semibold mt-1">{space.access}</p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-[11px] uppercase text-slate-400">
                        Duration
                      </p>
                      <p className="font-semibold mt-1">{space.duration}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-5 border-t border-slate-200 flex gap-2">
                    <button className="flex-1 rounded-xl bg-slate-900 py-3 text-white font-semibold flex items-center justify-center gap-2 hover:bg-slate-800">
                      <Eye className="w-4 h-4" />
                      View
                    </button>

                    <button className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600">
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>

                    <button className="w-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default MySpace;
