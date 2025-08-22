import { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import Summary from "../components/Summary";
import ChatBot from "../components/ChatBot";

export default function Home() {
  const [petName, setPetName] = useState("Your Pet");
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-teal-600 mb-4">🐾 Pet Activity Tracker</h1>

      <input
        type="text"
        placeholder="Enter pet name"
        value={petName}
        onChange={(e) => setPetName(e.target.value)}
        className="w-full border rounded-lg p-2 mb-4"
      />

      <ActivityForm petName={petName} onLogged={() => setRefreshKey((k) => k + 1)} />

      <Summary petName={petName} refreshKey={refreshKey} />

      <ChatBot />
    </div>
  );
}
