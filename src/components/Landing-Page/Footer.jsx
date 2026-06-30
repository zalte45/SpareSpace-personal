import React from "react";

const footerLinks = [
  {
    title: "About",
    links: ["Our Story", "Careers", "Press"],
  },
  {
    title: "Contact",
    links: ["Support", "Help Center", "Partnerships"],
  },
  {
    title: "Privacy Policy",
    links: ["Cookies", "Data Use", "Security"],
  },
  {
    title: "Terms",
    links: ["Service Terms", "Host Agreement", "Guidelines"],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#223D66] text-white px-12 py-10">
      {/* Top */}
      <div className="flex justify-between">
        {/* Logo */}
        <div className="w-[18%]">
          <div className="flex items-center gap-3">
            <img src="/box-stroke-rounded.svg" alt="" className='w-10 rounded-xl px-2 py-2   bg-[#2B7FFF]'  />

            <h1 className="text-2xl font-bold">SpareSpace</h1>
          </div>

          <p className="text-[#9CA3AF] text-sm mt-5 leading-7">
            The neighborhood marketplace for sharing storage space.
          </p>

          <div className="flex gap-3 mt-6">
            <div className="w-9 h-9 rounded-full bg-[#3A5277]"></div>
            <div className="w-9 h-9 rounded-full bg-[#3A5277]"></div>
            <div className="w-9 h-9 rounded-full bg-[#3A5277]"></div>
            <div className="w-9 h-9 rounded-full bg-[#3A5277]"></div>
          </div>
        </div>

        {/* Links */}
        {footerLinks.map((section, index) => (
          <div key={index} className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">{section.title}</h2>

            {section.links.map((link, i) => (
              <span
                key={i}
                className="text-[#9CA3AF] text-sm hover:text-white cursor-pointer"
              >
                {link}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-[#39567F] mt-10 pt-6 flex justify-between text-[#9CA3AF] text-sm">
        <span>© 2025 SpareSpace, Inc. All rights reserved.</span>

        <span>Made for neighbors, by neighbors.</span>
      </div>
    </footer>
  );
};

export default Footer;