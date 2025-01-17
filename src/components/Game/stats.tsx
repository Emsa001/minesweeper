import React from "react";
import moment from "moment";
import { useGame } from "@/context/game";

interface GameStatsProps {
    gameState: boolean | null;
    startTime: number;
    flags: number;
    opened: number;
    restart: () => void;
}

export default function GameStats({ gameState, startTime, flags, opened, restart }: GameStatsProps) {
    const { gridSize, maxMines } = useGame();

    if (gameState === null) {
        return (
            <div className="absolute flex flex-col p-5 w-screen">
                <span>
                    Flags:{" "}
                    <b>
                        {flags}/{maxMines}
                    </b>
                </span>
                <span>
                    Opened:{" "}
                    <b>
                        {opened}/{gridSize - maxMines}
                    </b>
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
        <div className={`absolute w-full top-1/3 bg-red-800 bg-opacity-60 flex flex-col items-center justify-center gap-6 py-2 mb-5 z-[20] text-center`}>
            <h1 className={`text-6xl font-black text-white`}>{gameState ? "You Won!" : "Game Over!"}</h1>

            <h3 className="text-2xl text-center font-bold">PlayTime:</h3>
            <div className="grid grid-cols-4 w-full h-full">
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
            </div>
            <p>
                <b>{percentOfDay}%</b> of the day
            </p>

            <button className="bg-green-500 p-2 w-1/2 rounded-md" onClick={restart}>
                Restart
            </button>
        </div>
    );
}
