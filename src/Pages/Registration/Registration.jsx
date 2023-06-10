import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import GoogleAuth from "../Shared/SocialAuth/Google/GoogleAuth.jsx";
import {AuthContext} from "../../Providers/AuthProvider.jsx";
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";
import {useForm} from "react-hook-form";

const Registration = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {user, userRegistration, updateProfileInformation} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onSubmit = data => {
        userRegistration(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfileInformation(user, data.name, data.profileImage)
                    .then(() => {
                        const UserInfo = {name: data.name, email: data.email, image: data.profileImage}
                        fetch(`http://localhost:3000/users`, {
                            method: 'POST',
                            headers:{
                                'content-type' : 'application/json',
                            },
                            body: JSON.stringify(UserInfo),
                        })
                            .then(res => res.json())
                            .then(data => {
                                console.log(data)
                                if(data.insertedId)
                                {
                                    reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Profile created',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate('/');
                                }
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
            })
            .catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Something is wrong',
                    showConfirmButton: false,
                    timer: 1500
                })
            });
    };

    return (
        <div>
            <Helmet>
                <title>RadioWavesCamp | create-account</title>
            </Helmet>
            <div className="flex items-center justify-center bg-cover bg-center min-h-screen">
                <div className="w-1/2 p-8 text-gray-800 dark:text-gray-200">
                    <h2 className="text-2xl mb-4">User Registration</h2>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Enter your name"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <small className="text-white">Name is required</small>}
                        </div>
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
                            {errors.email && <small className="text-white">Email is required</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <small className="text-white">Password is required</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="url">
                                URL
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="url"
                                type="text"
                                placeholder="Enter your URL"
                                {...register("profileImage", { required: true })}
                            />
                            {errors.profileImage && <small className="text-white">Profile picture is required</small>}
                        </div>
                        <button
                            className="bg-teal-900 text-white hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                    <label className="label">
                        <button onClick={() => setShowPassword(!showPassword)} className="label-text-alt">Show password</button>
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    <div>
                        <GoogleAuth />
                    </div>
                    <p className="mt-8 text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:text-blue-700">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;