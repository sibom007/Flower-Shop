import React, { useState, useEffect } from 'react';

interface TimerProps {
    startTime: number;
}

const Timer: React.FC<TimerProps> = ({ startTime }) => {
    const [elapsedTime, setElapsedTime] = useState(calculateElapsedTime(startTime));

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(calculateElapsedTime(startTime));
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    function calculateElapsedTime(startTime: number) {
        const currentTime = Math.floor(Date.now() / 1000);
        return currentTime - startTime;
    }

    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return (
        <div>
            <h2>{formatTime(elapsedTime)}</h2>
        </div>
    );
};

export default Timer;

