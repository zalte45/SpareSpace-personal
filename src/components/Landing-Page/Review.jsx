import React from "react";

const reviews = [
  {
    review:
      '"I found a clean garage two blocks away for half the price of a storage unit. Booking took five minutes."',
    name: "Sophie Lane",
    location: "Portland, OR",
    image: "",
  },
  {
    review:
      '"My empty basement now earns me $200 a month. The whole process is effortless and totally secure."',
    name: "Marcus Reed",
    location: "Austin, TX",
    image: "",
  },
  {
    review:
      '"SpareSpace made downsizing stress-free. A friendly neighbor stored my furniture for months at a great rate."',
    name: "Elena Cruz",
    location: "Denver, CO",
    image: "",
  },
];

const Review = () => {
  return (
    <div className="w-full flex flex-col items-center py-20">
      <span className="text-[#2B7FFF] font-semibold text-sm">
        Testimonials
      </span>

      <h1 className="text-4xl font-bold mt-3">
        Loved by renters and hosts
      </h1>

      <div className="flex gap-6 mt-14">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="h-[35vh] w-[25vw] shadow-xl rounded-xl p-6 flex flex-col justify-evenly hover:scale-105 transition-transform"
          >
            {/* Stars */}
            <div className="text-yellow-400 text-lg tracking-wide">
              ★★★★★
            </div>

            {/* Review */}
            <p className="text-[#27272A] text-base leading-7">
              {item.review}
            </p>

            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt=""
                className="w-12 h-12 rounded-full bg-gray-300"
              />

              <div className="flex flex-col">
                <span className="font-semibold text-base">
                  {item.name}
                </span>
                <span className="text-[#71717B] text-sm">
                  {item.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;