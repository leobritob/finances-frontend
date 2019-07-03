import React, { useEffect } from 'react';
import { SEO } from 'Utils';
import { Link } from 'react-router-dom';

function Login() {

  useEffect(() => {
    SEO.changeDocumentTitle('Login');
  });

  return (
    <div>
      <p>Login</p>
      <Link to="/dashboard">Dashboard</Link>

    </div>
  )
}

export default Login;
