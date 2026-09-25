import React, { useState } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({ images = [], title }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const displayImages =
    images.length > 0
      ? images
      : [{ url: "/garage.jpg" }, { url: "/storage_space_preview.png" }];

  const currentImage = displayImages[selectedIndex]?.url || "/garage.jpg";

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Image View */}
      <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden bg-gray-100 group shadow-xs">
        <img
          src={currentImage}
          alt={title || "Storage Space"}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Expand / Lightbox Button */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-800 shadow-md transition-all cursor-pointer"
          title="Open Lightbox"
        >
          <Maximize2 size={18} />
        </button>

        {/* Arrows for multi-image */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          {displayImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative h-20 w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIndex === index
                  ? "border-[#2B7FFF] ring-2 ring-blue-100 scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all cursor-pointer"
          >
            <X size={24} />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center">
            <img
              src={currentImage}
              alt="Fullscreen Space"
              className="max-h-[80vh] w-auto object-contain rounded-2xl"
            />

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
