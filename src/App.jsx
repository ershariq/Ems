import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <EmployeeDashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />
      <Route path="/signup" element={<AuthForm onLogin={handleLogin} />} />
    </Routes>
  );
}

export default App;
