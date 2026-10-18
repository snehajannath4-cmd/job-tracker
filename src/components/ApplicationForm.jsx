import { useState } from "react";
import { STATUSES, emptyForm } from "../constants";

function ApplicationForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newApp = {
      ...form,
      id: Date.now(),
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
    };

    onAdd(newApp); // hand the new application to the boss (App)
    setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="company"
        placeholder="Company name"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
        required
      />
      <input
        name="salary"
        placeholder="Salary (e.g. 4 LPA)"
        value={form.salary}
        onChange={handleChange}
      />
      <input
        name="skills"
        placeholder="Skills needed (comma separated)"
        value={form.skills}
        onChange={handleChange}
      />
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
      <button type="submit">Add application</button>
    </form>
  );
}

export default ApplicationForm;