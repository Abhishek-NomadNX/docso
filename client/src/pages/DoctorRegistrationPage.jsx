import React, { useState,useEffect } from "react";
import axios from "axios";
import Step1 from "../components/DoctorFormSteps.jsx/step1";
import Step2 from "../components/DoctorFormSteps.jsx/step2";
import Step3 from "../components/DoctorFormSteps.jsx/step3";
import Step4 from "../components/DoctorFormSteps.jsx/step4";
import Step5 from "../components/DoctorFormSteps.jsx/step5";
import Step6 from "../components/DoctorFormSteps.jsx/step6";
import Step7 from "../components/DoctorFormSteps.jsx/step7";
import Step8 from "../components/DoctorFormSteps.jsx/step8";
import SignUp from "../components/DoctorSignUp";


const DoctorRegistrationForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    doctorName: '',
    category: [],
    phone: '',
    otherCategory: '',
    avatar: null,
    password : '',
    dob : '',
    gender : '',
    hospitalId: '',
    registrationNo: "",
    registrationCouncil: "",
    otherCouncil:"",
    registrationYear: "",
    degree: [],
    college: "",
    otherCollege:"",
    completionYear: "",
    experience: "",
    establishmentName: "",
    city: "",
    state: "",
    landmark:"",
    address:"",
    pincode:"",
    latitude: '',
    longitude: '',
    email:'',
    identityProof: null,
    identityProof2: null,
    medicalRegistrationProof: null,
    establishmentProof: null,
    timingSlots: [],
    description: '',
    consultancyFees: "",
  });

  const [timingSlot, setTimingSlot] = useState({
    days: "",
    startTime: "",
    endTime: "",
    morningStart: '',
      morningEnd:'',
      afternoonStart: '',
      afternoonEnd:''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('doctorRegistrationFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('doctorRegistrationFormData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });

    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChange2 = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const selectedValues = [];
    
    // Loop through all options and push the selected values
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
  
    // Update the formData state with the selected categories
    setFormData({
      ...formData,
      category: selectedValues,
    });
  };


  const handleTimingSlotChange = (updatedSlots) => {
    setFormData({
      ...formData,
      timingSlots: updatedSlots,
    });
  };

  const handleAddTimingSlot = (slot) => {
    setFormData({
      ...formData,
      timingSlots: [...formData.timingSlots, slot],
    });
  };
  // handle remove time slotes
  const handleRemoveTimingSlot = (index) => {
    const newTimings = [...formData.timings];
    newTimings.splice(index, 1);
    setFormData({
      ...formData,
      timings: newTimings,
    });
  };

  const handleTimingChange = (index, e) => {
    const { name, value } = e.target;
    const newTimings = [...formData.timings];
    newTimings[index] = {
      ...newTimings[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      timings: newTimings,
    });
  };


  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formDataToSubmit.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/doctors/register`,
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // create a alert message upon succesfull registration
      alert("Registration successful");
      // redirect to login page
      localStorage.removeItem('doctorRegistrationFormData');

      window.location.href = "/";
      
    } catch (error) {
      console.error("Error registering doctor:", error);
      alert("An error occurred while registering the doctor.");
    }
  };

  return (
    <div className="doctor-registration-form">
    
      <form onSubmit={handleSubmit}>
      {step === 0 && (
        <SignUp
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleMultiSelectChange={handleMultiSelectChange}
          handleNext={handleNext}
        />
      )}
      

        {step === 1 && (
          <Step1
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
       {step === 3 && (
          <Step3
            formData={formData}
            handleChange={handleChange}
            handleChange2={handleChange2}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 4 && (
          <Step4
          formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 5 && (
          <Step5
            formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 6 && (
          <Step6
          formData={formData}
            handleChange={handleChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
          />
        )}
        {step === 7 && (
          <Step7
            formData={formData}
            handleTimingSlotChange={handleTimingSlotChange}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleChange={handleChange}
          />
        )}
        {step === 8 && (
          <Step8
            formData={formData}
            handleChange={handleChange}
            handlePrev={handlePrev}
          />
        )}
      </form>
    </div>
  );
};

export default DoctorRegistrationForm;
