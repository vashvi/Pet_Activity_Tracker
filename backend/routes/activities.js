import express from "express";
import { logActivity, getSummary } from "../controllers/activityController.js";

const router = express.Router();

router.post("/", logActivity); // POST /api/activities
router.get("/summary", getSummary); // GET /api/activities/summary?petName=Rex

export default router;
