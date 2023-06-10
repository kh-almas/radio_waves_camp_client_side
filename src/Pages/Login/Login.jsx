import React, {useContext, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import GoogleAuth from "../Shared/SocialAuth/Google/GoogleAuth.jsx";
import {AuthContext} from "../../Providers/AuthProvider.jsx";
import {Helmet} from "react-helmet";
import {useForm} from "react-hook-form";
import Swal from "sweetalert2";

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const [message, setMassage] = useState('');

    const onSubmit = (data) => {
        setMassage('');
        if(data.email === '' || data.password === ''){
            setMassage('Input required');
            return;
        }
        userLogin(data.email, data.password)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'You are logged in',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
            .catch(e => {
                setMassage("Email/Password doesn't match");
            })
        reset();
    }

    return (
        <div>
            <Helmet>
                <title>RadioWavesCamp | login</title>
            </Helmet>
            <div className="flex items-center justify-center bg-cover bg-center min-h-screen">
                <div className="w-1/2 p-8 text-gray-800 dark:text-gray-200">
                    <h2 className="text-2xl mb-4">User Login</h2>
                    <small>{ message }</small>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email", { required: true })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                            />
                        </div>
                        <button
                            className="w-full bg-teal-900 text-white hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            login
                        </button>
                    </form>
                    <div className="mt-4">
                        <GoogleAuth from={from}></GoogleAuth>
                    </div>
                    <p className="mt-8 text-center">
                        Don't have an account?{' '}
                        <Link to="/registration" className="text-blue-500 hover:text-blue-700">
                            Registration
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;