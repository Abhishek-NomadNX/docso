import React, { useState } from 'react';
import Step1 from './DoctorFormSteps.jsx/step1';
import ProgressBar from './ProgressBar';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    registrationNo: '',
    registrationCouncil: '',
    registrationYear: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6">
      <ProgressBar step={step} />
      {step === 1 && (
        <Step1 formData={formData} handleChange={handleChange} handleNext={handleNext} />
      )}
      {/* Render other steps similarly based on the step value */}
    </div>
  );
};

export default MultiStepForm;
