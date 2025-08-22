import express from "express";
import { sendMessage, getHistory } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getHistory);

export default router;
