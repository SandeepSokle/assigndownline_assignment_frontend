import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
//   const navigate = useNavigate();
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/signup">Go back to the signup</Link>
    </div>
  );
};

export default NotFound;
