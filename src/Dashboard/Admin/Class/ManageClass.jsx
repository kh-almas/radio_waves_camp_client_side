import React, {Fragment, useContext, useState} from 'react';
import useAllClass from "../../../Hooks/useAllClass.jsx";
import {Dialog, Transition} from '@headlessui/react'
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import {AuthContext} from "../../../Providers/AuthProvider.jsx";

const ManageClass = () => {
    const [refetch, classData] = useAllClass();
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState();
    const [singleId, setSingleId] = useState('');

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = (id) => {
        setSingleId(id)
        console.log(id)
        fetch(`${import.meta.env.VITE_API_URL}/class/${id}`)
            .then(res => res.json())
            .then(data => setData(data))
        setIsOpen(true)
    }

    const approveClass = (id) => {
        const data = {
            status: "approved",
            feedback: "",
        }
        axiosSecure.put(`/approve-class/${id}/${user?.email}`, data)
            .then((data) => {
                setIsOpen(false);
                if (data?.data?.modifiedCount === 1){
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class info updated',
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
                    title: 'Something is wrong1',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }

    const handelFeedBack = (e) => {
        e.preventDefault();
        const data = {
            feedback: e.target.feedback.value,
            status: "denied",
        }
        axiosSecure.put(`/feedback-class/${singleId}/${user?.email}`, data)
            .then((data) => {
                setIsOpen(false);
                if (data?.data?.modifiedCount === 1){
                    refetch();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class info updated',
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
                    title: 'Something is wrong1',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
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
                    console.log(data);
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
            <h2 className="text-center text-2xl font-bold">Manage Class</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Name</th>
                        <th>Instructor</th>
                        <th>Available seats</th>
                        <th>Status</th>
                        <th>Action</th>
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
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={singleClass?.img} alt="img" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{singleClass?.className}</div>
                                            <div className="text-sm opacity-50">$ {singleClass?.price}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {singleClass?.instructorName}
                                    <br/>
                                    <span className="badge badge-ghost badge-sm">{singleClass?.instructorEmail}</span>
                                </td>
                                <td>{singleClass?.availableSeats - singleClass?.enroll}</td>
                                <td>{singleClass?.status}</td>
                                <th>
                                    <details className="dropdown">
                                        <summary className="m-1 btn">Action</summary>
                                        <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 z-50">
                                            <li><button onClick={() => approveClass(singleClass?._id)}>Approve</button></li>
                                            <li><button onClick={() => openModal(singleClass?._id)}>Denied</button></li>
                                            <li><button onClick={() => openModal(singleClass?._id)}>feedback</button></li>
                                            <li><button onClick={() => deleteClass(singleClass?._id)}>Delete</button></li>
                                        </ul>
                                    </details>
                                </th>
                            </tr>
                        )
                    }

                    </tbody>

                </table>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Feedback
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <form onSubmit={handelFeedBack}>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Class details</span>
                                                    </label>
                                                    <textarea defaultValue={data?.feedback} name="feedback" className="textarea textarea-bordered textarea-lg w-full h-[200px]" ></textarea>
                                                </div>
                                                <button type="submit" className="btn mt-3 w-full">Denied request</button>
                                            </form>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default ManageClass;