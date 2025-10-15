import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="text-5xl font-bold mb-4 text-teal-300">404</h1>
            <p className="text-lg mb-6 text-gray-300">
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <Link
                to="/"
                className="px-6 py-2 bg-teal-700 hover:bg-teal-600 rounded-lg text-white transition-colors"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
