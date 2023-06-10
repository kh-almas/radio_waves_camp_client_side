import React, {useContext, useState} from 'react';
import {AuthContext} from "./AuthProvider.jsx";

const LoaderProvider = ({ children }) => {
    const { isLoadData } = useContext(AuthContext);

    if(isLoadData){
        return <>
            <div className="flex justify-center items-center h-screen">
                <progress className="progress w-56 bg-white"></progress>
            </div>
        </>;
    }
    return children;

};

export default LoaderProvider;