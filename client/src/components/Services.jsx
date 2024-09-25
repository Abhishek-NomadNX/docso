import React from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation

export const Services = ({ data }) => {
  const navigate = useNavigate();

  const handleServiceClick = (categoryName) => {
    // Navigate to a page that lists hospitals in this category
    navigate(`/category/${categoryName}`);
  };

  return (
    <div id="services" className="text-center">
      <div className="container mx-auto p-10">
        <div className="section-title">
          <h2 className="text-4xl font-bold mb-5">OUR SERVICES</h2>
          <p className="text-gray-600">
            We bridge the gap between you and quality healthcare, ensuring seamless access to a world of wellness.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {data && data.length > 0
            ? data.map((category, index) => (
                <div
                  key={`${category.categoryName}-${index}`}
                  className="service-card p-6 rounded-lg shadow-lg cursor-pointer"
                  onClick={() => handleServiceClick(category.categoryName)}
                >
                  <div className="icon-container mb-4 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-[#477872] to-[#6fb0a8] w-32 h-32">
                    <img src={category.categoryIcon} alt={category.categoryName} className="w-16 h-16" />
                  </div>
                  <h3 className="text-xl font-semibold">{category.categoryName}</h3>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
