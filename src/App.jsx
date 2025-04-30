import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

function App({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');
    setIsLoggedIn(loggedIn);
    setUserRole(role || '');
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
  };

  return (
    <Routes>
      <Route path="/" element={isLoggedIn && userRole === 'employee' ? <EmployeeDashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/admin" element={isLoggedIn && userRole === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
      <Route path="/login" element={<AuthForm onLogin={handleLogin} />} />
      <Route path="/signup" element={<AuthForm onLogin={handleLogin} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
