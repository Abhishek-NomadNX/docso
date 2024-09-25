import React from 'react';

const ProgressBar2 = ({ step }) => {
  const percentage = (step / 7) * 100;

  return (
    <div className="w-full bg-gray-200 h-1.5">
      <div
        className="bg-docsoGreen h-1.5"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar2;
