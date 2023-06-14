import React from 'react';

const SectionHeader = ({title}) => {
    return (
        <div className="w-1/3 mx-auto">
            <h2 className="text-4xl font-bold text-center mt-8 mb-12 border-b-4 pb-4">{title}</h2>
        </div>
    );
};

export default SectionHeader;