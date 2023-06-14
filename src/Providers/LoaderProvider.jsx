import React, {useContext, useState} from 'react';
import {AuthContext} from "./AuthProvider.jsx";

const LoaderProvider = ({ children }) => {
    const { loading } = useContext(AuthContext);

    if(loading){
        return <>
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56 bg-white"></progress>
            </div>
        </>;
    }
    return children;

};

export default LoaderProvider;