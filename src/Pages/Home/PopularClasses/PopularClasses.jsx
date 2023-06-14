import React, {useContext, useEffect, useState} from 'react';
import SectionHeader from "../../Shared/SectionHeader/SectionHeader.jsx";
import {AuthContext} from "../../../Providers/AuthProvider.jsx";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";

const PopularClasses = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [data , setData] = useState([]);
    useEffect( () => {
        axiosSecure.get(`/popular-class/${user?.email}`)
            .then((data) => {
                setData(data.data.slice(0,6));
            }).catch(e => {
            console.log(e)
        });
    }, [])
    return (
        <div className="lg:px-12">
            <SectionHeader title="Popular Class"></SectionHeader>
            <div className="grid grid-cols-3 gap-4">
                {
                    data.map(singleData =>
                        <>
                            <div className="card w-96 bg-base-100 shadow-xl image-full h-full">
                                <figure><img src={singleData.img} alt="img" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{singleData.className}</h2>
                                    <p>Available Sits: {singleData.availableSeats}</p>
                                    <p>Price: ${singleData.price}</p>
                                    <div className="card-actions">
                                        <button className="btn btn-primary w-full">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>

        </div>
    );
};

export default PopularClasses;