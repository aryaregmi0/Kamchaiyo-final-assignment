import { Router } from "express";
import { verifyJWT, isRecruiter } from "../middleware/auth.middleware.js";
import { scheduleInterview, getMyInterviews } from "../controllers/interview.controller.js";

const router = Router();


router.route("/my-interviews").get(getMyInterviews);

export default router;