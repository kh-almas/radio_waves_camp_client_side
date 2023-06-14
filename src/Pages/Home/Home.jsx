import React from 'react';
import {Helmet} from "react-helmet";
import Header from "../Shared/Header/Header.jsx";
import Slider from "./Slider/Slider.jsx";
import SectionHeader from "../Shared/SectionHeader/SectionHeader.jsx";
import PopularClasses from "./PopularClasses/PopularClasses.jsx";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>RadioWavesCamp | Home</title>
            </Helmet>
            <Slider />
            <PopularClasses />
        </div>
    );
};

export default Home;