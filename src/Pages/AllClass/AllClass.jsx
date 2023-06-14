import React, {useContext} from 'react';
import SectionHeader from "../Shared/SectionHeader/SectionHeader.jsx";
import useApproveClass from "../../Hooks/useApproveClass.jsx";
import {AuthContext} from "../../Providers/AuthProvider.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure.jsx";

const AllClass = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [refetch, approvedClassData] = useApproveClass();
    const availableSit = (availableSeats, enroll) => parseInt(availableSeats)- parseInt(enroll);

    const addToCart = (data) =>{
        data.classId = data._id;
        delete data?._id;
        data.studentName = user.displayName;
        data.studentEmail = user.email;
        console.log(data);
        axiosSecure.post(`/cart`, data)
            .then((data) => {
                console.log(data.data)
                if (data?.data?.upsertedCount){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Add to cart',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                if (data?.data?.matchedCount === 1 && data?.data?.upsertedCount === 0){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Already in cart',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch((err) => {
                console.log(err)
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Something is wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

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
                                        <button onClick={() => addToCart(data)} className="btn btn-primary w-full" disabled={user?.role === 'admin' || user?.role === 'instructor' || availableSit(data?.availableSeats, data?.enroll) === 0}>Add to cart</button>
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