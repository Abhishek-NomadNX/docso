import React from 'react';
import Navbar from '../Navbar';
import { useState,useEffect } from 'react';
import ProgressBar from '../ProgressBar';
import axios from 'axios';
const Step6 = ({ handleChange, handleNext, handlePrev,formData }) => {

  const [errors, setErrors] = useState({});
  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.readyState === 2) {
          setEstablishmentProof(reader.result);
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
            name: "establishmentProof",
            value: uploadedUrl,
          },
         
        });
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error.message);
      }
    }
  };

  const validateForm= () =>{
    const newErrors = {};
    // if (!formData.establishmentProof){newErrors.establishmentProof='Establishment Registration Proof is required'}
    if (formData.establishmentProof && formData.establishmentProof.size > 200 * 1024 ) {
      newErrors.establishmentProof = 'Establishment Registration Proof photo size must not exceed 200 KB.';
    }
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  return(
  <div className="min-h-screen flex flex-col bg-lightGreen">
    <Navbar showLogin={false} showLogout={false} showOther={false} />
    <div className="flex-1 flex flex-col items-center">
      <ProgressBar step={6} totalSteps={8} />

      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg mt-8">
        <h3 className="text-2xl font-semibold text-middleGreen mb-6 text-center">
          Establishment Proof
        </h3>

        <p className="text-gray-700 mb-4 text-center">
          Please upload your establishment proof to verify the legitimacy of your practice and ensure trust with your patients.
        </p>

        <p className="text-gray-700 mb-6">
          Acceptable documents:
          <ul className="list-disc list-inside mt-2">
            <li>Clinic Registration Certificate</li>
            <li>Hospital Establishment License</li>
            <li>Any other official establishment proof</li>
          </ul>
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <label
              htmlFor="establishmentProof"
              className="block text-lg font-semibold text-docsoGreen mb-2"
            >
              Upload Establishment Proof
            </label>
            <input
              type="file"
              id="establishmentProof"
              name="establishmentProof"
              onChange={handleFileChange}
              required
              className={`w-full p-3 border ${errors.establishmentProof ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
              />
               {errors.establishmentProof && <p className="text-red-500 text-sm mt-1">{errors.establishmentProof}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-between w-full max-w-md mx-auto">
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className="bg-docsoGreen text-white px-6 py-2 rounded-md hover:bg-middleGreen transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
)};

export default Step6;
