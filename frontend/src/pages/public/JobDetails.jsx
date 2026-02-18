import { useGetPublicJobByIdQuery } from "@/api/jobApi"; // This one is correct
import { useApplyForJobMutation } from "@/api/applicationApi"; // CORRECTED: Import from applicationApi
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/slices/userSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Briefcase, CheckCircle } from "lucide-react";

const JobDetails = () => {
    const { jobId } = useParams();
    const { data: job, isLoading, isError, refetch } = useGetPublicJobByIdQuery(jobId);
    const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation(); 
    
    const user = useSelector(selectCurrentUser);

    const hasApplied = job?.applications?.some(app => app.applicant === user?._id);

    const handleApply = async () => {
        try {
            await applyForJob(jobId).unwrap();
            toast.success("Successfully applied for the job!");
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || "Failed to apply for the job.");
        }
    };

    if (isLoading) return <div className="flex items-center justify-center h-screen"><Loader2 className="w-12 h-12 animate-spin" /></div>;
    if (isError || !job) return <p className="py-10 text-center text-destructive">Job not found.</p>;

    const renderApplyButton = () => {
        if (!user) {
            return <Button asChild><Link to="/login">Login to Apply</Link></Button>;
        }
        if (user.role !== 'student') {
            return <Button disabled>Only JobSeekers Can Apply</Button>;
        }
        if (hasApplied) {
            return <Button disabled variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-4 h-4 mr-2" /> Applied</Button>;
        }
        return (
            <Button onClick={handleApply} disabled={isApplying}>
                {isApplying && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Apply Now
            </Button>
        );
    };

    return (
        <div className="container max-w-4xl py-10 mx-auto">
            <div className="flex flex-col gap-8 md:flex-row">
                <div className="w-full">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{job.title}</h1>
                            <p className="text-lg text-muted-foreground">{job.company.name}</p>
                        </div>
                        <img src={job.company.logo || '/placeholder-logo.png'} alt={job.company.name} className="hidden object-cover w-16 h-16 rounded-lg md:block" />
                    </div>
                    <div className="flex flex-wrap mt-6 text-sm gap-x-6 gap-y-2 text-muted-foreground">
                        <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</div>
                        <div className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {job.jobType}</div>
                        <div className="flex items-center gap-2">Rs. {job.salary.toLocaleString()} LPA</div>
                    </div>
                    <div className="mt-8 prose-sm text-gray-700 md:prose max-w-none">
                        <h3 className="text-lg font-semibold text-gray-900">Job Description</h3>
                        <p className="whitespace-pre-wrap">{job.description}</p>
                        <h3 className="mt-6 text-lg font-semibold text-gray-900">Requirements</h3>
                        <ul className="pl-5 space-y-1 list-disc">
                            {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
             <div className="pt-6 mt-8 text-center border-t">
                {renderApplyButton()}
            </div>
        </div>
    );
};

export default JobDetails;