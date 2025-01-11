import React from "react";

const InputField = ({
  placeholder,
  label,
  type,
  id,
  value,
  onChange,
  name,
}) => {
  return (
    <input
      type={type}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      label={label}
      id={id}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

export default InputField;
