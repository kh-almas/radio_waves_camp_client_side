import React, {useContext, useEffect, useState} from 'react';
import SectionHeader from "../../Shared/SectionHeader/SectionHeader.jsx";
import {AuthContext} from "../../../Providers/AuthProvider.jsx";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";

const PopularInstructors = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [data , setData] = useState([]);
    useEffect( () => {
        axiosSecure.get(`/popular-instructor`)
            .then((data) => {
                setData(data.data.slice(0,6));
            }).catch(e => {
            console.log(e)
        });
    }, [])
    return (
        <div className="mb-12 lg:px-12">
            <SectionHeader title="Popular Instructors"></SectionHeader>

            <div className="lg:w-2/3 mx-auto">
                <div className="grid grid-cols-3 gap-2">
                    {
                        data.map(singleData =>
                            <>
                                <div className="card shadow">
                                    <div className="card">
                                        <div className="card-body items-center text-center">
                                            <img src={singleData?.photoURL} alt="profile_img" className="w-20 h-20 rounded-full mr-4"/>
                                            <h2 className="font-semibold">{singleData?.name}</h2>
                                            <p>{singleData?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default PopularInstructors;