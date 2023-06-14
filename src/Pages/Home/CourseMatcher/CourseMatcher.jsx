import React from 'react';
import SectionHeader from "../../Shared/SectionHeader/SectionHeader.jsx";

const CourseMatcher = () => {
    return (
        <div>
            <SectionHeader title="Let us know for better results"></SectionHeader>
            <div className="lg:w-2/3 mx-auto mb-12">
                <div className="flex justify-between items-center border border-5 p-12 mb-12">
                    <div>
                        <h4 className="text-xl font-semibold">Want to check which program suits you the best?</h4>
                        <p>Find out with our new <b>"Course Matcher"</b> tool!</p>
                    </div>
                    <div>
                        <button className="btn btn-error text-white">Check your match</button>
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <div className="lg:1/2">
                        <img className="w-full" src="https://images1.content-hci.com/hca-cont/img/closed_cbf.jpg" alt="img"/>
                    </div>
                    <div className="lg:1/2 lg:pl-8">
                        <h4 className="text-xl font-semibold mb-4">Want to study Radio Studies in the UK?</h4>
                        <p className="mb-2">It’s time to find your perfect course! Get personalised study abroad advice from one of our expert counsellors on everything from application to admission.</p>
                        <button className="btn btn-error text-white">Help me to choose</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseMatcher;