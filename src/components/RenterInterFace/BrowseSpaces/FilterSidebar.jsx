import React from "react";
import { SlidersHorizontal, RotateCcw, Check, X } from "lucide-react";

const STORAGE_TYPES = [
  "Garage",
  "Spare Room",
  "Basement",
  "Shed",
  "Attic",
  "Parking",
  "Warehouse",
];

const AMENITIES_LIST = [
  { id: "climateControlled", label: "Climate Control" },
  { id: "cctvSurveillance", label: "CCTV Surveillance" },
  { id: "lockAvailable", label: "Lockable Space" },
  { id: "lighting", label: "Good Lighting" },
  { id: "electricity", label: "Electricity Access" },
  { id: "fireSafety", label: "Fire Safety" },
];

const FilterSidebar = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
  onClose,
}) => {
  const handleCategoryToggle = (category) => {
    const newCategory = filters.category === category ? "" : category;
    onFilterChange({ category: newCategory });
  };

  const handleAmenityToggle = (amenityId) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenityId)
      ? current.filter((id) => id !== amenityId)
      : [...current, amenityId];
    onFilterChange({ amenities: updated });
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-xs flex flex-col gap-6 ${
        isOpen
          ? "fixed inset-y-0 left-0 z-50 w-80 shadow-2xl p-6 overflow-y-auto"
          : "hidden lg:flex w-72 shrink-0"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-[#2B7FFF]" />
          <h2 className="font-bold text-gray-900 text-base">Filters</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#2B7FFF] transition-colors cursor-pointer"
            title="Reset Filters"
          >
            <RotateCcw size={13} />
            Reset
          </button>
          {isOpen && (
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Storage Type */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Storage Type</h3>
        <div className="flex flex-wrap gap-2">
          {STORAGE_TYPES.map((type) => {
            const selected = filters.category === type;
            return (
              <button
                key={type}
                onClick={() => handleCategoryToggle(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  selected
                    ? "bg-[#2B7FFF] text-white border-[#2B7FFF] shadow-xs"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">
          Monthly Price (₹)
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-gray-400 block mb-1">Min Price</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ""}
              onChange={(e) => onFilterChange({ minPrice: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2B7FFF]"
            />
          </div>
          <div>
            <label className="text-xs text-gray-400 block mb-1">Max Price</label>
            <input
              type="number"
              placeholder="10000"
              value={filters.maxPrice || ""}
              onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2B7FFF]"
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Amenities</h3>
        <div className="space-y-2">
          {AMENITIES_LIST.map((amenity) => {
            const checked = (filters.amenities || []).includes(amenity.id);
            return (
              <label
                key={amenity.id}
                onClick={() => handleAmenityToggle(amenity.id)}
                className="flex items-center gap-2.5 text-xs text-gray-700 cursor-pointer hover:text-gray-900 select-none"
              >
                <div
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-[#2B7FFF] border-[#2B7FFF] text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {checked && <Check size={11} />}
                </div>
                <span>{amenity.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
