import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchListings,
  setFilters,
  setSort,
  setPage,
  clearFilters,
} from "../../../redux/features/Listing/listingSlice";
import { fetchFavorites } from "../../../redux/features/Favorite/favoriteSlice";
import ListingCard from "./ListingCard";
import FilterSidebar from "./FilterSidebar";
import SearchHeader from "./SearchHeader";
import { Search, Frown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const BrowseSpaces = () => {
  const dispatch = useDispatch();
  const {
    listings,
    totalListings,
    totalPages,
    currentPage,
    loading,
    error,
    filters,
    sort,
  } = useSelector((state) => state.listing);

  const isLoggedIn = useSelector((state) => state.user?.isLoggedIn);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchListings({
        search: filters.search,
        city: filters.city,
        pincode: filters.pincode,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        amenities: filters.amenities ? filters.amenities.join(",") : "",
        sort,
        page: currentPage,
        limit: 9,
      })
    );
  }, [dispatch, filters, sort, currentPage]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isLoggedIn]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleSearchChange = (value) => {
    dispatch(setFilters({ search: value }));
  };

  const handleSortChange = (newSort) => {
    dispatch(setSort(newSort));
  };

  const handleReset = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Hero Header */}
      <div className="bg-linear-to-r from-[#2B7FFF] to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs uppercase tracking-wider font-semibold bg-white/20 px-3 py-1 rounded-full text-white inline-block mb-3 backdrop-blur-md">
            Storage Marketplace
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Find & Rent Nearby Storage Spaces
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100 font-medium">
            Browse verified garages, spare rooms, basements, and parking spots hosted by neighbors in your area.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Search size={280} />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleReset}
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
        />

        {/* Listings Section */}
        <div className="flex-1 min-w-0">
          <SearchHeader
            filters={filters}
            sort={sort}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onOpenMobileFilters={() => setMobileFilterOpen(true)}
            totalResults={totalListings}
          />

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-white rounded-2xl border border-gray-100 h-80 animate-pulse p-4 flex flex-col justify-between"
                >
                  <div className="bg-gray-200 h-44 rounded-xl w-full"></div>
                  <div className="space-y-2 mt-3">
                    <div className="bg-gray-200 h-4 rounded-md w-3/4"></div>
                    <div className="bg-gray-200 h-3 rounded-md w-1/2"></div>
                  </div>
                  <div className="bg-gray-200 h-8 rounded-xl w-full mt-4"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl text-center space-y-2">
              <Frown size={36} className="mx-auto text-red-500" />
              <p className="font-semibold">{error}</p>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-semibold hover:bg-red-700 transition-colors"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && listings.length === 0 && (
            <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-[#E9F2FF] text-[#2B7FFF] rounded-2xl flex items-center justify-center mx-auto">
                <Search size={32} />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-bold text-gray-900">
                  No storage spaces found
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  We couldn't find any listings matching your current search or filters. Try resetting filters or searching another city.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-[#2B7FFF] text-white rounded-xl text-xs font-semibold hover:bg-blue-600 transition-colors shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Grid of Listings */}
          {!loading && !error && listings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => dispatch(setPage(currentPage - 1))}
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>

              <span className="text-xs font-semibold text-gray-600 px-3">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => dispatch(setPage(currentPage + 1))}
                className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseSpaces;
