#🐾 Pet Activity Tracker

###Stack:

Frontend: React (Vite) with TailwindCSS for responsive UI.

Backend: Node.js + Express with in-memory data store (no database).

API: REST endpoints for activities, summaries, and chatbot interactions.


###Features:

Log pet activities: walk, meal, medication.

View daily summary with progress rings.

Interactive chatbot providing real-time updates and reminders.


###Run Steps:

1. Backend:

cd backend
npm install
node index.js

Runs at http://localhost:4000.


2. Frontend:

cd frontend
npm install
npm run dev

Open the displayed URL (e.g., http://localhost:5173).



###Trade-offs:

In-memory storage: Simple and fast for development, but data is lost on server restart.

No authentication: Easy to use, but multi-user support is limited.

Simple chatbot: Rule-based for quick interactions; not AI-powered.


This setup prioritizes speed and simplicity for local tracking and testing.
