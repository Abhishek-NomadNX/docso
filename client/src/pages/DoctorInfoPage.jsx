import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const DoctorInfo = () => {
  const { doctorId } = useParams(); // Get the doctorId from the URL
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/doctors/${doctorId}`
        );
        setDoctor(response.data);
      } catch (error) {
        setError("Error fetching doctor information");
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading doctor information...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <Navbar showSearch={true} showOther={true} className="bg-green-300" />
      {doctor && (
        <div className="container mx-auto p-4">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-40">
              <img
                src={doctor.avatar}
                alt={doctor.doctorName}
                className=" m-4 w-52 h-60 rounded-md object-cover mb-4 md:mb-0 md:mr-6"
              />
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {" "}
                  {doctor.doctorName}
                </h2>

                <h2 className="text-xl font-semibold mb-2">
                {doctor.degree && doctor.degree.length > 0 
                      ? doctor.degree.map((degree, index) => (
                          <span key={index}>
                            {degree}
                            {index !== doctor.degree.length - 1 && ', '} {/* Add comma between degrees */}
                          </span>
                        ))
                      : "No degrees available"}
                  </h2>
                  <p className="text-lg mb-2">
                    <strong>Category:</strong> {doctor.category && Array.isArray(doctor.category) ? doctor.category.join(", ") : doctor.category}
                  </p>

                <p className="text-lg mb-2">
                  <strong>Experience:</strong> {doctor.experience} Years
                </p>
                <p className="text-lg mb-2">
                  <strong>State:</strong> {doctor.state}
                </p>
                <p className="text-lg mb-2">
                  <strong>City:</strong> {doctor.city}
                </p>

                <p className="text-lg mb-4">
                  <strong>Consultancy Fees:</strong> INR{" "}
                  {doctor.consultancyFees}
                </p>
                <p className="text-lg mb-4">
                  <strong>Phone NO:</strong> {doctor.phone}
                </p>
                <p className="text-lg mb-4">
                  <strong>Email:</strong> {doctor.email}
                </p>
                {doctor.latitude && doctor.longitude && (
                  <p className="text-lg mb-4">
                    <strong>Location:</strong>
                    <a
                      href={`https://www.google.com/maps?q=${doctor.latitude},${doctor.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View on Google Maps
                    </a>
                  </p>
                )}
              </div>
            </div>
            <hr style={{ background: "lime", height: "3px", border: "none" }} />
            <br></br>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">Timing Slots</h3>
              {doctor.timingSlots && Array.isArray(doctor.timingSlots) ? (
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  {doctor.timingSlots.map((slot, index) => (
                    <div key={slot._id} className="mb-4">
                      <h4 className="text-xl font-semibold mb-2">
                        {slot.days.join(", ")}
                      </h4>
                      <div className="space-y-2">
                        {slot.morningStart && slot.morningEnd && (
                          <p className="text-lg">
                            <strong>Morning:</strong> {slot.morningStart} -{" "}
                            {slot.morningEnd}
                          </p>
                        )}
                        {slot.afternoonStart && slot.afternoonEnd && (
                          <p className="text-lg">
                            <strong>Afternoon:</strong> {slot.afternoonStart} -{" "}
                            {slot.afternoonEnd}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No timing slots available.</p>
              )}
            </div>

            {/* Display Images */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Proof Documents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctor.establishmentProof && (
                  <div className="proof-image">
                    <img
                      src={doctor.establishmentProof}
                      alt="Establishment Proof"
                      className="w-full h-auto rounded-md shadow-md"
                    />
                    <p className="text-center mt-2">Establishment Proof</p>
                  </div>
                )}
                {doctor.identityProof && (
                  <div className="proof-image">
                    <img
                      src={doctor.identityProof}
                      alt="Identity Proof"
                      className="w-full h-auto rounded-md shadow-md"
                    />
                    <p className="text-center mt-2">Identity Proof</p>
                  </div>
                )}
                {doctor.medicalRegistrationProof && (
                  <div className="proof-image">
                    <img
                      src={doctor.medicalRegistrationProof}
                      alt="Medical Registration Proof"
                      className="w-full h-auto rounded-md shadow-md"
                    />
                    <p className="text-center mt-2">
                      Medical Registration Proof
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorInfo;
