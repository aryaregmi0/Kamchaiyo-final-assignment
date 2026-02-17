import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";




const getJobByIdPublic = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id)
        .populate('company')
        .populate({
            path: 'applications',
            select: 'applicant'
        });

    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    return res.status(200).json(new ApiResponse(200, job, "Job details fetched successfully"));
});

export { postJob, getMyPostedJobs, updateJob, deleteJob,getAllJobsPublic,getJobByIdPublic };