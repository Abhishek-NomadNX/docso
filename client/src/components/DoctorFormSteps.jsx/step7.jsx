import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import ProgressBar from '../ProgressBar2';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];


const Step7 = ({ formData, handleTimingSlotChange, handleNext, handleChange, handlePrev }) => {
  const [timings, setTimings] = useState(formData.timings || [{
    days: [], 
    morningStart: '', 
    morningEnd: '', 
    afternoonStart: '', 
    afternoonEnd: ''
  }]);

  

  const [selectedDays, setSelectedDays] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    handleTimingSlotChange(timings);
  }, [timings]);

  // const validateForm = () => {
  //   const newErrors = {}
  //   if (!formData.description) newErrors.description = 'Description is required.';

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };


  const handleAddTimingSlot = () => {
    const newErrors = { ...errors }; // Copy existing errors
    
    // Check if any timing slot fields are empty
    if (selectedDays.length === 0) {
      newErrors.selectedDays = "Please select at least one day.";
    } else {
      delete newErrors.selectedDays; // Clear the error for selectedDays if days are selected
    }
  
    const lastTiming = timings[timings.length - 1] || {}; // Get the last timing slot
  
    // Validate each timing field (morning start, morning end, afternoon start, afternoon end)
    if (!lastTiming.morningStart) {
      newErrors[timings.length - 1] = newErrors[timings.length - 1] || {};
      newErrors[timings.length - 1].morningStart = "Session 1 Start time is required";
    }
    if (!lastTiming.morningEnd) {
      newErrors[timings.length - 1] = newErrors[timings.length - 1] || {};
      newErrors[timings.length - 1].morningEnd = "Session 1 End time is required";
    }
    if (!lastTiming.afternoonStart) {
      newErrors[timings.length - 1] = newErrors[timings.length - 1] || {};
      newErrors[timings.length - 1].afternoonStart = "Session 2 Start time is required";
    }
    if (!lastTiming.afternoonEnd) {
      newErrors[timings.length - 1] = newErrors[timings.length - 1] || {};
      newErrors[timings.length - 1].afternoonEnd = "Session 2 End time is required";
    }
  
    // If there are no errors, add a new timing slot
    if (!newErrors.selectedDays && !Object.keys(newErrors[timings.length - 1] || {}).length) {
      setTimings([
        ...timings,
        {
          days: [],
          morningStart: '',
          morningEnd: '',
          afternoonStart: '',
          afternoonEnd: '',
        },
      ]);
    }
  
    setErrors(newErrors); // Update the errors state
  };
  

  const handleRemoveTimingSlot = (index) => {
    const removedDays = timings[index].days;
    const newTimings = timings.filter((_, i) => i !== index);
    const newSelectedDays = selectedDays.filter(day => !removedDays.includes(day));
    setTimings(newTimings);
    setSelectedDays(newSelectedDays);
  };

  const handleTimingChange = (index, e) => {
    const { name, value } = e.target;
    const newTimings = [...timings];
    newTimings[index][name] = value;
    setTimings(newTimings);
    validateTimingSlot(index, newTimings[index]);
  };

  const handleDayChange = (index, day) => {
    const newTimings = [...timings];
    const selectedDaysInSlot = newTimings[index].days;
    if (selectedDaysInSlot.includes(day)) {
      newTimings[index].days = selectedDaysInSlot.filter(d => d !== day);
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      newTimings[index].days.push(day);
      setSelectedDays([...selectedDays, day]);
    }
    setTimings(newTimings);
  };

  const validateTimingSlot = (index, timing) => {
    const errors = {};
    const { morningStart, morningEnd, afternoonStart, afternoonEnd } = timing;

    if (morningStart && morningEnd) {
      const morningStartTime = new Date(`1970-01-01T${morningStart}:00`);
      const morningEndTime = new Date(`1970-01-01T${morningEnd}:00`);

      if (morningEndTime <= morningStartTime) {
        errors.morning = 'Morning end time must be after start time';
      } else if ((morningEndTime - morningStartTime) < 1800000) {
        errors.morning = 'Morning slot must be at least 30 minutes';
      }
    }

    if (afternoonStart && afternoonEnd) {
      const afternoonStartTime = new Date(`1970-01-01T${afternoonStart}:00`);
      const afternoonEndTime = new Date(`1970-01-01T${afternoonEnd}:00`);

      if (afternoonEndTime <= afternoonStartTime) {
        errors.afternoon = 'Afternoon end time must be after start time';
      } else if ((afternoonEndTime - afternoonStartTime) < 1800000) {
        errors.afternoon = 'Afternoon slot must be at least 30 minutes';
      }
    }

    setErrors(prevErrors => ({ ...prevErrors, [index]: errors }));
  };

  return (
    <div className="min-h-screen bg-lightGreen">
      <Navbar showLogin={false} showLogout={false} />
      <ProgressBar step={7} totalSteps={8} />
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-md rounded-lg">
           <div>
        <h2 className="text-2xl font-bold text-docsoGreen mb-6">Set Establishment Timing</h2>
        <p className="text-gray-700 mb-8">
          Please provide the available timing slots. You can specify multiple days and the start and end times for each slot, including separate timings for morning and afternoon.
        </p>

        {timings.map((timing, index) => (
          <div key={index} className="mb-6 p-6 bg-lightGreen shadow-sm rounded-lg">
            <div className="grid gap-6">
              <div>
                <label className="block text-docsoGreen font-semibold mb-2">Select Days
                </label>
                
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map(day => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayChange(index, day)}
                      disabled={selectedDays.includes(day) && !timing.days.includes(day)}
                      className={`w-10 h-10 flex items-center justify-center cursor-pointer rounded-full border-2 ${
                        timing.days.includes(day)
                          ? 'bg-docsoGreen text-white border-middleGreen'
                          : 'bg-lightGreen border-gray-400 text-gray-600'
                      } ${selectedDays.includes(day) && !timing.days.includes(day) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {day.slice(0, 2)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`morningStart_${index}`} className="block text-docsoGreen font-semibold mb-2">Session 1 Start time</label>
                  <input
                    type="time"
                    id={`morningStart_${index}`}
                    name="morningStart"
                    value={timing.morningStart}
                    onChange={(e) => handleTimingChange(index, e)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-middleGreen"
                    required
                  />
                  {errors[index]?.morning && <p className="text-red-500 text-sm">{errors[index].morning}</p>}
                  {errors[index]?.morningStart && <p className="text-red-500 text-sm">{errors[index].morningStart}</p>}
                </div>

                <div>
                  <label htmlFor={`morningEnd_${index}`} className="block text-docsoGreen font-semibold mb-2">Sesson 1 End time</label>
                  <input
                    type="time"
                    id={`morningEnd_${index}`}
                    name="morningEnd"
                    value={timing.morningEnd}
                    onChange={(e) => handleTimingChange(index, e)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-middleGreen"
                    required
                  />
                  {errors[index]?.morning && <p className="text-red-500 text-sm">{errors[index].morning}</p>}
                  {errors[index]?.morningEnd && <p className="text-red-500 text-sm">{errors[index].morningEnd}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={`afternoonStart_${index}`} className="block text-docsoGreen font-semibold mb-2">Sesson 2 Start time</label>
                  <input
                    type="time"
                    id={`afternoonStart_${index}`}
                    name="afternoonStart"
                    value={timing.afternoonStart}
                    onChange={(e) => handleTimingChange(index, e)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-middleGreen"
                    required
                  />
                    {errors[index]?.afternoonStart && <p className="text-red-500 text-sm">{errors[index].afternoonStart}</p>}
                </div>

                <div>
                  <label htmlFor={`afternoonEnd_${index}`} className="block text-docsoGreen font-semibold mb-2">Sesson 2 End time</label>
                  <input
                    type="time"
                    id={`afternoonEnd_${index}`}
                    name="afternoonEnd"
                    value={timing.afternoonEnd}
                    onChange={(e) => handleTimingChange(index, e)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-middleGreen"
                    required
                  />
                  {errors[index]?.afternoon && <p className="text-red-500 text-sm">{errors[index].afternoon}</p>}
                  {errors[index]?.afternoonEnd && <p className="text-red-500 text-sm">{errors[index].afternoonEnd}</p>}
                  
                </div>
              </div>

              
            </div>

            <button
              type="button"
              onClick={() => handleRemoveTimingSlot(index)}
              className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Remove
            </button>
          </div>
        ))}

      <div>
        <button
            type="button"
            onClick={handleAddTimingSlot}
            className="py-3 px-6 bg-docsoGreen text-white font-semibold rounded-lg hover:bg-middleGreen focus:outline-none focus:ring-2 focus:ring-middleGreen"
          >
            Add Timing Slot
          </button>
          {errors.selectedDays && <p className="text-red-500 mt-2">{errors.selectedDays}</p>}
        </div> 

</div>


<div className='mt-4'>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
           Add Appointment procedure
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Add Appointment procedure "
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2`}
          />
        </div>


        <div className="flex mt-8 ">
        <div className="mt-6 flex justify-between w-full max-w-full mx-auto">
          <button
            type="button"
            onClick={handlePrev}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition duration-300"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="bg-docsoGreen text-white px-6 py-2 rounded-md hover:bg-middleGreen transition duration-300"

          >
            Next
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Step7;
