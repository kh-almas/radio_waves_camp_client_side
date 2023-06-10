import React, {useContext} from 'react';
import {Link, Outlet} from "react-router-dom";
import {AuthContext} from "../Providers/AuthProvider.jsx";
import Swal from "sweetalert2";

const Dashboard = () => {
    const {user, logout} = useContext(AuthContext);

    const handelLogout = () =>{
        logout()
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'You are loged out',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch((error) => {
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
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className="mx-8 my-4">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {
                            user ?
                                <div className="flex flex-col items-center justify-center">
                                    <img src={user?.photoURL} alt="profile_img" className="w-12 h-12 rounded-full mb-4"/>
                                    <p className="text-2xl font-bold">{user?.displayName}</p>

                                </div> : ''
                        }
                        <ul className="mt-8">
                            <li><Link to={'/dashboard'} >Home</Link></li>
                            <li><Link to={'/dashboard/add-class'} >Add Class</Link></li>
                            <li><a>Sidebar Item 2</a></li>
                        </ul>
                        <div className="divider"></div>
                        <button onClick={handelLogout} className="mr-4">Logout</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Dashboard;