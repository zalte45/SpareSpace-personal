import React, { useLayoutEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

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
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useLayoutEffect(() => {
    // Create GSAP context for proper cleanup of ScrollTrigger animations
    const ctx = gsap.context(() => {
      // 1. Entrance animation for the testimonials header and cards (staggered fade-up)
      if (cardsContainerRef.current) {
        gsap.from(cardsContainerRef.current.children, {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      }

      // 2. Feature Cards GSAP hover animation
      const featureCards = gsap.utils.toArray('.feature-card');
      featureCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -8,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // shadow-xl
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)', // reset to shadow-md/lg
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-20">
      <span className="text-[#2B7FFF] font-semibold text-sm">
        Testimonials
      </span>

      <h1 className="text-4xl font-bold mt-3">
        Loved by renters and hosts
      </h1>

      <div ref={cardsContainerRef} className="flex gap-6 mt-14">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="feature-card h-[35vh] w-[25vw] shadow-xl rounded-xl p-6 flex flex-col justify-evenly cursor-default bg-white"
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