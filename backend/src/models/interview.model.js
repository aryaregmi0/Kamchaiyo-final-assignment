import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
    }
}, { timestamps: true });

export const Interview = mongoose.model("Interview", interviewSchema);