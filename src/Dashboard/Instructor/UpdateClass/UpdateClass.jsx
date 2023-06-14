import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import {useForm} from "react-hook-form";
import {AuthContext} from "../../../Providers/AuthProvider.jsx";
import Swal from "sweetalert2";

const UpdateClass = () => {
    const {id} = useParams();
    const {user} = useContext(AuthContext);
    const [data, setData] = useState();
    const axiosSecure = useAxiosSecure();
    const [update, setUpdate] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect( () => {
        fetch(`${import.meta.env.VITE_API_URL}/class/${id}`)
            .then(res => res.json())
            .then(data => setData(data))

        setTimeout(() => {
            // dynamically push info dosen't word
            // default value don't work here when i submit form thats why i added this peace of code here
            reset({
                firstName: "bill",
            });
        }, 2000);
    }, [reset, update])
    const onSubmit = data => {
        axiosSecure.put(`/class/${id}/${user?.email}`, data)
            .then((data) => {
                reset();
                if (data?.data?.modifiedCount === 1){
                    setUpdate(!update)
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
            <h2 className="text-center text-2xl font-bold">update class</h2>
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
                    <input type="text" defaultValue={data?.className} {...register("className", { required: true })} className="input input-bordered w-full" />
                    {errors.className && <small className="text-white mt-2">Name is required</small>}
                </div>
                <div className="flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Available seats</span>
                        </label>
                        <input type="number" defaultValue={data?.availableSeats} {...register("availableSeats", { required: true })} className="input input-bordered w-full" />
                        {errors.availableSeats && <small className="text-white mt-2">Available seats is required</small>}
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number" defaultValue={data?.price} {...register("price", { required: true })} className="input input-bordered w-full" />
                        {errors.price && <small className="text-white mt-2">Price is required</small>}
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class Image</span>
                    </label>
                    <input type="text" defaultValue={data?.img} {...register("img", { required: true })} className="file-input file-input-bordered w-full" />
                    {errors.img && <small className="text-white mt-2">Image is required</small>}
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class details</span>
                    </label>
                    <textarea  defaultValue={data?.des} {...register("des", { required: true })} className="textarea textarea-bordered textarea-lg w-full h-[200px]" ></textarea>
                    {errors.des && <small className="text-white mt-2">Details is required</small>}
                </div>
                <button type="submit" className="btn mt-3 w-full">Update Class</button>
            </form>
        </div>
    );
};

export default UpdateClass;