import ApplicationCard from "./ApplicationCard";

function ApplicationList({ applications, onStatusChange }) {
  if (applications.length === 0) {
    return <p>No applications yet.</p>;
  }

  return (
    <div>
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default ApplicationList;