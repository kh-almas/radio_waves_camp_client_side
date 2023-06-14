import React from 'react';
import SectionHeader from "../../Shared/SectionHeader/SectionHeader.jsx";

const PopularClasses = () => {
    return (
        <div className="lg:px-12">
            <SectionHeader title="Popular Class"></SectionHeader>
            <div className="grid grid-cols-3 gap-4">
                <div className="card w-96 bg-base-100 shadow-xl image-full h-full">
                    <figure><img src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>Available Sits:</p>
                        <p>Price:</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PopularClasses;