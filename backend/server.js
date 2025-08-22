import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let activities = [];  // store activities
let chatHistory = []; // store chat messages

// --- POST activity ---
app.post("/api/activity", (req, res) => {
  const { petName, activity, amount, date } = req.body;
  if (!petName || !activity || !amount || !date)
    return res.status(400).json({ error: "All fields required" });

  const newActivity = { id: Date.now(), petName, activity, amount, date };
  activities.push(newActivity);
  res.json(newActivity);
});

// --- GET today's summary ---
app.get("/api/summary", (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  const todayActivities = activities.filter(a => a.date.startsWith(today));

  const summary = {
    walks: todayActivities
      .filter(a => a.activity === "walk")
      .reduce((sum, a) => sum + Number(a.amount), 0),
    meals: todayActivities.filter(a => a.activity === "meal").length,
    meds: todayActivities.filter(a => a.activity === "medication").length,
  };

  res.json(summary);
});

// --- POST chat message ---
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  // Save user message
  const userMsg = { role: "user", text: message, time: new Date().toISOString() };
  chatHistory.push(userMsg);

  // Generate a reply
  let reply = "🤔 I’m not sure about that.";

  const lower = message.toLowerCase();
  const today = new Date().toISOString().slice(0, 10);
  const todayActivities = activities.filter(a => a.date.startsWith(today));

  if (lower.includes("walk")) {
    const walks = todayActivities
      .filter(a => a.activity === "walk")
      .reduce((sum, a) => sum + Number(a.amount), 0);
    reply = `🐕 You've walked ${walks} minutes today.`;
  } else if (lower.includes("meal")) {
    const meals = todayActivities.filter(a => a.activity === "meal").length;
    reply = `🍽️ ${meals} meals logged today.`;
  } else if (lower.includes("med")) {
    const meds = todayActivities.filter(a => a.activity === "medication").length;
    reply = `💊 ${meds} medications logged today.`;
  } else if (lower.includes("hello") || lower.includes("hi")) {
    reply = "👋 Hi! How is your pet doing today?";
  } else if (lower.includes("how are you")) {
    reply = "😺 I'm just a bot, but I'm excited to track your pet's activities!";
  }

  // Save bot message
  const botMsg = { role: "bot", text: reply, time: new Date().toISOString() };
  chatHistory.push(botMsg);

  res.json({ reply, history: chatHistory });
});

// --- GET chat history ---
app.get("/api/chat", (req, res) => {
  res.json(chatHistory);
});

app.listen(4000, () => console.log("🚀 Backend running at http://localhost:4000"));
