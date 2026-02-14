import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatbotSetting } from "../models/chatbotSetting.model.js";

