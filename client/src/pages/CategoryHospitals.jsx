import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HospitalCard from "../components/HospitalCard"; // Create this component to display individual hospital data
import DoctorCard from "../components/DoctorCard";
import { useNavigate } from "react-router-dom"; 

const CategoryHospitals = () => {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Navigate to a page that lists hospitals in this category
    navigate(`/category/${categoryName}`);
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Fetch parent category and subcategories data
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories/search?categoryName=${categoryName}`);
        const categoryData = response.data;

        // Extract hospital IDs and fetch each hospital's details
        const hospitalPromises = categoryData.parentCategory.hospitals.map((id) =>
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/hospitals/${id}`)
        );

        const hospitalResponses = await Promise.all(hospitalPromises);
        setHospitals(hospitalResponses.map((res) => res.data));


        const doctorPromises = categoryData.parentCategory.doctors.map((id) =>
          axios.get(`${import.meta.env.VITE_BASE_URL}/api/doctors/${id}`)
        );

        const doctorResponses = await Promise.all(doctorPromises);
        setDoctors(doctorResponses.map((res) => res.data));

        // Set subcategories
        setSubcategories(categoryData.subcategories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-bold mb-5">{categoryName} Hospitals/Clinics</h2>
      
      {/* Display Hospitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => <HospitalCard hospital={hospital} />)
        ) : (
          <p>No hospitals found for this category.</p>
        )}
      </div>



      <h2 className="text-4xl font-bold mt-12 mb-5">{categoryName} Doctors</h2>
      
      {/* Display Doctors */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {doctors.length > 0 ? (
          doctors.map((doctor) => <DoctorCard doctor={doctor} />)
        ) : (
          <p>No Doctors found for this category.</p>
        )}
      </div>
        
      {/* Display Subcategories */}
      {subcategories.length > 0 && (
        <>
          <h3 className="text-2xl font-bold mt-10">Subcategories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
            {subcategories.map((subcategory, index) => (
              <div key={subcategory._id} className="subcategory-card p-6 rounded-lg shadow-lg"
              onClick={()=>handleCategoryClick(subcategory.categoryName)}>
                <img src={subcategory.categoryIcon} alt={subcategory.categoryName} className="w-16 h-16 mb-4 mx-auto" />
                <h4 className="text-lg font-semibold">{subcategory.categoryName}</h4>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryHospitals;
