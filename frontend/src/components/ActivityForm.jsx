import { useState } from "react";
import { logActivity } from "../api";

export default function ActivityForm({ onLogged }) {
  const [form, setForm] = useState({
    petName: "",
    activity: "walk",
    amount: "",
    date: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "amount") value = Number(value) || "";
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.petName || !form.amount) return alert("All fields required!");

    try {
      await logActivity(form); // send data to backend
    } catch (err) {
      console.error("Failed to log activity:", err);
    }

    setForm({
      petName: "",
      activity: "walk",
      amount: "",
      date: new Date().toISOString().slice(0, 16),
    });

    onLogged?.(); // notify Home to refresh summary
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded-lg shadow bg-gray-50">
      <input
        type="text"
        name="petName"
        placeholder="Pet Name"
        value={form.petName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <select
        name="activity"
        value={form.activity}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="walk">Walk</option>
        <option value="meal">Meal</option>
        <option value="medication">Medication</option>
      </select>
      <input
        type="number"
        name="amount"
        placeholder={form.activity === "walk" ? "Duration (mins)" : "Quantity"}
        value={form.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="datetime-local"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600">
        Log Activity
      </button>
    </form>
  );
}
