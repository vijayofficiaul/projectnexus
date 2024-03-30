// AdminLoginComponent.jsx

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AdminLoginForm from './AdminLoginForm';

const AdminLoginComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  // Function to handle login
  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, hardcoding credentials
    const username = 'admin';
    const password = 'adminpassword';

    // Check if credentials match
    if (username === 'admin' && password === 'adminpassword') {
      setIsLoggedIn(true);
      // Redirect to the FileListComponent upon successful login
      history.push('/files');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, Admin! You are now logged in.</p>
      ) : (
        <div>
          <h2>Admin Login</h2>
          <AdminLoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default AdminLoginComponent;
