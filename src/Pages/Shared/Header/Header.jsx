import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {AuthContext} from "../../../Providers/AuthProvider.jsx";

const Header = () => {
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
        <div>
            <div className="navbar bg-white bg-opacity-80 fixed z-50">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to={'/dashboard'}>Dashboard</Link></li>
                            <li><Link to={'/all-class'}>Class</Link></li>
                            <li><Link to={'/instructor'}>Instructor</Link></li>
                            {
                                user ?
                                    <>
                                        <button onClick={handelLogout} className="mr-4">Logout</button>
                                    </>
                                    :
                                    <>
                                        <Link to={'/login'}>Login</Link>
                                    </>
                            }
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">RadioWavesCamp</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/all-class'}>Class</Link></li>
                        <li><Link to={'/instructor'}>Instructor</Link></li>
                        {
                            user ?
                                <li><Link to={'/dashboard'}>Dashboard</Link></li>
                                : ''
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <img src={user?.photoURL} alt="profile_img" className="w-12 h-12 rounded-full mr-4"/>
                                <button onClick={handelLogout} className="mr-4">Logout</button>
                            </>
                            :
                            <>
                                <Link to={'/login'}>Login</Link>
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;