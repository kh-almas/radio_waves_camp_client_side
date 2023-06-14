import React, {useContext} from 'react';
import {AuthContext} from "../../../Providers/AuthProvider.jsx";
import {useForm} from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";

const AddClass = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const onSubmit = data => {
        const allInfo = {
            instructorName: user?.displayName,
            instructorEmail: user?.email,
            status: 'pending',
            feedback: '',
            enroll: 0,
            ...data
        }

        axiosSecure.post(`/class`, allInfo)
            .then((data) => {
                if (data?.data?.insertedId === 1){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Class added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch((err) => {
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
        <div>
            <h2 className="text-center text-2xl font-bold">Add class</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor name</span>
                    </label>
                    <input value={user?.displayName} disabled type="text" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor email</span>
                    </label>
                    <input value={user?.email} disabled type="text" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class name</span>
                    </label>
                    <input type="text" {...register("className", { required: true })} className="input input-bordered w-full" />
                    {errors.className && <small className="text-white mt-2">Name is required</small>}
                </div>
                <div className="flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Available seats</span>
                        </label>
                        <input type="number" {...register("availableSeats", { required: true })} className="input input-bordered w-full" />
                        {errors.availableSeats && <small className="text-white mt-2">Available seats is required</small>}
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} className="input input-bordered w-full" />
                        {errors.price && <small className="text-white mt-2">Price is required</small>}
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class Image</span>
                    </label>
                    <input type="text" {...register("img", { required: true })} className="file-input file-input-bordered w-full" />
                    {errors.img && <small className="text-white mt-2">Image is required</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class details</span>
                    </label>
                    <textarea {...register("des", { required: true })} className="textarea textarea-bordered textarea-lg w-full h-[200px]" ></textarea>
                    {errors.des && <small className="text-white mt-2">Details is required</small>}
                </div>
                <button type="submit" className="btn mt-3 w-full">Add Class</button>
            </form>
        </div>
    );
};

export default AddClass;