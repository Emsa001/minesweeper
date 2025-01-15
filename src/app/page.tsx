"use client";

import BlockElement from "@/components/BlockElement";
import { cols, gridSize, isValid, rows } from "@/utils/isValid";
import { useEffect, useState } from "react";

export default function Home() {
    const [map, setMap] = useState<Block[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [max_mines, setMaxMines] = useState<number>(80);

    const restart = () => {
        setGameOver(false);
        generateMap();
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
        while (minesCount < max_mines) {
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

    const openBlock = (block: Block, cont: Boolean = true) => {
        if (block.flag || block.open || gameOver) return;

        if (block.mine) {
            setGameOver(true);
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

        setMap(newMap);
    };

    const toggleFlag = (block: Block, event: React.MouseEvent) => {
        event.preventDefault();
        if (gameOver || block.open) return;

        const newMap = map.map((_) => {
            if (_.id === block.id) {
                _.flag = !_.flag;
                return _;
            }
            return _;
        });

        setMap(newMap);
    };

    return (
        <div onContextMenu={(event) => event.preventDefault()}>
            {gameOver && (
                <div className="absolute top-32 left-0 right-0 top-0 grid place-items-center">

                    <div className="flex flex-col items-center justify-center gap-6 bg-red-900 bg-opacity-90 rounded-2xl p-10 z-[20]">
                        <h1 className="text-black font-black text-6xl">Game Over!</h1>
                        <button className="bg-blue-600 p-2 w-1/2 rounded-md" onClick={restart}>
                            Restart
                        </button>
                    </div>
                </div>
            )}
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
