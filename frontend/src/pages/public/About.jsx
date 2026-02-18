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
                    <h1 className="text-4xl font-bold tracking-tight md:text-6xl">About KamChaiyo</h1>
                    {/* <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-muted-foreground">
                        Connecting Nepal's talent with global opportunities. Our name, "KamChaiyo," means "Work is Needed"—a simple phrase that drives our mission.
                    </p> */}
                </motion.div>

                {/* Our Mission Section */}
                <motion.div 
                    className="grid items-center grid-cols-1 gap-12 mt-16 md:grid-cols-2"
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
                className="w-full max-w-md"
                style={{ width: '100%', maxWidth: '400px' }} 
            />
                    </div>
                </motion.div>

                <div className="mt-20">
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
                        </div>
                    </div>
                </div>

                <div className="p-10 mt-20 text-center rounded-lg bg-muted">
                    <h2 className="text-3xl font-bold">Join Our Community</h2>
                    <p className="max-w-xl mx-auto mt-2 text-muted-foreground">Ready to take the next step in your career or find your next great hire? Join KamChaiyo today.</p>
                    <Button asChild size="lg" className="mt-6">
                        <Link to="/register">Get Started Now</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default About;