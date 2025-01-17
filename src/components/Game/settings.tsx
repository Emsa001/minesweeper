"use client";

import { useGame } from "@/context/game";
import { useState } from "react";

export default function GameSettings() {
    const { setCheats, gridSize, maxMines, setGridSize, setMaxMines } = useGame();

    const [mines, setMines] = useState(maxMines);
    const [blocks, setBlocks] = useState(gridSize);

    const apply = () => {

        if(gridSize > 900)
            return alert("Grid size must be less than 900");

        setMaxMines(mines);
        setGridSize(blocks);
    }

    return (
        <div className="w-full flex flex-col items-center mt-12">
            <h1>Game Settings</h1>
            <div className="flex justify-between w-full px-48 gap-2 mt-6">
                <div>
                    <label className="mr-2">Enable cheats:</label>
                    <input type="checkbox" onChange={(e) => setCheats(e.target.checked)} />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <label className="w-[60px]">Blocks:</label>
                        <input type="number" className="w-[100px] text-black" defaultValue={blocks} onChange={(e) => setBlocks(Number(e.target.value))} />
                    </div>
                    <div className="flex gap-2">
                        <label className="w-[60px]">Mines:</label>
                        <input type="number" className="w-[100px] text-black" defaultValue={mines} onChange={(e) => setMines(Number(e.target.value))} />
                    </div>
                    <button onClick={apply} className="bg-gray-500">Apply</button>
                </div>
            </div>
        </div>
    );
}
