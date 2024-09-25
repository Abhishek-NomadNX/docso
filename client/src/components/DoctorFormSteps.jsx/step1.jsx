import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import Navbar from "../Navbar";
import { doctorCouncils } from "../../utils/councils.js";
import axios from "axios";

const Step1 = ({ formData, handleChange, handleNext, handlePrev }) => {
  const [errors, setErrors] = useState({});
  const [isOtherCouncil, setIsOtherCouncil] = useState(
    formData.registrationCouncil === "Others"
  );
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [enteredCode, setEnteredCode] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for async requests

  const handleCouncilChange = (e) => {
    const value = e.target.value;
    setIsOtherCouncil(value === "Others");
    handleChange(e);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!formData.email) newErrors.email = "Email is required.";
    
    // Validate registration number length
    if (!formData.registrationNo) {
      newErrors.registrationNo = "Registration Number is required.";
    } else if (formData.registrationNo.length < 6 || formData.registrationNo.length > 20) {
      newErrors.registrationNo = "Registration Number must be between 6 and 20 characters.";
    }
  
    // Validate registration council
    if (!formData.registrationCouncil)
      newErrors.registrationCouncil = "Registration Council is required.";
  
    // If "Others" is selected, validate the otherCouncil field
    if (isOtherCouncil && !formData.otherCouncil)
      newErrors.otherCouncil = "Other Council is required.";
  
    // Validate registration year
    if (!formData.registrationYear) {
      newErrors.registrationYear = "Registration Year is required.";
    } else if (
      !/^\d{4}$/.test(formData.registrationYear) || // Check if it's a 4-digit number
      parseInt(formData.registrationYear) < 1900 || // Add a reasonable year range
      parseInt(formData.registrationYear) > new Date().getFullYear()
    ) {
      newErrors.registrationYear = "Registration Year must be a valid 4-digit year.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };
  

  const handleNextClick = async () => {
    try {
      // Check if email exists
      const emailResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctors/check-email`,
        { email: formData.email }
      );
  
      if (emailResponse.data.message !== "Email is available") {
        setErrors({ email: "Email already exists. Please use a different email." });
        return; // Stop further execution if email exists
      }
  
      // If both email and phone are available, proceed with form validation
      if (validateForm()) {
        handleNext();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "Email already exists") {
          setErrors({ email: "Email already exists. Please use a different email." });
        } else {
          alert("An error occurred while checking the email.");
        }
      } else {
        alert("An unknown error occurred.");
      }
    }
  };
  

  const sendVerificationCode = async () => {
    if (!formData.email) {
      setErrors({ email: "Email is required for verification." });
      return;
    }
    setLoading(true); // Start loading
    try {
      const emailCheck = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctors/check-email`,
        { email: formData.email }
      );
  
      if (emailCheck.data.message === "Email is available") {
        try {
          await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/emailVerification/send-verification-code`,
            { email: formData.email }
          );
          setVerificationSent(true); // Set verification status
          alert("Verification code sent to your email.");
        } catch (error) {
          console.error(error);
          alert("Error sending verification code.");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message === "Email already exists") {
        setErrors({ email: "Email already exists. Please use a different email." });
      } else {
        alert("An error occurred while checking the email.");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  const verifyEmailCode = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/emailVerification/verify-code`,
        { email: formData.email, code: enteredCode }
      );
      if (response.data.message === "Verification successful") {
        setIsVerified(true);
        alert("Email verified successfully.");
      } else {
        alert("Invalid verification code.");
      }
    } catch (error) {
      console.error(error);
      alert("Error verifying email.");
    }
  };

  return (
    <div>
      <Navbar showLogin={false} showLogout={false} showOther={false} />
      <ProgressBar step={1} totalSteps={8} />
      <div className="w-full min-h-screen bg-lightGreen flex items-center justify-center rounded-lg shadow-md">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-middleGreen text-left p-3">
            Doctor Registration
          </h3>

          <div className="space-y-4 text-left w-full p-6">
            <div className="">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-middleGreen"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {!verificationSent && (
              <button
                type="button"
                onClick={sendVerificationCode}
                className="mt-2 bg-docsoGreen text-white px-4 py-2 rounded-md hover:bg-middleGreen transition duration-300"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Sending..." : "Send Verification Code"} {/* Loading message */}
              </button>
            )}
             {verificationSent && !isVerified && (
              <div>
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  placeholder="Enter the code sent to your email"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-middleGreen"
                />
                <button
                  type="button"
                  onClick={verifyEmailCode}
                  className="mt-2 bg-docsoGreen text-white px-4 py-2 rounded-md hover:bg-middleGreen transition duration-300"
                >
                  Verify Code
                </button>
              </div>
            )}
            <div>
              <label
                htmlFor="registrationNo"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Your Registration Number
              </label>
              <input
                type="text"
                name="registrationNo"
                placeholder="Registration Number"
                value={formData.registrationNo}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.registrationNo
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-middleGreen"
                }`}
              />
              {errors.registrationNo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.registrationNo}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="registrationCouncil"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Your Registration Council
              </label>
              <select
                id="registrationCouncil"
                name="registrationCouncil"
                value={formData.registrationCouncil}
                onChange={handleCouncilChange}
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.registrationCouncil
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-middleGreen"
                }`}
              >
                <option value="">Select Registration Council</option>
                {doctorCouncils.map((council, index) => (
                  <option key={index} value={council}>
                    {council}
                  </option>
                ))}
                <option value="Others">Others</option>
              </select>
              {errors.registrationCouncil && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.registrationCouncil}
                </p>
              )}
              {isOtherCouncil && (
                <div className="mt-2">
                  <label
                    htmlFor="otherCouncil"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Specify Other Council
                  </label>
                  <input
                    type="text"
                    id="otherCouncil"
                    name="otherCouncil"
                    placeholder="Specify Other Council"
                    value={formData.otherCouncil || ""}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.otherCouncil
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-middleGreen"
                    }`}
                  />
                  {errors.otherCouncil && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.otherCouncil}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="registrationYear"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter Registration Year
              </label>
              <input
                type="text"
                name="registrationYear"
                placeholder="Registration Year"
                value={formData.registrationYear}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.registrationYear
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-middleGreen"
                }`}
              />
              {errors.registrationYear && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.registrationYear}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 space-x-2 flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-400 text-white mb-7 px-6 py-2 ml-6 rounded-md hover:bg-gray-500 transition duration-300"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={handleNextClick}
              className="bg-docsoGreen text-white mb-7 px-6 py-2 mr-6 rounded-md hover:bg-middleGreen transition duration-300"
            >
              Save and go to the Next Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
