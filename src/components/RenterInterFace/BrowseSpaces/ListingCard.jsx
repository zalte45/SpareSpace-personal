import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../../redux/features/Favorite/favoriteSlice";
import { Heart, MapPin, Maximize2, Star, ShieldCheck, User } from "lucide-react";

const ListingCard = ({ listing }) => {
  const dispatch = useDispatch();
  const favoriteIds = useSelector((state) => state.favorite?.favoriteIds || []);
  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);

  const isFav = favoriteIds.includes(listing._id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("Please sign in to save spaces to your favorites.");
      return;
    }
    dispatch(toggleFavorite(listing._id));
  };

  const mainImage =
    listing.images && listing.images.length > 0
      ? listing.images[0].url
      : "/garage.jpg";

  const storageType = listing.category || "Storage Space";
  const title = listing.title || "Untitled Space";
  const city = listing.city || "Unknown City";
  const pincode = listing.pincode || "";
  const price = listing.price || 0;
  const area = listing.area || "N/A";
  const unit = listing.unit || "sq ft";
  const rating = listing.rating || 4.8;
  const reviewsCount = listing.reviewsCount || 12;

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 hover:text-red-500 shadow-md transition-all cursor-pointer"
          title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            className={isFav ? "fill-red-500 text-red-500" : "transition-colors"}
          />
        </button>

        {/* Storage Type Badge */}
        <div className="absolute top-3 left-3 bg-[#2B7FFF]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {storageType}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star size={14} className="fill-amber-400" />
              <span>{rating}</span>
              <span className="text-gray-400 font-normal">
                ({reviewsCount})
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Maximize2 size={13} />
              <span>
                {area} {unit}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-[#2B7FFF] transition-colors mb-1">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <MapPin size={13} className="text-gray-400 shrink-0" />
            <span className="truncate">
              {city} {pincode ? `(${pincode})` : ""}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
          <div>
            <span className="text-xs text-gray-400 font-medium block">Monthly Rent</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-bold text-gray-900">₹{price}</span>
              <span className="text-xs text-gray-500">/mo</span>
            </div>
          </div>

          <Link
            to={`/spaces/${listing._id}`}
            className="px-4 py-2 bg-[#E9F2FF] hover:bg-[#2B7FFF] text-[#2B7FFF] hover:text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
          >
            View Space
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
