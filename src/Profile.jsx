import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/profile', {
        withCredentials: true,
      });
      setUser(response.data.user);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get('http://localhost:8080/logout', {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Failed to logout');
    } 
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Profile Page</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>User id: {user._id}</p>
          <p>Email: {user.email}</p>

          <button onClick={() => navigate('/form')}>Apply to scholarship</button>
          <br />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
