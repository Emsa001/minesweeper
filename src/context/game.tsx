"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface GameContextProps {
    gridSize: number;
    maxMines: number;

    setGridSize: React.Dispatch<React.SetStateAction<number>>;
    setMaxMines: React.Dispatch<React.SetStateAction<number>>;

    rows: number;
    cols: number;

    cheats: boolean;
    setCheats: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gridSize, setGridSize] = useState(625);
    const [maxMines, setMaxMines] = useState(100);
    const [rows, setRows] = useState(Math.floor(Math.sqrt(gridSize)));
    const [cols, setCols] = useState(Math.floor(gridSize / rows));
    const [cheats, setCheats] = useState(false);

    useEffect(() => {
        let newRows = Math.floor(Math.sqrt(gridSize));
        let newCols = Math.floor(gridSize / newRows);

        if(newRows > 30)
            newRows = 30;
        if(newCols > 30)
            newCols = 30;

        setRows(newRows);
        setCols(newCols);
    }, [gridSize, maxMines]);

    return <GameContext.Provider value={{ gridSize, maxMines, setGridSize, setMaxMines, cols, rows, cheats, setCheats }}>{children}</GameContext.Provider>;
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};
