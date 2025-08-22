import store from "../data/memoryStore.js";

// --- Chatbot ---
export const sendMessage = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message required" });

  // Save user message
  const userMsg = { role: "user", text: message, time: new Date().toISOString() };
  store.addChat(userMsg);

  // Very simple rule-based bot
  let reply = "I’m not sure I understand 🤔";
  const lower = message.toLowerCase();

  if (lower.includes("walk")) reply = "Remember to take Rex for a walk today! 🐕";
  else if (lower.includes("meal")) reply = "Meals logged so far today are tasty 😋";
  else if (lower.includes("med")) reply = "Don’t forget medication on schedule 💊";
  else if (lower.includes("hello") || lower.includes("hi")) reply = "Hi there 👋 How’s your pet doing?";
  else if (lower.includes("how many")) {
    const today = new Date().toISOString().slice(0, 10);
    const meals = store.getActivities().filter(
      (a) => a.activity === "meal" && a.date.startsWith(today)
    ).length;
    reply = `So far, ${meals} meals logged today 🍲`;
  }

  const botMsg = { role: "bot", text: reply, time: new Date().toISOString() };
  store.addChat(botMsg);

  res.json({ reply, history: store.getChats() });
};

export const getHistory = (req, res) => {
  res.json(store.getChats());
};

// --- Activities ---
export const logActivity = (req, res) => {
  const { petName, activity, amount, date } = req.body;
  if (!petName || !activity || !amount || !date) {
    return res.status(400).json({ error: "All fields required" });
  }

  const newActivity = {
    id: Date.now(),
    petName: petName.trim(),
    activity,
    amount: Number(amount),
    date,
  };

  store.addActivity(newActivity);
  res.json(newActivity);
};

export const getSummary = (req, res) => {
  const { petName } = req.query;
  if (!petName) {
    return res.status(400).json({ error: "petName query required" });
  }

  const today = new Date().toISOString().slice(0, 10);

  const todayActivities = store.getActivities().filter(
    (a) =>
      a.petName.toLowerCase() === petName.toLowerCase() &&
      a.date.startsWith(today)
  );

  const summary = {
    petName,
    walks: todayActivities
      .filter((a) => a.activity === "walk")
      .reduce((sum, a) => sum + a.amount, 0),
    meals: todayActivities.filter((a) => a.activity === "meal").length,
    meds: todayActivities.filter((a) => a.activity === "medication").length,
  };

  res.json(summary);
};
