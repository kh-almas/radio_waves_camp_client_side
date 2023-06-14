import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className={`dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900 py-6 px-4 sm:px-6 lg:px-8`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center  items-center">
                        <div className="mt-4 text-center text-gray-500 dark:text-gray-200">
                            &copy; {new Date().getFullYear()} RadioWavesCamp. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;