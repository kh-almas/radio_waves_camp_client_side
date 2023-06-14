import React from 'react';
import SectionHeader from "../Shared/SectionHeader/SectionHeader.jsx";
import useApproveClass from "../../Hooks/useApproveClass.jsx";

const AllClass = () => {
    const [refetch, approvedClassData] = useApproveClass();
    console.log(approvedClassData);
    return (
        <div className="pt-12">
            <SectionHeader title="All Class"></SectionHeader>
            <div className="lg:px-12">
                <div className="grid grid-cols-3 gap-4">
                    {
                        approvedClassData?.map(data =>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img src={data?.img} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{data?.className}</h2>
                                    <p>Instructor name: {data?.instructorName}</p>
                                    <p>Available seats: {data?.availableSeats}</p>
                                    <p>Price: {data?.price}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-actions">
                                        <button className="btn btn-primary w-full">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default AllClass;