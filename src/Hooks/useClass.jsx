import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure.jsx";
import {useContext} from "react";
import {AuthContext} from "../Providers/AuthProvider.jsx";

const UseClass = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { status, refetch, data: classData = [], error } = useQuery({
        queryKey: ['my-Class'],
        enabled: !loading,
        queryFn: async () => {
            const response = await axiosSecure.get(`/my-class/${user?.email}`)
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

export default UseClass;