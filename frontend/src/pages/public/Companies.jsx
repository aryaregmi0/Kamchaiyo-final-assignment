import { useGetPublicCompaniesQuery } from "@/api/companyApi";
import { Loader2 } from "lucide-react";
import CompanyCardPublic from "@/pages/public/CompanyCardPublic";

const CompaniesPublic = () => {
    const { data: companies, isLoading, isError } = useGetPublicCompaniesQuery();

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            );
        }

        if (isError) {
            return (
                <p className="py-20 text-center text-destructive">
                    Failed to load companies. Please try again later.
                </p>
            );
        }

        if (!companies || companies.length === 0) {
            return (
                <div className="py-20 text-center">
                    <h3 className="text-xl font-semibold">No Companies Available</h3>
                    <p className="mt-2 text-muted-foreground">
                        Check back later to see a list of our partner companies.
                    </p>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {companies.map((company) => (
                    <CompanyCardPublic key={company._id} company={company} />
                ))}
            </div>
        );
    };

    return (
        <div className="container py-10 mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight">
                    Explore Our Partner Companies
                </h1>
                <p className="max-w-2xl mx-auto mt-2 text-muted-foreground">
                    Discover great places to work and find jobs directly from top-tier
                    companies verified by our platform.
                </p>
            </div>

            {renderContent()}
        </div>
    );
};

export default CompaniesPublic;
