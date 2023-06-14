import React from 'react';
import useApproveClass from "../../Hooks/useApproveClass.jsx";
import useAllInstructor from "../../Hooks/useAllInstructor.jsx";
import SectionHeader from "../Shared/SectionHeader/SectionHeader.jsx";

const AllInstructor = () => {
    const [refetch, instructorData] = useAllInstructor();
    console.log(instructorData);
    return (
        <div className="pt-12">
            <SectionHeader title="All Instructor"></SectionHeader>
            <div className="grid lg:grid-cols-3 gap-x-4 gap-y-6">
                {
                    instructorData?.map(data =>
                        <>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={data.photoURL} alt="img" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{data.name}</h2>
                                    <p>{data.email}</p>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    );
};

export default AllInstructor;