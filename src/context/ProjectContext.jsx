import React, { createContext } from 'react'
export const DataContext = createContext();

const ProjectContext = ({children}) => {

  const projects = {
    currentProjects: '01',
    completedProjects: '1,200',
    pendingTasks: '05',
    totalEmployees: '20',
    inPercentage: {
      completionRate: 92,
      lateSubmission: 20,
      employeeAttendance: 30,
      projectMilestone: 86
    }
  };


  return (
    <DataContext.Provider value={projects}>
        {children}
    </DataContext.Provider>
  )
}

export default ProjectContext