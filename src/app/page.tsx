"use client";

import BlockElement from "@/components/BlockElement";
import GameState from "@/components/GameState";
import { isValid } from "@/utils/isValid";
import { cols, gridSize, maxMines, rows } from "@/utils/settings";
import { useEffect, useState } from "react";

export default function Home() {
    const [map, setMap] = useState<Block[]>([]);
    const [gameState, setGameState] = useState<true | false | null>(null);
    const [flags, setFlags] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [opened, setOpened] = useState(0);

    const restart = () => {
        setGameState(null);
        generateMap();
        setStartTime(Date.now());
        setFlags(0);
        setOpened(0);
    };

    const generateMap = () => {
        let map = Array.from({ length: gridSize }).map((_, i) => {
            return {
                id: i,
                mine: false,
                flag: false,
                open: false,
                minesAround: 0,
            };
        });

        map = placeBombs(map);

        setMap(map);
    };

    const placeBombs = (map: Block[]) => {
        let minesCount = 0;
        while (minesCount < maxMines) {
            const i = Math.floor(Math.random() * gridSize);
            if (!map[i].mine) {
                map[i].mine = true;
                minesCount++;

                const neighbors = [i + 1, i - 1, i + cols, i - cols, i + cols + 1, i - cols - 1, i + cols - 1, i - cols + 1];

                neighbors.forEach((neighbor) => {
                    if (isValid(neighbor, i)) {
                        map[neighbor].minesAround++;
                    }
                });
            }
        }

        return map;
    };

    useEffect(() => {
        generateMap();
    }, []);
    
    useEffect(() => {
        if ((opened === gridSize - maxMines - flags) && flags == maxMines) {
            setGameState(true);
        }
    }, [flags, opened])

    const openBlock = (block: Block, cont: Boolean = true) => {
        if (block.flag || block.open || gameState != null) return;

        if (block.mine) {
            setGameState(false);
        }

        block.open = true;

        const getNeighbors = (i: number) => {
            const neighbors = [i + 1, i - 1, i + cols, i - cols, i + cols + 1, i - cols - 1, i + cols - 1, i - cols + 1];
            return neighbors.filter((_) => isValid(_, i));
        };

        let neighbors;
        if (cont == false) {
            neighbors = [block.id];
        } else {
            neighbors = [...getNeighbors(block.id), block.id];
        }

        neighbors.map((e) => {
            if (map[e].minesAround === 0) {
                if (map[e].flag || map[e].mine) return;

                map[e].open = true;
                getNeighbors(e).forEach((neighbor) => {
                    if (!map[neighbor].open && !map[neighbor].flag) {
                        openBlock(map[neighbor], false);
                    }
                });
            }
        });

        const newMap = map.map((_) => {
            if (_.id === block.id) return block;
            return _;
        });

        setOpened((prev) => prev + 1);
        setMap(newMap);
    };

    const toggleFlag = async (block: Block, event: React.MouseEvent) => {
        event.preventDefault();
        if (gameState != null || block.open) return;

        const newMap = map.map((_) => {
            if (_.id === block.id) {
                _.flag = !_.flag;
                return _;
            }
            return _;
        });
        
        setFlags((prev) => (block.flag ? prev + 1 : prev - 1));
        setMap(newMap);
    };

    return (
        <div onContextMenu={(event) => event.preventDefault()}>
            <GameState gameState={gameState} restart={restart} flags={flags} opened={opened} startTime={startTime} />
            <div className="flex items-center justify-center">
                <div className="w-screen h-screen flex flex-col items-center justify-center">
                    <div
                        className="gap-1"
                        style={{
                            display: "grid",
                            gridTemplateColumns: `repeat(${cols}, 1fr)`,
                            gridTemplateRows: `repeat(${rows}, 1fr)`,
                            maxWidth: "fit-content",
                        }}
                    >
                        {map.map((_, i) => (
                            <BlockElement key={i} block={_} openBlock={() => openBlock(_)} onContextMenu={(event: any) => toggleFlag(_, event)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
