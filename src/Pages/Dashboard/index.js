import React, { useEffect } from 'react'
import { SEO } from 'Utils';
import { Link } from 'react-router-dom';


function Dashboard() {
  
  useEffect(() => {
    SEO.changeDocumentTitle('Dashboard');
  });

  return (
    <div>
      <p>Dashboard</p>
      <Link to="/login">Login</Link>
    </div>
  )
}

export default Dashboard;
