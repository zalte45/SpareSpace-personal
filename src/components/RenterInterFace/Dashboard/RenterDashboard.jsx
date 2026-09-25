import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMyBookings } from "../../../redux/features/Booking/bookingSlice";
import { fetchFavorites } from "../../../redux/features/Favorite/favoriteSlice";
import {
  Building2,
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
} from "lucide-react";

const RenterDashboard = () => {
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.loginInfo);
  const { bookings } = useSelector((state) => state.booking);
  const { favorites } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(fetchMyBookings());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const activeRentals = bookings.filter(
    (b) => (b.bookingStatus || "").toLowerCase() === "active"
  );
  const upcomingBookings = bookings.filter(
    (b) =>
      (b.bookingStatus || "").toLowerCase() === "confirmed" ||
      (b.bookingStatus || "").toLowerCase() === "pending"
  );
  const completedRentals = bookings.filter(
    (b) => (b.bookingStatus || "").toLowerCase() === "completed"
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-[#2B7FFF] via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold bg-white/20 px-3 py-1 rounded-full text-white inline-block mb-2 backdrop-blur-md">
            Renter Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {loginInfo.username || "Renter"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Manage your storage bookings, saved spaces, and active rentals
          </p>
        </div>

        <Link
          to="/spaces"
          className="px-5 py-3 bg-white text-[#2B7FFF] hover:bg-blue-50 font-bold text-xs rounded-2xl transition-all shadow-md shrink-0 flex items-center gap-2"
        >
          <Search size={16} />
          Explore Spaces
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-[#2B7FFF] rounded-2xl">
            <Calendar size={22} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">
              Upcoming Bookings
            </span>
            <span className="text-xl font-extrabold text-gray-900">
              {upcomingBookings.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Building2 size={22} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">
              Active Rentals
            </span>
            <span className="text-xl font-extrabold text-gray-900">
              {activeRentals.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
            <Heart size={22} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">
              Saved Favorites
            </span>
            <span className="text-xl font-extrabold text-gray-900">
              {favorites.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">
              Completed Rentals
            </span>
            <span className="text-xl font-extrabold text-gray-900">
              {completedRentals.length}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts & Host Switch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next / Upcoming Booking */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900">Upcoming Rental</h3>
            <Link
              to="/bookings"
              className="text-xs font-semibold text-[#2B7FFF] flex items-center gap-1 hover:underline"
            >
              View all bookings <ArrowRight size={13} />
            </Link>
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs text-gray-400 block font-mono">
                  #{upcomingBookings[0]._id}
                </span>
                <h4 className="font-bold text-sm text-gray-900">
                  {upcomingBookings[0].listing?.title || "Storage Rental"}
                </h4>
                <p className="text-xs text-gray-500">
                  {upcomingBookings[0].startDate} → {upcomingBookings[0].endDate}
                </p>
              </div>

              <Link
                to={`/bookings/${upcomingBookings[0]._id}`}
                className="px-4 py-2 bg-[#2B7FFF] text-white rounded-xl text-xs font-semibold hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          ) : (
            <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-xs text-gray-500">No upcoming bookings right now.</p>
            </div>
          )}
        </div>

        {/* Host Side Switch Banner */}
        <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white p-6 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-white/10 px-2.5 py-1 rounded-full text-blue-200">
              Host Opportunity
            </span>
            <h3 className="font-extrabold text-lg text-white mt-2">
              Have unused storage space?
            </h3>
            <p className="text-xs text-gray-300 mt-1 leading-relaxed">
              Earn passive income by listing your unused garage, spare room, or parking spot on SpareSpace.
            </p>
          </div>

          <Link
            to="/DashBoard"
            className="w-full py-3 bg-[#2B7FFF] hover:bg-blue-600 text-white font-bold rounded-2xl text-xs text-center transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            Switch to Host Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboard;
