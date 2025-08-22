// backend/data/memoryStore.js

const store = {
  activities: [],
  chats: [],

  // ---- Activities ----
  addActivity(activity) {
    this.activities.push(activity);
    return activity;
  },
  getActivities() {
    return this.activities;
  },
  clearActivities() {
    this.activities = [];
  },

  // ---- Chats ----
  addChat(msg) {
    this.chats.push(msg);
  },
  getChats() {
    return this.chats;
  },
  clearChats() {
    this.chats = [];
  }
};

export default store;
