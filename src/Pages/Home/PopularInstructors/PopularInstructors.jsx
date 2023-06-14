import React from 'react';
import SectionHeader from "../../Shared/SectionHeader/SectionHeader.jsx";

const PopularInstructors = () => {
    return (
        <div className="mb-12 lg:px-12">
            <SectionHeader title="Popular Instructors"></SectionHeader>

            <div className="lg:w-2/3 mx-auto">
                <div className="grid grid-cols-3 gap-2">
                    <div className="card shadow">
                        <div className="card">
                            <div className="card-body items-center text-center">
                                <img src="https://pixlr.com/images/index/remove-bg.webp" alt="profile_img" className="w-20 h-20 rounded-full mr-4"/>
                                <h2 className="font-semibold">MST Nadia</h2>
                                <p>nadia@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularInstructors;