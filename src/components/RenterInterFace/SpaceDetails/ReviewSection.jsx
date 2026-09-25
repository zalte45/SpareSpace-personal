import React from "react";
import { Star, User, ThumbsUp } from "lucide-react";

const ReviewSection = ({ reviews = [], rating = 4.8 }) => {
  const dummyReviews = [
    {
      id: "1",
      user: "Amit Sharma",
      date: "August 2025",
      rating: 5,
      comment:
        "Extremely clean and secure garage! The host was super helpful with unloading. Would definitely rent again.",
    },
    {
      id: "2",
      user: "Priya Patel",
      date: "July 2025",
      rating: 4.5,
      comment:
        "Great space for household furniture during renovation. CCTV camera right at the entrance gave great peace of mind.",
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : dummyReviews;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Renter Reviews</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Verified feedback from renters who used this space
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3.5 py-1.5 rounded-full border border-amber-100">
          <Star size={16} className="fill-amber-400 text-amber-400" />
          <span className="font-bold text-sm">{rating}</span>
          <span className="text-xs text-amber-600">
            ({displayReviews.length} reviews)
          </span>
        </div>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {displayReviews.map((rev) => (
          <div
            key={rev.id || rev._id}
            className="border-b border-gray-100 last:border-0 pb-6 last:pb-0 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E9F2FF] text-[#2B7FFF] flex items-center justify-center font-bold text-sm">
                  {rev.user ? rev.user[0].toUpperCase() : "R"}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">
                    {rev.user || "Verified Renter"}
                  </h4>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(rev.rating)
                        ? "fill-amber-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
