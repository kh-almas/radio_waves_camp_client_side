import React, {useContext} from 'react';
import SectionHeader from "../Shared/SectionHeader/SectionHeader.jsx";
import useApproveClass from "../../Hooks/useApproveClass.jsx";
import {AuthContext} from "../../Providers/AuthProvider.jsx";

const AllClass = () => {
    const {user} = useContext(AuthContext);
    const [refetch, approvedClassData] = useApproveClass();
    const availableSit = (availableSeats, enroll) => parseInt(availableSeats)- parseInt(enroll);

    console.log(approvedClassData);
    return (
        <div className="pt-12">
            <SectionHeader title="All Class"></SectionHeader>
            <div className="lg:px-12">
                <div className="grid grid-cols-3 gap-4">
                    {
                        approvedClassData?.map((data, index) =>
                            <div className="card w-96 bg-base-100 shadow-xl" key={index}>
                                <figure><img src={data?.img} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{data?.className}</h2>
                                    <p>Instructor name: {data?.instructorName}</p>
                                    <p>Available seats: {data?.availableSeats}</p>
                                    <p>Price: {data?.price}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-actions">
                                        <button className="btn btn-primary w-full" disabled={user?.role === 'admin' || user?.role === 'instructor' || availableSit(data?.availableSeats, data?.enroll) === 0}>Add to cart</button>
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