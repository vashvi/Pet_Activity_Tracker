import { useEffect, useState } from "react";
import { getSummary } from "../api";
import ProgressRing from "./ProgressRing";

export default function Summary({ petName, refreshKey }) {
  const [summary, setSummary] = useState({ walks: 0, meals: 0, meds: 0 });

  useEffect(() => {
    if (!petName) return;
    getSummary(petName)
      .then((data) => setSummary(data))
      .catch((err) => console.error("Failed to fetch summary:", err));
  }, [petName, refreshKey]); // refreshKey ensures update after logging

  return (
    <div className="p-3">
      <h2 className="text-xl font-bold">Today’s Summary for {petName}</h2>
      <p>Walk time: {summary.walks} mins</p>
      <p>Meals: {summary.meals}</p>
      <p>Medications: {summary.meds}</p>

      <div className="flex gap-4 mt-4">
        <ProgressRing value={summary.walks} max={60} label="Walk" />
        <ProgressRing value={summary.meals} max={3} label="Meals" />
        <ProgressRing value={summary.meds} max={2} label="Meds" />
      </div>
    </div>
  );
}
