// import React, { useState } from 'react';
// // import './HospitalProfile.css';

// const HospitalProfile = ({ hospital, onUpdate }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState(hospital);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({
//       ...editData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onUpdate(editData);
//     setIsEditing(false);
//   };

//   return (
//     <div className="hospital-profile">
//       <h2>{isEditing ? 'Edit Hospital Profile' : hospital.hospitalName}</h2>
//       {isEditing ? (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="hospitalName"
//             value={hospital.hospitalName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="category"
//             value={hospital.category}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="specialization"
//             value={editData.specialization}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="services"
//             value={editData.services}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="description"
//             value={editData.description}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="city"
//             value={editData.city}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="state"
//             value={editData.state}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="locality"
//             value={editData.locality}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="totalBeds"
//             value={editData.totalBeds}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="availableBeds"
//             value={editData.availableBeds}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="totalDoctorStaff"
//             value={editData.totalDoctorStaff}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             name="nursingStaff"
//             value={editData.nursingStaff}
//             onChange={handleChange}
//             required
//           />
//           <label>
//             Insurance Claim Available:
//             <input
//               type="radio"
//               name="insuranceClaim"
//               value="yes"
//               checked={editData.insuranceClaim === 'yes'}
//               onChange={handleChange}
//               required
//             /> Yes
//             <input
//               type="radio"
//               name="insuranceClaim"
//               value="no"
//               checked={editData.insuranceClaim === 'no'}
//               onChange={handleChange}
//               required
//             /> No
//           </label>
//           <input
//             type="text"
//             name="contactDetails"
//             value={editData.contactDetails}
//             onChange={handleChange}
//             required
//           />
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
//         </form>
//       ) : (
//         <>
//           <p><strong>Category:</strong> {hospital.category}</p>
//           <p><strong>Specialization:</strong> {hospital.specialization}</p>
//           <p><strong>Services:</strong> {hospital.services}</p>
//           <p><strong>Description:</strong> {hospital.description}</p>
//           <p><strong>City:</strong> {hospital.city}</p>
//           <p><strong>State:</strong> {hospital.state}</p>
//           <p><strong>Locality:</strong> {hospital.locality}</p>
//           <p><strong>Total Beds:</strong> {hospital.totalBeds}</p>
//           <p><strong>Available Beds:</strong> {hospital.availableBeds}</p>
//           <p><strong>Total Doctor Staff:</strong> {hospital.totalDoctorStaff}</p>
//           <p><strong>Nursing Staff:</strong> {hospital.nursingStaff}</p>
//           <p><strong>Insurance Claim Available:</strong> {hospital.insuranceClaim ? 'Yes' : 'No'}</p>
//           <p><strong>Contact Details:</strong> {hospital.contactDetails}</p>
//           <div className="hospital-profile-timings">
//             <p><strong>Timings:</strong></p>
//             {hospital.timings.map((slot, index) => (
//               <p key={index}>{slot.day}: {slot.startTime} - {slot.endTime}</p>
//             ))}
//           </div>
//           <button onClick={() => setIsEditing(true)}>Edit Profile</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default HospitalProfile;
