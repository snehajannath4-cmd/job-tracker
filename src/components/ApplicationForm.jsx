import { useState } from "react";
import { STATUSES, emptyForm } from "../constants";

function ApplicationForm({ onSave, editingApp, onCancel }) {
  // If editing, start with that application's values
  const [form, setForm] = useState(
    editingApp
      ? { ...editingApp, skills: editingApp.skills.join(", ") }
      : emptyForm
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const saved = {
      ...form,
      id: editingApp ? editingApp.id : Date.now(),
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== ""),
    };

    onSave(saved);
    if (!editingApp) setForm(emptyForm);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingApp ? "Edit application" : "Add an application"}</h2>

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

      <div className="form-actions">
        <button type="submit">
          {editingApp ? "Save changes" : "Add application"}
        </button>
        {editingApp && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ApplicationForm;