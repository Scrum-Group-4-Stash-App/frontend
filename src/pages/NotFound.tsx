import Button from "@/components/Button";
import { ArrowRight, Home } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center">
            <span className="font-display text-9xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              404
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button className="h-12 px-8 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold gap-2">
            <Link to="/">
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </Button>
          <Button className="h-12 px-8 rounded-lg border-gray-300 font-semibold gap-2 hover:bg-gray-50">
            <a href="javascript:history.back()">
              Go Back
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
