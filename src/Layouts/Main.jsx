import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../Pages/Shared/Header/Header.jsx";

const Main = () => {
    return (
        <>
            <Header />
            <Outlet></Outlet>
        </>
    );
};

export default Main;