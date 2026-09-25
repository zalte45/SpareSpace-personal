import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites } from "../../../redux/features/Favorite/favoriteSlice";
import ListingCard from "../BrowseSpaces/ListingCard";
import { Heart, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Saved Spaces</h1>
          <p className="text-xs text-gray-500 mt-1">
            Storage spaces you've bookmarked for easy reference
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold bg-red-50 px-3 py-1.5 rounded-full">
          <Heart size={14} className="fill-red-500" />
          <span>{favorites.length} Saved</span>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#2B7FFF]" />
        </div>
      )}

      {/* Empty State */}
      {!loading && favorites.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center max-w-md mx-auto space-y-4 shadow-xs my-8">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
            <Heart size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">No favorite spaces yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              Explore available storage spaces and click the heart icon to save your favorites here.
            </p>
          </div>
          <Link
            to="/spaces"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2B7FFF] text-white font-semibold text-xs rounded-xl hover:bg-blue-600 transition-colors shadow-xs"
          >
            <Search size={16} />
            Browse Spaces
          </Link>
        </div>
      )}

      {/* Grid */}
      {!loading && favorites.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((fav) => {
            const listingData = fav.listing || fav;
            return <ListingCard key={fav._id || listingData._id} listing={listingData} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
