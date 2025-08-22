import store from "../data/memoryStore.js";

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

  // ✅ use addActivity
  store.addActivity(newActivity);
  res.json(newActivity);
};

export const getSummary = (req, res) => {
  const { petName } = req.query;
  if (!petName) {
    return res.status(400).json({ error: "petName query required" });
  }

  const today = new Date().toISOString().slice(0, 10);

  // ✅ use getActivities
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
