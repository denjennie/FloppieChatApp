import {
  addMessage,
  getAllMessage,
} from "../controllers/messagesController.js";
import { Router } from "express";
const router = Router();

router.post("/addmsg/", addMessage);
router.get("/getmsg/", getAllMessage);

export default router;
