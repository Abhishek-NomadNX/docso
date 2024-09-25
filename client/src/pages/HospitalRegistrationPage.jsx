import React, { useState } from "react";
import axios from "axios";
import Step1 from "../components/HospitalFormSteps.jsx/step1";
import Step2 from "../components/HospitalFormSteps.jsx/step2";
import Step3 from "../components/HospitalFormSteps.jsx/step3";
import Step4 from "../components/HospitalFormSteps.jsx/step4";
import Step5 from "../components/HospitalFormSteps.jsx/step5";
import Step6 from "../components/HospitalFormSteps.jsx/step6";
import Step7 from "../components/HospitalFormSteps.jsx/step7";

const HospitalRegistrationForm = () => {
  const [formData, setFormData] = useState({
    hospitalName: "",
    // hospitalId: "",
    email:'',
    hospitalImages : [],
    category: [],
    specialization: [], 
    services: [], 
    description: "",
    city: "",
    state: "",
    totalBeds: "",
    latitude:"",
    longitude:"",
    seniorDoctors:"",
    juniorDoctors: "",
    totalDoctorStaff: "",
    nursingStaff: "",
    timings: [],
    insuranceClaim: "",
    contactDetails: "",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [timing, setTimingSlot] = useState({
    days: "",
    startTime: "",
    endTime: "",
  });

  const [specialization, setSpecialization] = useState({
    specialization: "",
    others : "",
  });

  const [services, setservices] = useState({
    services: "",
    others : "",
  });

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
  

  const handleTimingSlotChange = (updatedSlots) => {
    setFormData({
      ...formData,
      timings: updatedSlots,
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

  const handleAddTimingSlot = () => {
    setFormData({
      ...formData,
      timings: [...formData.timings, { day: "", startTime: "", endTime: "" }],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Convert timings to a JSON string
    const dataToSubmit =  new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        dataToSubmit.append(key, JSON.stringify(formData[key]));
      } else {
        dataToSubmit.append(key, formData[key]);
      }
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/hospitals/register-hospital`,
        dataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Hospital registered successfully!");
      window.location.href = "/";
    } catch (err) {
      setError(
        "Failed to register hospital: " + err.response?.data?.message ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hospital-registration-form">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <Step1
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleNext={() => setStep(step + 1)}
          />
        )}
        {step === 2 && (
          <Step2
            formData={formData}
            handleChange={handleChange}
            handleChange2={handleChange2}
            handleNext={() => setStep(step + 1)}
            handlePrev={() => setStep(step - 1)}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            handleChange={handleChange}
            handleNext={() => setStep(step + 1)}
            handlePrev={() => setStep(step - 1)}
          />
        )}
        {step === 4 && (
          <Step4
            formData={formData}
            handleChange={handleChange}
            handleNext={() => setStep(step + 1)}
            handlePrev={() => setStep(step - 1)}
          />
        )}
        {step === 5 && (
          <Step5
            formData={formData}
            handleTimingSlotChange={handleTimingSlotChange}
            handleNext={() => setStep(step + 1)}
            handlePrev={() => setStep(step - 1)}
            handleChange={handleChange}
          />
        )}
        {step === 6 && (
          <Step6
            formData={formData}
            handleChange={handleChange}
            handleNext={() => setStep(step + 1)}
            handlePrev={() => setStep(step - 1)}
          />
        )}
        {step === 7 && (
          <Step7
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handlePrev={() => setStep(step - 1)}
          />
        )}
      </form>
      {loading && <p>Submitting...</p>}
    </div>
  );
};

export default HospitalRegistrationForm;
