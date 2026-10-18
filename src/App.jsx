import { useState } from "react";
import "./App.css";

function App() {
  // Box 1: remembers the list of applications
  const [applications, setApplications] = useState([]);

  // Box 2 and 3: remember what you type in the form
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stops the page from refreshing

    const newApp = {
      id: Date.now(), // a unique number for each card
      company: company,
      role: role,
      status: "Applied",
    };

    setApplications([...applications, newApp]); // add the new card to the list
    setCompany(""); // clear the inputs
    setRole("");
  }

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      {applications.length === 0 && <p>No applications yet.</p>}

      {applications.map((app) => (
        <div className="card" key={app.id}>
          <h3>{app.company}</h3>
          <p>{app.role}</p>
          <strong>{app.status}</strong>
        </div>
      ))}
    </div>
  );
}

export default App;