"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface BlockElementInterface {
    block: Block;
    openBlock: any;
    onContextMenu: any;
}

export default function BlockElement({ block, openBlock, onContextMenu }: BlockElementInterface) {
    let text;
    let textColor = "text-black";
    let fontWeight = "font-normal";

    if (block.flag) text = "🚩";
    if (block.open) {
        text = `${block.minesAround}`;
        if (block.minesAround === 0) text = "";
    }

    if (block.mine && block.open) text = "💣";

    // Determine text color and weight based on minesAround
    if (block.minesAround > 0) {
        switch (block.minesAround) {
            case 1:
                textColor = "text-blue-700";
                fontWeight = "font-bold";
                break;
            case 2:
                textColor = "text-green-700";
                fontWeight = "font-bold";
                break;
            case 3:
                textColor = "text-red-600";
                fontWeight = "font-bold";
                break;
            default:
                textColor = "text-purple-500";
                fontWeight = "font-bold";
                break;
        }
    }

    return (
        <div
            onClick={openBlock}
            onContextMenu={onContextMenu}
            className={`w-[30px] h-[30px] rounded-md flex items-center justify-center cursor-pointer
            ${block.open && (block.mine ? "bg-red-500" : "bg-green-300")}
            bg-gray-300`}
        >
            <motion.div className={`transition transform transition-opacity ${textColor} ${fontWeight}`}>{text}</motion.div>
        </div>
    );
}
