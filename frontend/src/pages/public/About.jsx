<<<<<<< HEAD

import { motion } from 'framer-motion';
import { Users, Briefcase, Building2, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import teamAnimation from '@/lottie/team.json'; 
import Lottie from 'lottie-react';
const About = () => {
    const teamMembers = [
        { name: "John Doe", title: "CEO & Founder", avatar: "/placeholder-avatar.png" },
        { name: "Jane Smith", title: "Head of Product", avatar: "/placeholder-avatar.png" },
        { name: "Peter Jones", title: "Lead Engineer", avatar: "/placeholder-avatar.png" },
    ];

=======
import { motion } from 'framer-motion';
import { Users, Briefcase, Building2, ShieldCheck } from 'lucide-react';
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import teamAnimation from '@/lottie/team.json'; 
import Lottie from 'lottie-react';
const About = () => {
    // const teamMembers = [
    //     { name: "John Doe", title: "CEO & Founder", avatar: "/placeholder-avatar.png" },
    //     { name: "Jane Smith", title: "Head of Product", avatar: "/placeholder-avatar.png" },
    //     { name: "Peter Jones", title: "Lead Engineer", avatar: "/placeholder-avatar.png" },
    // ];

>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
    const featureVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="py-12 md:py-20">
            <div className="container mx-auto">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
<<<<<<< HEAD
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">About KamChaiyo</h1>
                    <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        Connecting Nepal's talent with global opportunities. Our name, "KamChaiyo," means "Work is Needed"—a simple phrase that drives our mission.
                    </p>
=======
                    <h1 className="text-4xl font-bold tracking-tight md:text-6xl">About KamChaiyo</h1>
                    {/* <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
                        Connecting Nepal's talent with global opportunities. Our name, "KamChaiyo," means "Work is Needed"—a simple phrase that drives our mission.
                    </p> */}
>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
                </motion.div>

                {/* Our Mission Section */}
                <motion.div 
<<<<<<< HEAD
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
=======
                    className="grid items-center grid-cols-1 gap-12 mt-16 md:grid-cols-2"
>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={featureVariants}
                >
                    <div className="prose lg:prose-lg text-muted-foreground">
                        <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                        <p>
                            We started KamChaiyo to bridge the gap between skilled professionals in Nepal and the companies that need them. We believe that talent is universal, but opportunity is not. Our platform is designed to make that opportunity accessible to everyone, everywhere.
                        </p>
                        <p>
                            Whether you are a job seeker looking for your dream role or a recruiter searching for the perfect candidate, KamChaiyo provides the tools, insights, and connections you need to succeed.
                        </p>
                    </div>
                    <div className="flex justify-center">
                          <Lottie
                animationData={teamAnimation} 
                loop={true} 
<<<<<<< HEAD
                className="max-w-md w-full"
=======
                className="w-full max-w-md"
>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
                style={{ width: '100%', maxWidth: '400px' }} 
            />
                    </div>
                </motion.div>

                <div className="mt-20">
<<<<<<< HEAD
                    <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center p-6 border rounded-lg bg-card shadow-sm">
                            <Briefcase className="h-10 w-10 mx-auto text-primary mb-4"/>
                            <h3 className="font-semibold text-lg">Job Listings</h3>
                            <p className="text-muted-foreground mt-2 text-sm">Access to thousands of verified job openings from top companies.</p>
                        </div>
                        <div className="text-center p-6 border rounded-lg bg-card shadow-sm">
                            <Users className="h-10 w-10 mx-auto text-primary mb-4"/>
                            <h3 className="font-semibold text-lg">Talent Matching</h3>
                            <p className="text-muted-foreground mt-2 text-sm">Our smart algorithms help connect the right people to the right roles.</p>
                        </div>
                        <div className="text-center p-6 border rounded-lg bg-card shadow-sm">
                            <ShieldCheck className="h-10 w-10 mx-auto text-primary mb-4"/>
                            <h3 className="font-semibold text-lg">Verified Companies</h3>
                            <p className="text-muted-foreground mt-2 text-sm">We verify every company on our platform to ensure safety and quality.</p>
                        </div>
                        <div className="text-center p-6 border rounded-lg bg-card shadow-sm">
                            <Building2 className="h-10 w-10 mx-auto text-primary mb-4"/>
                            <h3 className="font-semibold text-lg">Recruiter Tools</h3>
                            <p className="text-muted-foreground mt-2 text-sm">A full suite of tools for recruiters to manage postings and applicants.</p>
=======
                    <h2 className="mb-12 text-3xl font-bold text-center">What We Do</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="p-6 text-center border rounded-lg shadow-sm bg-card">
                            <Briefcase className="w-10 h-10 mx-auto mb-4 text-primary"/>
                            <h3 className="text-lg font-semibold">Job Listings</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Access to thousands of verified job openings from top companies.</p>
                        </div>
                        <div className="p-6 text-center border rounded-lg shadow-sm bg-card">
                            <Users className="w-10 h-10 mx-auto mb-4 text-primary"/>
                            <h3 className="text-lg font-semibold">Talent Matching</h3>
                            <p className="mt-2 text-sm text-muted-foreground">Our smart algorithms help connect the right people to the right roles.</p>
                        </div>
                        <div className="p-6 text-center border rounded-lg shadow-sm bg-card">
                            <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-primary"/>
                            <h3 className="text-lg font-semibold">Verified Companies</h3>
                            <p className="mt-2 text-sm text-muted-foreground">We verify every company on our platform to ensure safety and quality.</p>
                        </div>
                        <div className="p-6 text-center border rounded-lg shadow-sm bg-card">
                            <Building2 className="w-10 h-10 mx-auto mb-4 text-primary"/>
                            <h3 className="text-lg font-semibold">Recruiter Tools</h3>
                            <p className="mt-2 text-sm text-muted-foreground">A full suite of tools for recruiters to manage postings and applicants.</p>
>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
                        </div>
                    </div>
                </div>

<<<<<<< HEAD
                <div className="mt-20 text-center bg-muted p-10 rounded-lg">
                    <h2 className="text-3xl font-bold">Join Our Community</h2>
                    <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Ready to take the next step in your career or find your next great hire? Join KamChaiyo today.</p>
=======
                <div className="p-10 mt-20 text-center rounded-lg bg-muted">
                    <h2 className="text-3xl font-bold">Join Our Community</h2>
                    <p className="max-w-xl mx-auto mt-2 text-muted-foreground">Ready to take the next step in your career or find your next great hire? Join KamChaiyo today.</p>
>>>>>>> 6c3068b30565e5797566709cc8381f1934320547
                    <Button asChild size="lg" className="mt-6">
                        <Link to="/register">Get Started Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default About;