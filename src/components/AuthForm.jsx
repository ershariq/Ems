import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const AuthForm = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <>
      {showLogin ? (
        <Login toggleForm={toggleForm} onLogin={onLogin} />
      ) : (
        <SignUp toggleForm={toggleForm} />
      )}
    </>
  );
};

export default AuthForm;
