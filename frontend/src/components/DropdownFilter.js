/**
 * DropdownFilter Component
 * A reusable, accessible multi-select dropdown with 'click-outside' detection.
 * Handles local open/close state while lifting selection logic to the parent.
 */
import { useState, useRef, useEffect } from "react";

export default function DropdownFilter({
  label,
  options,
  selected,
  onChange,
  placeholder,
}) {
  // State to toggle dropdown visibility
  const [isOpen, setIsOpen] = useState(false);

  // Reference to the main container for detecting clicks outside the component
  const dropdownRef = useRef(null);

  useEffect(() => {
    /**
     * Closes the dropdown if the user clicks anywhere outside of the dropdownRef container.
     */
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    // Attach event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount to prevent memory leaks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center space-x-3" ref={dropdownRef}>
      {/* Label positioned to the left of the selector */}
      <label className="text-white text-lg whitespace-nowrap">{label}:</label>

      {/* Select Trigger Container */}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-midnight-light text-white border-2 border-gray-400 rounded-lg cursor-pointer w-48 flex justify-between items-center hover:border-orange-400 transition-colors focus:outline-none"
        >
          {/* Truncates text if multiple options are selected to keep the UI clean */}
          <span className="truncate">
            {selected.length > 0 ? selected.join(", ") : placeholder}
          </span>
          <span
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </div>

        {/* Options List Menu */}
        {isOpen && (
          <ul className="absolute left-0 top-full mt-1 w-full bg-midnight-light rounded-lg max-h-60 overflow-auto z-50 shadow-2xl border border-gray-700 custom-scrollbar">
            {options.map((opt) => {
              const isSelected = selected.includes(opt);
              const isResetOption = String(opt).startsWith("All ");
              return (
                <li
                  key={opt}
                  className={`p-2 cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-orange-500 text-white font-bold"
                      : "hover:bg-orange-500/50 text-gray-200"
                  }`}
                  onClick={() => {
                    // Toggle logic: remove if already selected, otherwise add to array
                    if (isResetOption) {
                      onChange([]); // Reset to empty array
                    } else {
                      const newSelection = isSelected
                        ? selected.filter((item) => item !== opt)
                        : [...selected, opt];
                      onChange(newSelection);
                    }
                  }}
                >
                  <div className="flex justify-between items-center">
                    {opt}
                    {isSelected && !isResetOption && <span className="text-xs">✓</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
