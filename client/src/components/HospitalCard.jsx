import React from "react";
import { useNavigate } from "react-router-dom";

const HospitalCard = ({ hospital }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/hospitals/${hospital._id}`);
  };

  return (
    <div
      className="bg-lightGreen p-6 m-4 border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center mb-4">
      <img
                src={hospital.hospitalImages[0]}
                alt={`${hospital.hospitalName} image`}
                className="w-20 h-20 rounded-full object-cover mr-4"
              />

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {hospital.hospitalName}
          </h3>
          <p className="text-gray-700 text-sm mb-1">
            <span className="font-semibold">Category:</span> {hospital.category}
          </p>
          <p className="text-gray-700 text-sm mb-1">
            <span className="font-semibold">City:</span> {hospital.city}
          </p>
          <p className="text-gray-700 text-sm mb-4">
            <span className="font-semibold">Contact Details:</span>{" "}
            {hospital.contactDetails}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HospitalCard;