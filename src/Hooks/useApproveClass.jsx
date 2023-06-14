import React, {useContext} from 'react';
import {AuthContext} from "../Providers/AuthProvider.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const UseApproveClass = () => {
    const {loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { status, refetch, data: approvedClassData = [], error } = useQuery({
        queryKey: ['approved-Class'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/approved-class`);
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
    return [refetch, approvedClassData];
};

export default UseApproveClass;