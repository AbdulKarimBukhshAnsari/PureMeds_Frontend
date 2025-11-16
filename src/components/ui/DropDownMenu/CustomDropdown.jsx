import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropdown = ({ 
  value, 
  onChange, 
  options = [], 
  placeholder = "Select an option",
  error = false,
  label = "",
  icon: Icon = null,
  id = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
   onChange(optionValue); // send the actual value
  setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="space-y-2" ref={dropdownRef}>
      {label && (
        <label className=" text-sm font-medium gap-1 text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full border rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 bg-white cursor-pointer flex items-center justify-between text-left ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : isOpen
              ? "border-primary ring-2 ring-primary/20"
              : "border-gray-300 hover:border-gray-300"
          }`}
        >
          <span className={value ? "text-gray-900" : "text-gray-500"}>
            {displayText}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={20} className={value ? "text-primary" : "text-gray-500"} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-200 py-2 max-h-60 overflow-y-auto"
            >
              {options.map((option, index) => (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`w-full px-4 py-3 text-left transition-all duration-200 ${
                    value === option.value
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-primary/5 text-gray-700"
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomDropdown;
