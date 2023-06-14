import React, {useContext} from 'react';
import {AuthContext} from "../Providers/AuthProvider.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const UseEnrolledClass = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { status, refetch, data: enrolledClass = [], error } = useQuery({
        queryKey: ['all-instructor'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/enrolled-class/${user?.email}`)
            return response.data;
        },
    })

    // if (status === 'loading') {
    //     return <span>Loading...</span>
    // }
    //
    // if (status === 'error') {
    //     return <span>Error: {error.message}</span>
    // }
    return [refetch, enrolledClass];
};

export default UseEnrolledClass;