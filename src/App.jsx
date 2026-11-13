import {useState,useEffect} from 'react';
import Navbar from './components/navbar';
import Dashboard from './components/Dashboard';
import './App.css';
import ApplicationForm from './components/ApplicationForm';
function App(){
  const [applications, setApplications] = useState(()=>{
    const savedApplications = localStorage.getItem('applications');
    return savedApplications ? JSON.parse(savedApplications) : [];
  });
  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);
  function handleAddApplication(newApplication) {
    setApplications([...applications, newApplication]);
  }
  function handleDeleteApplication(id) {
    const updatedApplications = applications.filter((app) => app.id !== id);
    setApplications(updatedApplications);
  }
 function handleEditApplication(updatedApplication) {
    setApplications((previousApplications) =>
        previousApplications.map((app) =>
            app.id === updatedApplication.id
                ? updatedApplication
                : app
        )
    );
}
  return(
    <div>
      <Navbar />
      <Dashboard applications={applications} onDeleteApplication={handleDeleteApplication} onEditApplication={handleEditApplication} />
      <ApplicationForm onAddApplication={handleAddApplication} />
    </div>
  )
}
export default App;