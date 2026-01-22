import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import axios from "axios";

export const verifyRecaptcha = asyncHandler(async (req, res, next) => {
    const { recaptchaToken } = req.body;
 if (process.env.NODE_ENV === 'test') {
       return next();
   }
    if (!recaptchaToken) {
        throw new ApiError(400, "reCAPTCHA token is missing.");
    }

    try {
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;

        const { data } = await axios.post(verificationUrl);

        if (!data.success) {
            console.error("reCAPTCHA verification failed with errors:", data['error-codes']);
            throw new ApiError(401, "reCAPTCHA verification failed. Please try again.");
        }
        
        next();

    } catch (error) {
        console.error("Error during reCAPTCHA verification:", error);
        if (error instanceof ApiError) {
            throw error; 
        }
        throw new ApiError(500, "An error occurred during reCAPTCHA verification.");
    }
});