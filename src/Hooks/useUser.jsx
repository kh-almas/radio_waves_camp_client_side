import React, {useContext} from 'react';
import {AuthContext} from "../Providers/AuthProvider.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const UseUser = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { status, refetch, data: allUsers = [], error } = useQuery({
        queryKey: ['my-Class'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/all-users`)
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
    return [refetch, allUsers];
};

export default UseUser;