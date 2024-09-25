import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DoctorCard from '../components/DoctorCard';
import HospitalCard from '../components/HospitalCard';
import Navbar from '../components/Navbar';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState({ doctors: [], hospitals: [] });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/search`, {
            params: { query }
          });
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [query]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    <>
    <Navbar showSearch={true} showOther={true} />
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Search Results for "{query}"</h1>
      <div>
      {searchResults.doctors.length > 0 && (
           
         <h2 className="text-2xl font-semibold mt-8 mb-2">Doctors</h2>
     )
           }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.doctors.length > 0 && (
            searchResults.doctors.map(doctor => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) }
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-2">Hospitals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.hospitals.length > 0 && (
            searchResults.hospitals.map(hospital => (
              <HospitalCard key={hospital._id} hospital={hospital} />
            ))
          ) }
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchResults;
