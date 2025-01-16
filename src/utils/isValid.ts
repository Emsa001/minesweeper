import { cols, gridSize } from "./settings";

export const isValid = (index: number, currentIndex: number): boolean => {
    const row = Math.floor(currentIndex / cols);
    const col = currentIndex % cols;
    const newRow = Math.floor(index / cols);
    const newCol = index % cols;

    return index >= 0 && index < gridSize && Math.abs(row - newRow) <= 1 && Math.abs(col - newCol) <= 1;
};