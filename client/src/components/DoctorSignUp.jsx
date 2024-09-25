import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Modal from '../components/Model.jsx';
import axios from 'axios';
const SignUp = ({ setFormData, formData, handleChange, handleNext }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(formData.category || []);
  const [isCategoryOther, setIsCategoryOther] = useState(false);
  const [otherCategory, setOtherCategory] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch categories on component mount
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

  // Handle category selection
  const handleCategorySelect = (category) => {
    if (category === "Others") {
      setIsCategoryOther(true);
    } else if (!selectedCategories.includes(category)) {
      const updatedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedCategories);
      setFormData((prevData) => ({ ...prevData, category: updatedCategories }));
    }
  };

  // Handle other category submission
  const handleOtherCategorySubmit = () => {
    if (otherCategory && !selectedCategories.includes(otherCategory)) {
      const updatedCategories = [...selectedCategories, otherCategory];
      setSelectedCategories(updatedCategories);
      setFormData({ ...formData, category: updatedCategories });
    }
    setIsCategoryOther(false);
    setOtherCategory('');
  };

  // Remove category
  const removeCategory = (index) => {
    const updatedCategories = selectedCategories.filter((_, i) => i !== index);
    setSelectedCategories(updatedCategories);
    setFormData({ ...formData, category: updatedCategories });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Date validation (DD-MM-YYYY format)
    const datePattern = /^([0-2][0-9]|(3)[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    
    if (!datePattern.test(formData.dob)) {
      newErrors.dob = 'Please enter a valid date in DD-MM-YYYY format.';
    }

    // Phone number validation (10 digits)

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    // Password validation (min 8 characters, 1 special character, 1 digit, 1 letter)

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, with at least 1 letter, 1 digit, and 1 special character.';
    }

    // Avatar file size validation (max 200 KB)
    if (formData.avatar && formData.avatar.size > 200 * 1024 ) {
      newErrors.avatar = 'Profile photo size must not exceed 200 KB.';
    }

    // Category validation
    if (!selectedCategories.length) {
      newErrors.category = 'Please select at least one category.';
    }

    if (isCategoryOther && !otherCategory) {
      newErrors.otherCategory = 'Please specify the category.';
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle sign-up button click
  const handleSignUp = async () => {
    try{
      // Check if phone exists
      const phoneResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctors/check-phone`,
        { phone: formData.phone }
      );
  
      if (phoneResponse.data.message !== "Phone is available") {
        setErrors({ phone: "Phone number already exists. Please use a different phone number." });
        return; // Stop further execution if phone exists
      }
  
      // If both email and phone are available, proceed with form validation
      if (validateForm()) {
        setIsModalOpen(true);
      }

    }catch(error){
      if (error.response) {
        if (error.response.data.message === "Phone already exists") {
          setErrors({ phone: "Phone number already exists. Please use a different phone number." });
      }else {
        alert("An error occurred while checking the email.");
      }
    } else {
      alert("An unknown error occurred.");
    }

    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleNext();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(file);

      // Upload the file to Cloudinary
      const formData1 = new FormData();
      formData1.append("file", file);
      formData1.append("upload_preset", "ml_default"); // Your unsigned upload preset

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dhvcgixeu/image/upload",
          formData1
        );

        const uploadedUrl = response.data.secure_url; // Get the uploaded image URL
        console.log("Image uploaded successfully:", uploadedUrl);

        // Update the formData to store the uploaded image URL
        handleChange({
          target: {
            name: "avatar",
            value: uploadedUrl,
          },
        });
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error.message);
      }
    }
  };


  return (
    <div>
      <Navbar showLogin={false} showLogout={false} showOther={false} />
      <div className="w-full min-h-screen bg-lightGreen flex items-center justify-center rounded-lg shadow-md">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-middleGreen text-center p-2">
            Doctor Sign Up
          </h3>

          <div className="space-y-4 text-left">
            {/* Doctor Name */}
            <div>
              <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Name
              </label>
              <input
                type="text"
                id="doctorName"
                name="doctorName"
                placeholder="Enter Your Name as Dr. ---"
                value={formData.doctorName}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${errors.doctorName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
              />
              {errors.doctorName && <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>}
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Category
              </label>
              <select
                id="category"
                name="category"
                onChange={(e) => handleCategorySelect(e.target.value)}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-middleGreen'
                }`}
              >
                <option value="">Select Category</option>
                {Array.isArray(categories) && categories.length > 0 ? (
                  categories.map((category, index) => (
                    <option key={index} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
                <option value="Others">Others</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}

              {/* Display selected categories */}
              <div className="flex flex-wrap mb-2 mt-2">
                {selectedCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center px-3 py-1 m-1 text-sm font-semibold bg-lightGreen text-middleGreen rounded-full shadow-sm"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(index)}
                      className="ml-2 text-red-600 hover:text-red-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* Input for Other Category */}
              {isCategoryOther && (
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={otherCategory}
                    onChange={(e) => setOtherCategory(e.target.value)}
                    placeholder="Specify Category"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen flex-grow mr-2"
                  />
                  <button
                    type="button"
                    onClick={handleOtherCategorySubmit}
                    className="px-4 py-2 bg-middleGreen text-white rounded-md shadow-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* D.O.B */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                D.O.B.
              </label>
              <input
                type="text"
                id="dob"
                name="dob"
                placeholder="DD-MM-YYYY"
                value={formData.dob}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>


    {/* Gender */}
    <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Select Your Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}  // Make sure this is a string
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Profile Photo */}
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Profile Photo
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleFileChange}
                required
                className={`w-full p-3 border ${errors.avatar ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
              />
              {errors.avatar && <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between space-x-2 mt-5">
            
            <button
              type="button"
              onClick={handleSignUp}
              className="w-full py-2 px-4 bg-middleGreen text-white rounded-md shadow-md hover:bg-docsoGreen"
            >
              Sign Up
            </button>
          </div>

          {/* Modal */}
             {/* Modal */}
             <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Sign Up Successful</h2>
            <p className="text-gray-700">Your sign-up was successful. You will be redirected to complete your profile.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-docsoGreen text-white px-4 py-2 rounded-md hover:bg-middleGreen transition duration-300"
              >
                Proceed
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
