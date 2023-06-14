import React, {useContext} from 'react';
import {AuthContext} from "../Providers/AuthProvider.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const UseAllClass = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { status, refetch, data: classData = [], error } = useQuery({
        queryKey: ['all-Class'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/all-class`)
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
    return [refetch, classData];
};

export default UseAllClass;