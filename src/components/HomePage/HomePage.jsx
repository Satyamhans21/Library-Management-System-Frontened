import React, { useState, useEffect } from 'react';
import api from '../../axios';  // Correcting the import path
import axios from 'axios';


const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`, // Add the Bearer token
          'Content-Type': 'application/json', // Optional, depends on your API
        };
        
        const response = await axios.get('http://127.0.0.1:8080/books', { headers ,withCredentials: true});
        setData(response.data); // Update state with the data
      } catch (err) {
        console.error(err);
        setError('Failed to fetch data'); // Set an error message
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      {error && <p>{error}</p>}
      gdfg
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
