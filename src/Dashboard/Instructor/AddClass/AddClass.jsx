import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../Providers/AuthProvider.jsx";

const AddClass = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <h2 className="text-center text-2xl font-bold">Add class</h2>
            <form className="max-w-xl mx-auto">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor name</span>
                    </label>
                    <input value={user?.displayName} disabled type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Instructor email</span>
                    </label>
                    <input value={user?.email} disabled type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class name</span>
                    </label>
                    <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Available seats</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class Image</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Class details</span>
                    </label>
                    <textarea className="textarea textarea-bordered textarea-lg w-full h-[200px]" ></textarea>
                </div>
                <button type="submit" className="btn mt-3 w-full">Add Class</button>
            </form>
        </div>
    );
};

export default AddClass;