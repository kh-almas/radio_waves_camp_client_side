import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-gray-600 text-lg mb-8">Page not found</p>
            <a
                href="/"
                className="text-blue-500 hover:text-blue-700 bg-blue-100 px-4 py-2 rounded-md transition-colors duration-300"
            >
                Go back to homepage
            </a>
        </div>
    );
};

export default NotFound;