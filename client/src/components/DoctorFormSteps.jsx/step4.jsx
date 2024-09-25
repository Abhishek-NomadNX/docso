import React from 'react';
import { useState,useEffect } from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar';
import axios from 'axios';

const Step4 = ({ handleChange, handleNext, handlePrev ,formData}) => {
  const [errors, setErrors] = useState({});
  const [identityProof, setIdentityProof] = useState([]);  // Define state for identityProof
  const [identityProof2, setIdentityProof2] = useState([]);
  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
    }
  };
   
  const handleFileChange = async (e, fieldName) => {
    const files = e.target.files; 
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          if (reader.readyState === 2) {
            if (fieldName === "identityProof") {
              setIdentityProof((prev) => [...prev, reader.result]);
            } else if (fieldName === "identityProof2") {
              setIdentityProof2((prev) => [...prev, reader.result]);
            }
          }
        };
  
        reader.readAsDataURL(file);
  
        // Upload the file to Cloudinary
        const formData1 = new FormData();
        formData1.append("file", file);
        formData1.append("upload_preset", "ml_default"); 
  
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dhvcgixeu/image/upload",
            formData1
          );
  
          const uploadedUrl = response.data.secure_url; 
          console.log("Image uploaded successfully:", uploadedUrl);
  
          // Update the formData with the uploaded image URL
          handleChange({
            target: {
              name: fieldName, 
              value: uploadedUrl, 
            },
          });
        } catch (error) {
          console.error("Error uploading image to Cloudinary:", error.message);
        }
      }
    }
  };

  const validateForm= () =>{
    const newErrors = {};
    if (!formData.identityProof){newErrors.identityProof='Identity Proof is required'}
    if (formData.identityProof && formData.identityProof.size > 200 * 1024 ) {
      newErrors.identityProof = 'Identity Proof photo size must not exceed 200 KB.';
    }
    if (formData.identityProof2 && formData.identityProof2.size > 200 * 1024 ) {
      newErrors.identityProof2 = 'Identity Proof 2 photo size must not exceed 200 KB.';
    }
    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  return (
  <div className="min-h-screen flex flex-col bg-lightGreen">
    <Navbar showLogin={false} showLogout={false} showOther={false} />
    <div className="flex-1 flex flex-col items-center">
      <ProgressBar step={4} totalSteps={8} />

      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg mt-8">
        <h3 className="text-2xl font-bold text-middleGreen mb-4 text-center">
          Upload Identity Proof
        </h3>
        <p className="text-gray-700 mb-6 text-center">
          Please upload your identity proof to ensure that the ownership of your profile remains with only you.
        </p>
        <p className="text-gray-700 mb-6 text-center">
          Acceptable documents:
        </p>
        <ul className="text-gray-700 mb-6 list-disc list-inside">
          <li>Aadhar Card</li>
          <li>Driving License</li>
          <li>Voter Card</li>
          <li>Any other Govt. ID</li>
        </ul>

        <div className="mb-6">
          <label htmlFor="identityProof" className="block text-lg font-semibold text-docsoGreen mb-2">
            Upload Identity Proof
          </label>
          <span className='text-xs text-gray-600  font-normal'> Upload Front View </span>
          <div  method="POST" encType="multipart/form-data" action = "/upload">
          <input
            type="file"
            id="identityProof"
            name="identityProof"
            onChange={(e) => handleFileChange(e, "identityProof")}
            
                className={`w-full p-3 border ${errors.identityProof ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
          />
           {errors.identityProof && <p className="text-red-500 text-sm mt-1">{errors.identityProof}</p>}
          </div>
        </div>


        <div className="mb-6">
        <span className='text-xs text-gray-600  font-normal'> Upload Back View </span>
          <input
            type="file"
            id="identityProof2"
            name="identityProof2"
            onChange={(e) => handleFileChange(e, "identityProof2")}
            className={`w-full p-3 border ${errors.identityProof2 ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-middleGreen`}
            />
             {errors.identityProof2 && <p className="text-red-500 text-sm mt-1">{errors.identityProof2}</p>}
      
        </div>


        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrev}
            className="py-3 px-6 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-300"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNextClick}
            className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen transition duration-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
  )
};

export default Step4;
