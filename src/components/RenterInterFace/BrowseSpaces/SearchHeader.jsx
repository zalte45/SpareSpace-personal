import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

const SearchHeader = ({
  filters,
  sort,
  onSearchChange,
  onSortChange,
  onOpenMobileFilters,
  totalResults,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search Input */}
      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search by city, area, or pincode..."
          value={filters.search || ""}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2B7FFF] focus:bg-white transition-all"
        />
      </div>

      {/* Sort & Mobile Filter Toggle */}
      <div className="flex items-center justify-between w-full md:w-auto gap-3">
        <span className="text-xs font-semibold text-gray-500 hidden sm:inline">
          {totalResults} space{totalResults !== 1 ? "s" : ""} available
        </span>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          {/* Sort Select */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3.5 pr-8 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:border-[#2B7FFF] cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ArrowUpDown
              size={13}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
