import React from 'react';

const Button = ({ label }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      {label}
    </button>
  );
};

export default Button;
