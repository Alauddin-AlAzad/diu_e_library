import React from 'react';

const NewArrivalItem = ({ title }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 text-center">
            <img
                src="https://th.bing.com/th/id/OIP.PoJkOCVEIeVPuLPCFpZliwHaLG?w=118&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
                alt=""
                className="mx-auto mb-3 rounded"
            />
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">
                New Arrival Item
            </p>
        </div>
    );
};

export default NewArrivalItem;