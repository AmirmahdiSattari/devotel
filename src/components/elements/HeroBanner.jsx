import React from 'react';
import imgBanner from '../../../public/imgs/banner.jpg';
import { Link } from 'react-router-dom';

// Reusable Card component
const Card = ({ title, href }) => (
    <Link to={href} className="border-primary card bg-base-100 border text-center hover:scale-105 duration-300">
        <div className="card-body flex items-center justify-center">
            <span className="h-auto text-center text-xl font-bold !px-5">{title}</span>
        </div>
    </Link>
);

const HeroBanner = () => {
    return (
        <div className="hero min-h-screen w-11/12 mx-auto !py-20">
            <div className="hero-content flex-col lg:flex-row gap-9">
                {/* Image Section */}
                <img
                    src={imgBanner}
                    alt="Insurance Banner"
                    className="max-w-sm rounded-lg shadow-2xl"
                />

                {/* Text Section */}
                <div className="flex flex-col gap-5 justify-center items-center lg:items-end">
                    <h1 className="text-5xl font-bold text-center w-full">Smart Insurance Application</h1>
                    <p className="!py-12 text-justify">
                        Welcome to our Smart Insurance Application Portal! This platform allows users to apply for various types of insurance (Health, Home, Car, Life, etc.) in a seamless and efficient manner. The dynamic form adapts based on the type of insurance selected, ensuring that users only fill out the relevant fields. By utilizing real-time data and intelligent validation, this portal simplifies the process of applying for insurance, making it faster and more convenient than ever before.
                    </p>

                    {/* Cards Section */}
                    <div className="w-full flex items-center justify-center flex-wrap gap-5 animate-pulse hover:animate-none duration-300 transition-all">
                        {/* Cards for 'New Insurance' */}
                        <div className="stack size-28 min-w-max !mx-auto cursor-pointer">
                            <Card title="New insurance (Forms)" href={'/form'} />
                            {/* You can repeat the Card component with different titles if needed */}
                            <Card title="More Options" />
                            <Card title="More Options" />
                            <Card title="More Options" />
                        </div>

                        {/* Cards for 'Current Data' */}
                        <div className="stack size-28 min-w-max !mx-auto cursor-pointer">
                            <Card title="Current Data (Tables)" href={'data'} />
                            <Card title="More Options" />
                            <Card title="More Options" />
                            <Card title="More Options" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
