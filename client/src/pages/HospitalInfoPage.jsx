import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const HospitalInfo = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/hospitals/${id}`
        );
        setHospital(response.data);
      } catch (error) {
        console.error("Error fetching hospital:", error);
      }
    };

    fetchHospital();
  }, [id]);

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  if (!hospital) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      <Navbar showSearch={true} showOther={true} />
      <div className="min-h-screen bg-lightGreen p-6">
        <div className="bg-white shadow-2xl rounded-lg p-8 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-docsoGreen mb-6 text-center">
            {hospital.hospitalName}
          </h2>

          {/* Flexbox layout for image and hospital information */}
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between mb-6 gap-8">
            {/* Hospital details */}
            <div className="flex-1">
              <div className="space-y-4">
                <p className="text-lg text-gray-800">
                  <strong>Location:</strong> {hospital.city}, {hospital.locality}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Total Beds:</strong> {hospital.totalBeds}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Available Beds:</strong> {hospital.availableBeds}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Category:</strong> {hospital.category}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Specialization:</strong> {hospital.specialization}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Description:</strong> {hospital.description}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Contact:</strong> {hospital.contactDetails}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Insurance Claim:</strong>{" "}
                  {hospital.insuranceClaim ? "Yes" : "No"}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Timings of Hospital:</strong>
                </p>
                <ul className="list-disc pl-5 text-gray-600">
                  {hospital.timings && Array.isArray(hospital.timings) ? (
                    hospital.timings.map((slot, index) => (
                      <li key={index}>
                        {slot.day}: {slot.startTime} - {slot.endTime}
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-600">No timings available.</p>
                  )}
                </ul>
              </div>
            </div>

            {/* Hospital images slider */}
            <div className="w-full md:w-1/3 flex-shrink-0">
              <Slider {...sliderSettings}>
                {hospital.hospitalImages && hospital.hospitalImages.length > 0 ? (
                  hospital.hospitalImages.map((image, index) => (
                    <div key={index} className="p-4">
                      <img
                        src={image}
                        alt={`${hospital.hospitalName} ${index + 1}`}
                        className="w-full h-auto rounded-md object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p>No images available.</p>
                )}
              </Slider>
            </div>
          </div>

          {/* Doctors List */}
          <h3 className="text-3xl font-semibold text-docsoGreen mt-8 mb-4">
            Doctors at this Hospital:
          </h3>
          <ul className="space-y-6">
            {hospital.doctors && Array.isArray(hospital.doctors) && hospital.doctors.length > 0 ? (
              hospital.doctors.map((doctor) => {
                const avatarUrl = doctor.avatar
                  ? doctor.avatar.startsWith("http")
                    ? doctor.avatar
                    : `${baseURL}${doctor.avatar}`
                  : `${baseURL}default-avatar.png`; 

                return (
                  <li
                    key={doctor._id}
                    className="p-6 border border-gray-200 rounded-lg shadow-md bg-white hover:bg-green-300 transition duration-300 cursor-pointer"
                    onClick={() => handleDoctorClick(doctor._id)}
                  >
                    <div className="flex items-center mb-4">
                      <img
                        src={avatarUrl}
                        alt={doctor.doctorName}
                        className="w-20 h-20 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="text-2xl font-semibold text-gray-800">
                          {doctor.doctorName}
                        </h4>
                        <p className="text-lg text-gray-600 mb-2">
                          <strong>Category:</strong> {doctor.category && Array.isArray(doctor.category) ? doctor.category.join(", ") : doctor.category}
                        </p>
                        <p className="text-lg text-gray-600 mb-2">
                          <strong>Consultancy Fees:</strong> {doctor.consultancyFees}
                        </p>
                        <p className="text-lg text-gray-600 mb-2">
                          <strong>Timing Slots:</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-600 text-md">
                          {doctor.timingSlots && doctor.timingSlots.length > 0 ? (
                            doctor.timingSlots.map((slot, index) => (
                              <li key={index}>
                                {Array.isArray(slot.days) && slot.days.length > 0
                                  ? slot.days.join(", ")
                                  : "No days specified"} (Morning): 
                                {slot.morningStart && slot.morningEnd
                                  ? `${slot.morningStart} - ${slot.morningEnd}`
                                  : "No morning timings"}
                                {slot.afternoonStart && slot.afternoonEnd && (
                                  <>
                                    <br />
                                    {Array.isArray(slot.days) && slot.days.length > 0
                                      ? slot.days.join(", ")
                                      : "No days specified"} (Afternoon): {slot.afternoonStart} - {slot.afternoonEnd}
                                  </>
                                )}
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-600">No timing slots available</p>
                          )}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <p className="text-gray-600">No doctors available.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HospitalInfo;
