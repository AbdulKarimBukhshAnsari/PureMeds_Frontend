import React from "react";

const SelectField = ({ label, name, register, error, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}*
    </label>
    <select
      {...register(name)}
      className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md px-3 py-2 focus:ring-1 focus:ring-primary focus:outline-none`}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default SelectField;
