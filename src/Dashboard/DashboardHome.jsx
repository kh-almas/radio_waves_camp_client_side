import React from 'react';

const DashboardHome = () => {
    return (
            <div className="bg-light-bg dark:bg-dark-bg min-h-screen flex flex-col text-light-text dark:text-dark-text">
                <header className="bg-light-header dark:bg-dark-header shadow">
                    <div className="container mx-auto">
                        <h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>
                    </div>
                </header>

                <main className="flex-grow container mx-auto py-8 px-4">
                    <div className="bg-light-card dark:bg-dark-card rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
                        <p>
                            Welcome to your dashboard! Here are a few steps to help you get started:
                        </p>

                        <ol className="list-decimal list-inside mt-4">
                            <li className="mb-2">Step 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                            <li className="mb-2">Step 2: Aliquam erat volutpat. Aenean tristique lectus vel justo malesuada ultrices.</li>
                            <li className="mb-2">Step 3: Nunc vitae orci pulvinar, faucibus erat nec, tristique sapien.</li>
                            <li className="mb-2">Step 4: Donec convallis augue vitae velit tempor, id dignissim orci condimentum.</li>
                        </ol>
                    </div>
                </main>

                <footer className="bg-light-footer dark:bg-dark-footer py-4 px-4">
                    <div className="container mx-auto text-center">
                        <p className="text-gray-600">© 2023 Your Company. All rights reserved.</p>
                    </div>
                </footer>
            </div>
    );
};

export default DashboardHome;