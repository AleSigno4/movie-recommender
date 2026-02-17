import React, { useState, useEffect } from "react";

/**
 * Bottone "Scroll to Top" con apparizione fluida al superamento di una soglia
 */

export default function BtnToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 300px for scroll threshold, can be adjusted as needed
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-orange-500 text-white text-2xl font-bold w-12 h-12 rounded-full shadow-2xl z-50 transition-all duration-300 transform  flex items-center justify-center
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        } 
        hover:bg-orange-600 hover:scale-110 active:scale-95`}
      aria-label="Scroll to top"
    >
      <svg /* Icon: Heroicons outline/chevron-up */
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </button>
  );
}
