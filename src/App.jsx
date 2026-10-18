import { useState } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";

function App() {
  const [applications, setApplications] = useLocalStorage("applications", []);
  const [editingId, setEditingId] = useState(null); // which card is being edited

  // Find the application being edited (or null)
  const editingApp = applications.find((a) => a.id === editingId) || null;

  // Handles both "add new" and "save changes"
  function saveApplication(saved) {
    if (editingId) {
      setApplications(
        applications.map((a) => (a.id === saved.id ? saved : a))
      );
      setEditingId(null);
    } else {
      setApplications([...applications, saved]);
    }
  }

  function updateStatus(id, newStatus) {
    setApplications(
      applications.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  }

  function deleteApplication(id) {
    if (!window.confirm("Delete this application?")) return;
    setApplications(applications.filter((a) => a.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function startEdit(id) {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <ApplicationForm
        key={editingId || "new"}
        onSave={saveApplication}
        editingApp={editingApp}
        onCancel={() => setEditingId(null)}
      />
      <ApplicationList
        applications={applications}
        onStatusChange={updateStatus}
        onEdit={startEdit}
        onDelete={deleteApplication}
      />
    </div>
  );
}

export default App;