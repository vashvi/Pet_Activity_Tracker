import { useState, useEffect, useRef } from "react";
import { sendChat, getChatHistory } from "../api";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    (async () => {
      const history = await getChatHistory();
      setMessages(history);
    })();
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const data = await sendChat(input); // sends to backend
      setMessages(data.history);           // update messages with backend history
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col h-80">
      <h2 className="text-lg font-bold mb-2">💬 Pet ChatBot</h2>
      <div className="flex-1 overflow-y-auto border p-2 rounded-lg space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[80%] ${
              m.role === "user" ? "bg-teal-100 ml-auto text-right" : "bg-gray-100 mr-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex mt-2">
        <input
          className="flex-1 border rounded-l-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about walks, meals, meds..."
        />
        <button className="bg-teal-600 text-white px-4 rounded-r-lg hover:bg-teal-700">
          Send
        </button>
      </form>
    </div>
  );
}
