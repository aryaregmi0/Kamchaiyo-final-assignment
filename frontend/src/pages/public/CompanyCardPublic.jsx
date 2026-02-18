
<<<<<<< HEAD

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const CompanyCardPublic = ({ company }) => {
    return (
        <Card className="flex flex-col text-center items-center p-6 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="p-0">
                <img src={company.logo || '/placeholder.gif'} alt={company.name} className="h-24 w-24 rounded-full object-cover border-4 border-background ring-2 ring-primary/20" />
            </CardHeader>
            <CardContent className="flex-grow space-y-2 mt-4">
                <h3 className="text-xl font-bold">{company.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4" /> {company.location || 'Global'}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-3 pt-2">
=======
const CompanyCardPublic = ({ company }) => {
    return (
        <Card className="flex flex-col items-center p-6 text-center transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="p-0">
                <img src={company.logo || '/placeholder.gif'} alt={company.name} className="object-cover w-24 h-24 border-4 rounded-full border-background ring-2 ring-primary/20" />
            </CardHeader>
            <CardContent className="flex-grow mt-4 space-y-2">
                <h3 className="text-xl font-bold">{company.name}</h3>
                <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {company.location || 'Global'}
                </p>
                <p className="pt-2 text-sm text-muted-foreground line-clamp-3">
>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
                    {company.description || "A great place to work."}
                </p>
            </CardContent>
            <CardFooter className="p-0 mt-4">
                <Button asChild variant="secondary" className="w-full">
                    <Link to={`/companies/${company._id}`}>View Profile & Jobs</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

<<<<<<< HEAD
export default CompanyCardPublic;
=======
export default CompanyCardPublic;
>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
