import React from 'react'

const Sidebar = ({ user = {}, admin = {},}) => {
  return (
    <>
    {/* Sidebar */}
    <aside className="w-64 bg-gray-900 text-white min-h-screen">
        <div className="p-4 text-2xl font-bold">👤 {user?.username || admin}</div>
        <nav className="mt-6 space-y-2">
          {["Dashboard", "Employee Details", "Assign Tasks", "Projects", "Leave Requests", "Reports", "Settings"].map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${index === 0 && "bg-gray-800"}`}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar