import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import GoogleAuth from "../Shared/SocialAuth/Google/GoogleAuth.jsx";
import {AuthContext} from "../../Providers/AuthProvider.jsx";
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useAxiosSecure from "../../Hooks/useAxiosSecure.jsx";

const Registration = () => {
    const {user, userRegistration, updateProfileInformation} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError , setPasswordError] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const schema = yup.object({
        name: yup.string().required('Name is a required field'),
        email: yup.string().required('Email is a required field'),
        phone: yup.string().required('Phone number is a required field'),
        address: yup.string().required('Address is a required field'),
        password: yup.string()
            .required('Password is a required field')
            .min(6, 'Password must be at 6 char long'),
        confirmPassword: yup.string()
            .required('Confirm password is a required field')
            .oneOf([yup.ref('password')], 'Passwords does not match'),
        gender: yup.string().required('Gender is a required field'),
        profileImage: yup.string().required('Profile image is a required field'),
    }).required();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = data => {
        setPasswordError('');
        console.log(data);
        if(data.password.length > 255)
        {
            setPasswordError("Email can't be more then 100 characters");
            return;
        }
        const pattern = /^(?=.*[A-Z])(?=.*[\W_]).*$/;
        if (!pattern.test(data.password))
        {
            setPasswordError("Password should contain one special characters and one Uppercase");
            console.log(passwordError);
            return;
        }
        console.log(passwordError);
        const role = "user";
        userRegistration(data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfileInformation(
                        user,
                        data.name,
                        data.profileImage,
                        data.phone,
                    )
                    .then(() => {
                        const UserInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.profileImage,
                            phone: data.phone,
                            address: data.address,
                            gender: data.gender,
                            role: role,
                        }
                        axiosSecure.post(`/users`, UserInfo)
                            .then((data) => {
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Profile created',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                navigate('/dashboard');
                            })
                            .catch((err) => {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'warning',
                                    title: 'Something is wrong1',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            });
                    })
            })
            .catch((error) => {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Something is wrong2',
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
                                {...register("name")}
                            />
                            {errors.name && <small role="text-red-600">{errors.name?.message}</small>}
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
                                {...register("email")}
                            />
                            {errors.email && <small role="alert text-red-600">{errors.email?.message}</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="phone">
                                Phone Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="phone"
                                type="number"
                                placeholder="Enter your phone number"
                                {...register("phone")}
                            />
                            {errors.phone && <small role="alert text-red-600">{errors.phone?.message}</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="address">
                                Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="address"
                                type="text"
                                placeholder="Enter your Address"
                                {...register("address")}
                            />
                            {errors.address && <small role="alert text-red-600">{errors.address?.message}</small>}
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
                                {...register("password",)}
                            />
                            <small className="text-red-600">{ passwordError }</small>
                            {errors.password && <small role="alert text-red-600">{errors.password?.message}</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 focus:border-teal-500 focus:shadow-outline"
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword && <small role="alert text-red-600">{errors.confirmPassword?.message}</small>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2 text-gray-800 dark:text-gray-200" htmlFor="password">
                                Gender
                            </label>
                            <select {...register("gender")} className="select select-bordered w-full">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Custom">Custom</option>
                                <option value="Don't want to say">Don't want to say</option>
                            </select>
                            {errors.gender && <small role="alert text-red-600">{errors.gender?.message}</small>}
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
                                {...register("profileImage")}
                            />
                            {errors.profileImage && <small role="alert text-red-600">{errors.profileImage?.message}</small>}
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