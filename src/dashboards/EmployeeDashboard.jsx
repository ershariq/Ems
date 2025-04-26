import React from 'react';

const EmployeeDashboard = ({onLogout}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen">
        <div className="p-4 text-2xl font-bold">🎯 Employee Dashboard</div>
        <nav className="mt-6 space-y-2">
          {["Dashboard", "UI Elements", "Charts", "Tabs & Panels", "Responsive Tables", "Forms", "Multi-Level Dropdown", "Empty Page"].map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${index === 0 && "bg-gray-800"}`}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

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
            <span>👤 Username</span> */}
            <span onClick={onLogout} className='absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded cursor-pointer hover:bg-red-700 text-sm font-semibold'>Logout</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card color="bg-red-500" label="REVENUE" value="84,198" />
          <Card color="bg-yellow-500" label="SALES" value="36,540" />
          <Card color="bg-blue-500" label="PRODUCTS" value="24,225" />
          <Card color="bg-green-500" label="VISITS" value="88,658" />
        </div>

        {/* Lower Grid */}
        <div className="grid grid-cols-3 gap-4">
          <ProgressCard label="PROFIT" percent={82} color="blue" />
          <ProgressCard label="NO. OF VISITS" percent={46} color="red" />
          <DonutChart title="Users" value={30} />
          <ProgressCard label="CUSTOMERS" percent={84} color="green" />
          <ProgressCard label="SALES" percent={55} color="yellow" />
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
        <span className="text-lg font-bold">Users<br />{value}</span>
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-2">DONUT CHART EXAMPLE</p>
  </div>
);

export default EmployeeDashboard;
