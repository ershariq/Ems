import React, { useContext } from 'react';
import { DataContext } from '../context/ProjectContext';
import Sidebar from './Sidebar';


const EmployeeDashboard = ({ onLogout }) => {
  const data = useContext(DataContext);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar user = {user}/>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-sm text-gray-500">Home / Dashboard / Data</p>
          </div>
          <div className="flex space-x-4">
            {/* <span>🔔</span>
            <span>⚙️</span>
            <span>🎯 Username</span> */}
            <span onClick={onLogout} className='absolute top-8 right-6 bg-red-500 text-white px-3 py-2 rounded cursor-pointer hover:bg-red-700 text-sm font-semibold'>Logout</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card color="bg-blue-500" label="CURRENT PROJECTS" value={data.currentProjects} />
          <Card color="bg-green-500" label="COMPLETED PROJECTS" value={data.completedProjects} />
          <Card color="bg-yellow-500" label="PENDING TASKS" value={data.pendingTasks} />
          <Card color="bg-red-500" label="TOTAL EMPLOYEES" value={data.totalEmployees} />
        </div>

        {/* Lower Grid */}
        <div className="grid grid-cols-3 gap-4">
          <ProgressCard label="Avg. Task Completion Rate" percent={data.inPercentage.completionRate} color="blue" />
          <ProgressCard label="Late Submissions" percent={data.inPercentage.lateSubmission} color="red" />
          <DonutChart title="Employee Attendance" value={data.inPercentage.employeeAttendance} />
          <ProgressCard label="Project Milestone Completion" percent={data.inPercentage.projectMilestone} color="green" />
          {/* <ProgressCard label="SALES" percent={55} color="yellow" /> */}
        </div>
      </main>
    </div>
  );
};

const Card = ({ label, value, color }) => (
  <div className={`p-4 ${color} text-white rounded shadow`}>
    <h2 className="text-2xl font-bold">{value}</h2>
    <p className="text-sm uppercase tracking-widest">{label}</p>
  </div>
);

const ProgressCard = ({ label, percent, color }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <h3 className="text-sm text-gray-600 mb-2">{label}</h3>
    <div className="relative w-24 h-24 mx-auto">
      <svg className="w-full h-full">
        <circle
          className="text-gray-200"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="36"
          cx="48"
          cy="48"
        />
        <circle
          className={`text-${color}-500`}
          strokeWidth="8"
          strokeDasharray="226"
          strokeDashoffset={226 - (226 * percent) / 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="36"
          cx="48"
          cy="48"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
        {percent}%
      </span>
    </div>
  </div>
);

const DonutChart = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center col-span-1">
    <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
    <div className="flex justify-center items-center h-32">
      <div className="w-24 h-24 bg-gradient-to-tr from-red-500 via-gray-300 to-gray-200 rounded-full flex items-center justify-center">
        <span className="text-lg font-bold">Active <br />{value}</span>
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-2">Currently logged-in employees or system users</p>
  </div>
);

export default EmployeeDashboard;
