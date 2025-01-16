import React from "react";
import moment from "moment";
import { gridSize, maxMines } from "@/utils/settings";

interface GameOverProps {
    gameState: boolean | null;
    startTime: number;
    flags: number;
    opened: number;
    restart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ gameState, startTime, flags, opened, restart }) => {
    if (gameState === null) {
        return (
            <div className="absolute flex flex-col p-5">
                <span>
                    Flags: <b>{flags}/{maxMines}</b>
                </span>
                <span>
                    Opened: <b>{opened}/{gridSize - maxMines}</b>
                </span>
            </div>
        );
    }

    const years = moment().diff(startTime, "years");
    const months = moment().diff(startTime, "months");
    const weeks = moment().diff(startTime, "weeks");
    const days = moment().diff(startTime, "days");
    const hours = moment().diff(startTime, "hours");
    const minutes = moment().diff(startTime, "minutes");
    const seconds = moment().diff(startTime, "seconds");
    const milliseconds = moment().diff(startTime, "milliseconds");

    const percentOfDay = (seconds / 86400) * 100;

    return (
        <div className="absolute top-24 left-0 right-0 top-0 grid place-items-center">
            <div className={`flex flex-col items-center justify-center gap-6 rounded-2xl p-10 z-[20] ${gameState ? "bg-green-600" : "bg-red-900"}`}>
                <h1 className={`text-6xl font-black ${gameState ? "text-white" : "text-black"}`}>{gameState ? "You Won!" : "Game Over!"}</h1>

                <div className="w-full h-full">
                    <h3 className="text-2xl text-center font-bold">PlayTime:</h3>
                    <p>
                        <b>{years}</b> years
                    </p>
                    <p>
                        <b>{months}</b> months
                    </p>
                    <p>
                        <b>{weeks}</b> weeks
                    </p>
                    <p>
                        <b>{days}</b> days
                    </p>
                    <p>
                        <b>{hours}</b> hours
                    </p>
                    <p>
                        <b>{minutes}</b> minutes
                    </p>
                    <p>
                        <b>{seconds}</b> seconds
                    </p>
                    <p>
                        <b>{milliseconds}</b> milliseconds
                    </p>
                    <p>
                        <b>{percentOfDay}%</b> of the day
                    </p>
                </div>

                <button className="bg-blue-600 p-2 w-1/2 rounded-md" onClick={restart}>
                    Restart
                </button>
            </div>
        </div>
    );
};

export default GameOver;
