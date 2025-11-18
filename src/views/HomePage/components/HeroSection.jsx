import {
  FadeInWhenVisible,
  FadeInLeft,
} from "../../../components/ui/Animation/ScrollAnimation";

import bgImage from "../../../assets/bg14.png";

import React from "react";

function HeroSection() {
  return (
    <div className="relative w-full min-h-screen bg-background text-gray-800 pt-24 overflow-hidden">
      {/* Squiggly Diagonal Background */}
      <svg
        className="pointer-events-none absolute top-[-200px] right-[-250px] w-[900px] rotate-[25deg] opacity-70 z-0"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M72 122C102 42 214-30 334 6c120 36 192 140 286 172 94 32 162 22 198 80 36 58 6 128-56 184-62 56-160 70-248 58C410 492 334 474 272 452c-62-22-98-68-166-92C24 330 40 202 72 122z"
          fill="#ffcc8a"
        />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-[-200px] left-[-250px] w-[700px] rotate-[10deg] opacity-60 z-0"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M720 480C690 560 578 632 458 596C338 560 266 456 172 424C78 392 10 402 -26 344C-62 286 -32 216 30 160C92 104 190 90 278 102C390 116 466 134 528 156C590 178 626 224 694 248C742 266 764 302 780 340C796 378 750 400 720 480Z"
          fill="#ffcc8a"
        />
      </svg>

      {/* Updated softer blur blob moving opposite and slightly larger */}

      {/* Hero Section Content */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 px-36 py-16 items-center gap-10 z-10">
        {/* Left */}
        <FadeInLeft>
          <div>
            <h2 className="text-4xl font-semibold mb-2 text-primary">
              Authentic Medicines,
            </h2>
            <h1 className="text-3xl font-bold leading-tight mb-6 text-orange-400">
              Verified by Blockchain
            </h1>
            <p className="text-lg max-w-md mb-8 text-gray-600">
              Every medicine verified, tracked, and authenticated through
              blockchain technology to ensure you receive only genuine
              medications.
            </p>

            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-primary hover:to-orange-400 text-white px-6 py-3 rounded-xl font-medium shadow-md">
                Shop Now
              </button>
              <button
                className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-medium
  transition-all duration-300
  hover:text-white
  hover:bg-gradient-to-r hover:from-primary hover:to-orange-400"
              >
                Verify Medicine
              </button>
            </div>
          </div>
        </FadeInLeft>

        {/* Right Illustration */}
        <div className="relative w-full h-full flex justify-center z-10">
          <img
            src={bgImage}
            alt="illustration"
            className="relative w-[550px] select-none"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
