import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure.jsx";

const UseClass = () => {
    const axiosSecure = useAxiosSecure()
    const { status, refetch, data: classData = [], error } = useQuery({
        queryKey: ['myClass'],
        queryFn: async () => {
            const response = await axiosSecure.get('/class')
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