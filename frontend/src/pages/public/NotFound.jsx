import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import notFoundAnimation from '@/lottie/error_404.json';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <Lottie 
                animationData={notFoundAnimation} 
                loop={true} 
                style={{ width: '100%', maxWidth: '400px' }} 
            />
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">Page Not Found</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Oops! The page you are looking for does not exist or has been moved.
            </p>
            <Button asChild className="mt-8">
                <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Go Back to Home
                </Link>
            </Button>
        </div>
    );
};

export default NotFound;