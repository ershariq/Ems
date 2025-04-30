import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const AdminDashboard = ({ onLogout }) => {
    const [task, setTask] = useState({
        emp_name: "",
        task_name: "",
        project_name: "",
        deadline: "",
        status: "",
    });

    const [assignedTasks, setAssignedTasks] = useState([]); // 🔥 ARRAY of tasks

    const [editingIndex, setEditingIndex] = useState(null); // 🔥 Which task is being edited

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingIndex !== null) {
            // 🔥 If editing, update the task
            const updatedTasks = [...assignedTasks];
            updatedTasks[editingIndex] = task;
            setAssignedTasks(updatedTasks);
            setEditingIndex(null);
        } else {
            // 🔥 Otherwise, add new task
            setAssignedTasks([...assignedTasks, task]);
        }

        setTask({
            emp_name: "",
            task_name: "",
            project_name: "",
            deadline: "",
            status: "",
        });
    };

    const handleEdit = (index) => {
        setTask(assignedTasks[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedTasks = assignedTasks.filter((_, idx) => idx !== index);
        setAssignedTasks(updatedTasks);
    };

    useEffect(() => {
        const savedTasks = localStorage.getItem("assignedTasks");
        if (savedTasks) {
          setAssignedTasks(JSON.parse(savedTasks));
        }
      }, []);

    useEffect(() => {
        localStorage.setItem("assignedTasks", JSON.stringify(assignedTasks));
      }, [assignedTasks]);

    //   for Sidebar 
      const admin = (localStorage.getItem("role"));

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar admin = {admin}/>

            <main className="flex-1 p-6 space-y-6">
                <h1 className="text-2xl font-semibold mb-4">Employee Overview</h1>

                {/* Table Section */}
                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Project</th>
                                <th className="px-4 py-3">Task</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            {assignedTasks.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">No tasks assigned yet</td>
                                </tr>
                            ) : (
                                assignedTasks.map((item, index) => (
                                    <tr className="border-t" key={index}>
                                        <td className="px-4 py-3">{item.emp_name}</td>
                                        <td className="px-4 py-3">{item.project_name}</td>
                                        <td className="px-4 py-3">{item.task_name}</td>
                                        <td className="px-4 py-3 text-yellow-600">{item.status}</td>
                                        <td className="px-4 py-3 space-x-2">
                                            <button 
                                                className="text-blue-600 hover:underline" 
                                                onClick={() => handleEdit(index)}>
                                                Edit
                                            </button>
                                            <button 
                                                className="text-red-600 hover:underline" 
                                                onClick={() => handleDelete(index)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Form Section */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">{editingIndex !== null ? "Edit Task" : "Assign Task"}</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            type="text"
                            name="emp_name"
                            value={task.emp_name}
                            onChange={handleChange} 
                            required
                            placeholder="Employee Name" 
                            className="p-2 border rounded" 
                        />
                        <input 
                            type="text" 
                            name="task_name"
                            value={task.task_name}
                            onChange={handleChange}
                            required
                            placeholder="Task Name" 
                            className="p-2 border rounded" 
                        />
                        <input 
                            type="text" 
                            name="project_name"
                            value={task.project_name}
                            onChange={handleChange}
                            required
                            placeholder="Project Name" 
                            className="p-2 border rounded" 
                        />
                        <input 
                            type="date"
                            name="deadline"
                            value={task.deadline}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded" 
                        />
                        <select
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded"
                        >
                            <option value="">Select Status</option>
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <button type="submit" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                            {editingIndex !== null ? "Update Task" : "Assign Task"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
