import React, {useContext} from 'react';
import {AuthContext} from "../Providers/AuthProvider.jsx";
import {Navigate, useLocation} from "react-router-dom";

const PrivateRoute = ( { children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if(user){
        return children;
    }

    return <Navigate to={'/login'} state={{from: location}} replace={true}></Navigate>
};

export default PrivateRoute;