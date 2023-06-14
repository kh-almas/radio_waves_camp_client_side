import React, {useContext} from 'react';
import UseUser from "../../../Hooks/useUser.jsx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure.jsx";
import {AuthContext} from "../../../Providers/AuthProvider.jsx";

const ManageUser = () => {
    const [refetch, allUsers] = UseUser();
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const setRole = (id, role, currentRole) => {
        console.log(role)
        const data = {role: role};
        axiosSecure.put(`/set-role/${id}/${user?.email}/${currentRole}`, data)
            .then((data) => {
                console.log(data)
                refetch();
                if (data?.data?.modifiedCount === 1){
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
                    title: 'Something is wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    }
    return (
        <div>
            <h2 className="text-center text-2xl font-bold">Manage user</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        allUsers?.map((user, index) =>
                            <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photoURL} alt="img" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user?.name}</div>
                                            <div className="text-sm opacity-50">{user?.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user?.role}
                                </td>
                                <td>{user?.phone}</td>
                                <th>
                                    <button onClick={() => setRole(user?._id, "admin", user?.role)} className="btn btn-ghost btn-xs">Make Admin</button>
                                    <button onClick={() => setRole(user?._id, "instructor", user?.role)} className="btn btn-ghost btn-xs">Make Instructor</button>
                                    <button onClick={() => setRole(user?._id, "user", user?.role)} className="btn btn-ghost btn-xs">Make User</button>
                                </th>
                            </tr>
                        )
                    }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;