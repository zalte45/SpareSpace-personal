import React from "react";
import { Star, MessageSquare } from "lucide-react";

const Reviews = () => {
  const dummyUserReviews = [
    {
      id: "r1",
      listingTitle: "Spacious Garage in Bandra",
      date: "August 2025",
      rating: 5,
      comment: "Host was extremely accommodating. Space was dry, clean, and very secure.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
        <p className="text-xs text-gray-500 mt-1">
          Reviews you have submitted for storage spaces you rented
        </p>
      </div>

      <div className="space-y-4">
        {dummyUserReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900">{rev.listingTitle}</h3>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < rev.rating ? "fill-amber-400" : "text-gray-200"}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
            <span className="text-[10px] text-gray-400 block text-right">{rev.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
