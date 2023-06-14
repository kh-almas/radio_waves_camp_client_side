import React from 'react';
import useEnrolledClass from "../../../Hooks/useEnrolledClass.jsx";

const EnrolledClass = () => {
    const [refetch, enrolledClass] = useEnrolledClass();
    console.log(enrolledClass);
    return (
        <div>
            <h2 className="text-center text-2xl font-bold">Enrolled Class</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Class Name</th>
                        <th>Instructor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        enrolledClass?.map((data, index) =>
                            <tr key={index}>
                                <th>{index+1}</th>
                                <td>{data?.className}</td>
                                <td>{data?.instructorName}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClass;