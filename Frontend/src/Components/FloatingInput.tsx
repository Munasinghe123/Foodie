import React from "react";
import type { LucideIcon } from "lucide-react";

interface FloatingInputProps {
  label: string;
  type?: string;
  icon: LucideIcon;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  type = "text",
  icon: Icon,
  value,
  onChange
}) => {
  return (
    <div className="relative w-full">

      {/* Icon */}
      <Icon className="absolute left-3 top-3 text-black w-5 h-5 pointer-events-none" />

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="
          peer w-full pl-10 pr-4 py-3 bg-transparent border border-orange-400 
          text-black rounded-md
          focus:outline-none focus:ring-2 focus:ring-orange-500
        "
      />

      {/* Floating Label */}
      <label
        className="
          absolute left-10 top-3 text-black pointer-events-none
          transition-all duration-200
          peer-focus:-top-3 peer-focus:text-sm peer-focus:text-orange-400
          peer-valid:-top-3 peer-valid:text-sm peer-valid:text-orange-400
        "
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
