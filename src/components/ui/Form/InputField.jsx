import React from "react";

const InputField = ({ label, name, type = "text", register, error, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        {...register(name)}
        placeholder={placeholder}
        rows={4}
        className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none resize-none`}
      />
    ) : (
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none`}
      />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default InputField;
