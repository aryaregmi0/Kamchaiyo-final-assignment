import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useDeleteJobMutation } from "@/api/jobApi";
import { toast } from "sonner";
import { format } from 'date-fns';

const JobsTable = ({ jobs }) => {
    const [deleteJob, { isLoading }] = useDeleteJobMutation();

    const handleDelete = async (id) => {
        try {
            await deleteJob(id).unwrap();
            toast.success("Job deleted successfully");
        } catch (err)  {
            toast.error(err.data?.message || "Failed to delete job");
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Job Type</TableHead>
                    <TableHead>Posted On</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {jobs.map((job) => (
                    <TableRow key={job._id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <img src={job.company.logo || '/placeholder-logo.png'} alt={job.company.name} className="h-6 w-6 rounded-full object-cover" />
                                {job.company.name}
                            </div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{job.jobType}</Badge></TableCell>
                        <TableCell>{format(new Date(job.createdAt), 'MMM d, yyyy')}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default JobsTable;