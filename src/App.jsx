import { useLocalStorage } from "./hooks/useLocalStorage";
import { useState } from "react";
import "./App.css";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";

function App() {
  const [applications, setApplications] = useLocalStorage("applications", []);

  function addApplication(newApp) {
    setApplications([...applications, newApp]);
  }

  function updateStatus(id, newStatus) {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  }

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <ApplicationForm onAdd={addApplication} />
      <ApplicationList
        applications={applications}
        onStatusChange={updateStatus}
      />
    </div>
  );
}

export default App;