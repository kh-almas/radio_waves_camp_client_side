import React, {useContext, useEffect, useState} from 'react';
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure.jsx";
import {AuthContext} from "../../Providers/AuthProvider.jsx";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const [cartData, setCartData] = useState([]);
    const [reload, setReload] = useState(false);
    useEffect( () => {
        axiosSecure.get(`/cart-item/${user?.email}`)
            .then((data) => {
                setCartData(data.data);
        }).catch(e => {
            console.log(e)
        });
    }, [reload])

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
                axiosSecure.delete(`/remove-cart-item/${id}/${user?.email}`).then((data) => {
                    console.log(data.data);
                    if(data.data.deletedCount){

                        setReload(!reload)
                        Swal.fire(
                            'Deleted!',
                            'Class has been removed.',
                            'success'
                        )
                    }
                })
                    .catch(e => {
                        console.log(e);
                    });
            }
        })
    }

    return (
        <div>
            <h2 className="text-center text-2xl font-bold">Cart</h2>
            <div>
                <div className="overflow-x-auto overflow-y-visible">
                    <table className="table  ">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>price</th>
                            <th>Instructor Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cartData?.map((data, index) =>
                                <tr key={index}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={data?.img} alt="img" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p>{data?.className}</p>
                                    </td>
                                    <td>
                                        <p>{data?.price}</p>
                                    </td>
                                    <td>
                                        {data?.instructorName}
                                    </td>
                                    <td>
                                        <button onClick={() => deleteClass(data?._id)}>Delete</button>
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

export default Cart;