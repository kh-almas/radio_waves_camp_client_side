import React, { Fragment, useState }  from 'react';
import UseClass from "../../../Hooks/useClass.jsx";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

const MyClass = () => {
    const [refetch, classData] = UseClass();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        refetch();
        setIsOpen(false)
    }

    function openModal() {
        refetch();
        setIsOpen(true)
    }
    const deleteClass = id => {
            // ?email=${user?.email}
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/class/${id}`).then((data) => {
                    if(data.data.deletedCount){
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Class has been deleted.',
                            'success'
                        )
                    }
                });
            }
        })
    }
    return (
        <div>
            <h2 className="text-center text-2xl font-bold">My class</h2>
            <div>
                <div className="overflow-x-auto overflow-y-visible">
                    <table className="table  ">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Available Sits</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            classData?.map((singleClass, index) =>
                                <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={singleClass?.img} alt="img" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{singleClass?.className}</p>
                                    </td>
                                    <td>
                                        <div className="badge badge-neutral">{singleClass?.status}</div>
                                    </td>
                                    <td>
                                        {singleClass?.feedback}
                                    </td>

                                    <td>
                                        <div className="badge badge-neutral">{singleClass?.availableSeats}</div>
                                    </td>
                                    <td>
                                        <details className="dropdown">
                                            <summary className="m-1 btn">Action</summary>
                                            <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 z-50">
                                                <li><Link to={`/dashboard/update-class/${singleClass?._id}`}>Update</Link></li>
                                                <li><button onClick={() => deleteClass(singleClass?._id)}>Delete</button></li>
                                            </ul>
                                        </details>
                                    </td>
                                </tr>
                            )
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyClass;