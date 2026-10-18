import { STATUSES } from "../constants";

function ApplicationCard({ app, onStatusChange }) {
  return (
    <div className="card">
      <h3>{app.company}</h3>
      <p>{app.role}</p>
      {app.salary && <p>Salary: {app.salary}</p>}
      {app.date && <p>Applied on: {app.date}</p>}

      <div className="skills">
        {app.skills.map((skill) => (
          <span className="skill" key={skill}>
            {skill}
          </span>
        ))}
      </div>

      {app.notes && <p className="notes">{app.notes}</p>}

      <select
        value={app.status}
        onChange={(e) => onStatusChange(app.id, e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ApplicationCard;