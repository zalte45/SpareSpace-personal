import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#F5EEE3] flex items-center justify-center">

      {/* Background 404 */}
      <div className="absolute inset-0 flex items-center justify-center opacity-100">

        <svg
          viewBox="0 0 1200 600"
          className="w-[90%] h-auto"
        >
          <defs>
            <pattern
              id="dots"
              width="18"
              height="18"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="4" cy="4" r="3.2" fill="#275BFF" />
            </pattern>
          </defs>

          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="420"
            fontWeight="700"
            fill="url(#dots)"
            fontFamily="Poppins, sans-serif"
          >
            404
          </text>
        </svg>

      </div>

      {/* Content */}
      <div className="absolute left-20 bottom-20 max-w-sm">

        <h2 className="text-5xl font-bold text-[#1E2B4A] mb-6">
          404
        </h2>

        <p className="text-xl leading-tight font-medium text-[#24334F]">
          We couldn't find
          <br />
          the page you were
          <br />
          looking for.
        </p>

        <Link
          to="/"
          className="text-sm inline-block mt-10 rounded-full bg-[#275BFF] px-6 py-2 text-white font-semibold hover:scale-105 transition"
        >
          Back Home
        </Link>

      </div>

      {/* Right Side Text */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 rotate-90 text-white/60 tracking-[0.5rem] uppercase font-semibold">
        404
      </div>

    </div>
  );
}