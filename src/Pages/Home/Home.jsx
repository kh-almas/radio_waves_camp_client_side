import React from 'react';
import {Helmet} from "react-helmet";
import Header from "../Shared/Header/Header.jsx";
import Slider from "./Slider/Slider.jsx";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>RadioWavesCamp | Home</title>
            </Helmet>
            <Slider />
        </div>
    );
};

export default Home;