import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/doctor/${doctor._id}`);
  };

  const status = doctor.isApproved;

  if (!status) {
    return null;
  }
            

  return (
    <div
      className="bg-slate-100 p-6 m-4 border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center mb-4">
        <img
          src={doctor.avatar}
          alt={doctor.doctorName}
          className="w-20 h-20 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.doctorName}</h3>
          <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">Category: </span>{doctor.category && Array.isArray(doctor.category) ? doctor.category.join(", ") : doctor.category}</p>
          <p className="text-gray-700 text-sm mb-1"><span className="font-semibold">City:</span> {doctor.city}</p>
          <p className="text-gray-700 text-sm mb-4"><span className="font-semibold">Consultancy Fees:</span> INR {doctor.consultancyFees}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
