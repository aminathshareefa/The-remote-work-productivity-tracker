import React, { useState, useEffect } from 'react';
import API from '../../services/api';

const TimeTracker = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => setSeconds(s => s + 1), 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const handleStop = async () => {
        setIsActive(false);
        try {
            await API.post('/time/log', {
                userId: user.id,
                startTime: new Date(Date.now() - seconds * 1000),
                endTime: new Date(),
                duration: seconds
            });
            alert(`Logged ${Math.floor(seconds / 60)} minutes!`);
            setSeconds(0);
        } catch (err) {
            console.error("Failed to save time log", err);
        }
    };

    return (
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold text-gray-500 mb-4">Work Session</h2>
            <div className="text-6xl font-mono font-bold text-blue-600 mb-8">
                {new Date(seconds * 1000).toISOString().substr(11, 8)}
            </div>
            <div className="flex justify-center gap-4">
                {!isActive ? (
                    <button onClick={() => setIsActive(true)} className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600">Start</button>
                ) : (
                    <button onClick={handleStop} className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600">Stop & Save</button>
                )}
            </div>
        </div>
    );
};

export default TimeTracker;