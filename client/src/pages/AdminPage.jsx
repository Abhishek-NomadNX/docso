import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [customMessage, setCustomMessage] = useState("");
  const [rejectedDoctorId, setRejectedDoctorId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [doctorCategoryFilter, setDoctorCategoryFilter] = useState(""); // Doctor filter by category
  const [hospitalCategoryFilter, setHospitalCategoryFilter] = useState(""); // Hospital filter by category
  const [categories, setCategories] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(false); // Loading state for fetching doctors
  const [loadingHospitals, setLoadingHospitals] = useState(false); // Loading state for fetching hospitals
  const [loadingApproveDoctor, setLoadingApproveDoctor] = useState(false); // Loading state for approving doctor
  const [loadingApproveHospital, setLoadingApproveHospital] = useState(false); // Loading state for approving hospital
  const [loadingRejectDoctor, setLoadingRejectDoctor] = useState(false); // Loading state for rejecting doctor
  const navigate = useNavigate();

  const filterBySearchAndCategory = (list, searchTerm, categoryFilter, fields) => {
    return list.filter((item) => {
      const matchesNameOrCity = fields.some((field) =>
        item[field].toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = categoryFilter
        ? item.category.includes(categoryFilter)
        : true;
      return matchesNameOrCity && matchesCategory;
    });
  };

  // Filter doctors by search term and category
  useEffect(() => {
    setFilteredDoctors(
      filterBySearchAndCategory(doctors, searchTerm, doctorCategoryFilter, ['doctorName', 'city'])
    );
  }, [searchTerm, doctorCategoryFilter, doctors]);

  // Filter hospitals by search term and category
  useEffect(() => {
    setFilteredHospitals(
      filterBySearchAndCategory(hospitals, searchTerm, hospitalCategoryFilter, ['hospitalName', 'city'])
    );
  }, [searchTerm, hospitalCategoryFilter, hospitals]);

  // Fetch categories for filtering
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/get-categories`);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true); // Set loading to true while fetching
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctors/all`);
        setDoctors(response.data);
        setFilteredDoctors(response.data); // Initialize with full list
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoadingDoctors(false); // Set loading to false after fetching is done
      }
    };

    // Fetch hospitals
    const fetchHospitals = async () => {
      setLoadingHospitals(true); // Set loading to true while fetching
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/hospitals/all-hospitals`);
        setHospitals(response.data);
        setFilteredHospitals(response.data); // Initialize with full list
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoadingHospitals(false); // Set loading to false after fetching is done
      }
    };

    fetchDoctors();
    fetchHospitals();
  }, []);

  // Approve doctor
  const handleApprove = async (doctorId) => {
    setLoadingApproveDoctor(true); // Set loading for approving doctor
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/doctors/${doctorId}/approve`);
      setDoctors(
        doctors.map((doctor) =>
          doctor._id === doctorId ? { ...doctor, isApproved: true } : doctor
        )
      );
    } catch (error) {
      console.error("Error approving doctor:", error);
    } finally {
      setLoadingApproveDoctor(false); // Set loading to false after action
    }
  };

  // Reject doctor with custom message
  const handleReject = async (doctorId) => {
    setLoadingRejectDoctor(true); // Set loading for rejecting doctor
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctors/${doctorId}/reject`,
        { customMessage }
      );
      console.log(response.data.message); // Success message
      setCustomMessage("");
      setRejectedDoctorId(null);
    } catch (error) {
      console.error("Error rejecting doctor:", error);
    } finally {
      setLoadingRejectDoctor(false); // Set loading to false after action
    }
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  const handleHospitalClick = (hospitalId) => {
    navigate(`/hospitals/${hospitalId}`);
  };

  // Approve hospital
  const handleApproveHospital = async (hospitalId) => {
    setLoadingApproveHospital(true); // Set loading for approving hospital
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/hospitals/${hospitalId}/approve`);
      setHospitals(
        hospitals.map((hospital) =>
          hospital._id === hospitalId ? { ...hospital, isApproved: true } : hospital
        )
      );
    } catch (error) {
      console.error("Error approving hospital:", error);
    } finally {
      setLoadingApproveHospital(false); // Set loading to false after action
    }
  };

  return (
    <div>
      <Navbar showOther={true} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Button to create new categories */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/create-category')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Create Category
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex mb-4 space-x-4">
          <input
            type="text"
            placeholder="Search by name or city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          />
          <select
            value={doctorCategoryFilter}
            onChange={(e) => setDoctorCategoryFilter(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2"
          >
            <option value="">Filter Doctor By Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <select
            value={hospitalCategoryFilter}
            onChange={(e) => setHospitalCategoryFilter(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2"
          >
            <option value="">Filter Hospital By Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Doctors Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Registered Doctors</h2>
          {loadingDoctors ? (
            <p>Loading doctors...</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border-b border-r border-gray-300">Registration No</th>
                  <th className="py-2 px-4 border-b border-r border-gray-300">Name</th>
                  <th className="py-2 px-4 border-b border-r border-gray-300">City</th>
                  <th className="py-2 px-4 border-b border-r border-gray-300">Category</th>
                  <th className="py-2 px-4 border-b border-r border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="py-2 px-4 border-b border-r border-gray-300">
                      {doctor.registrationNumber}
                    </td>
                    <td
                      className="py-2 px-4 border-b border-r border-gray-300 cursor-pointer hover:text-blue-500"
                      onClick={() => handleDoctorClick(doctor._id)}
                    >
                      {doctor.doctorName}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300">
                      {doctor.city}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300">
                      {doctor.category}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300">
                      {doctor.isApproved ? (
                        <span className="text-green-500">Approved</span>
                      ) : (
                        <>
                          {loadingApproveDoctor ? (
                            <button disabled className="bg-blue-500 text-white px-4 py-2 rounded">
                              Approving...
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApprove(doctor._id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                            >
                              Approve
                            </button>
                          )}
                           <button
                      onClick={() => handleDoctorClick(doctor._id)}
                      className="bg-yellow-500 text-white px-6 py-1 rounded hover:bg-green-600 ml-2"
                    >
                      Review
                    </button>
                          {loadingRejectDoctor ? (
                            <button disabled className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                              Rejecting...
                            </button>
                          ) : (
                            <button
                              onClick={() => setRejectedDoctorId(doctor._id)}
                              className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition duration-300"
                            >
                              Reject
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Reject Doctor Modal */}
        {rejectedDoctorId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Reject Doctor</h2>
              <textarea
                placeholder="Enter custom message for rejection"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="border-2 border-gray-300 rounded-lg p-2 w-full"
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleReject(rejectedDoctorId)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                >
                  Confirm Reject
                </button>
                <button
                  onClick={() => setRejectedDoctorId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hospitals Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Registered Hospitals</h2>
          {loadingHospitals ? (
            <p>Loading hospitals...</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border-b border-r border-gray-300">Name</th>
                  <th className="py-2 px-4 border-b border-r border-gray-300">City</th>
                  <th className="py-2 px-4 border-b border-r border-gray-300">Category</th>
                  <th className="py-2 px-4 border-b border-r border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHospitals.map((hospital) => (
                  <tr key={hospital._id}>
                    <td
                      className="py-2 px-4 border-b border-r border-gray-300 cursor-pointer hover:text-blue-500"
                      onClick={() => handleHospitalClick(hospital._id)}
                    >
                      {hospital.hospitalName}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300">{hospital.city}</td>
                    <td className="py-2 px-4 border-b border-r border-gray-300">
                      {hospital.category}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300">
                      {hospital.isApproved ? (
                        <span className="text-green-500">Approved</span>
                      ) : (
                        <>
                          {loadingApproveHospital ? (
                            <button disabled className="bg-blue-500 text-white px-4 py-2 rounded">
                              Approving...
                            </button>
                          ) : (
                            <button
                              onClick={() => handleApproveHospital(hospital._id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                            >
                              Approve
                            </button>
                          )}
                        </>
                      )}
                        <button
                      onClick={() => handleHospitalClick(hospital._id)}
                      className="bg-yellow-500 text-white px-6 py-1 rounded hover:bg-green-600 ml-2"
                    >
                      Review
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
