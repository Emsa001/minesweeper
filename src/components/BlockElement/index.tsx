"use client";

import { useGame } from "@/context/game";
import { motion } from "framer-motion";

interface BlockElementInterface {
    block: Block;
    openBlock: any;
    onContextMenu: any;
}

export default function BlockElement({ block, openBlock, onContextMenu }: BlockElementInterface) {

    const {cheats} = useGame();

    let text = block.open && (block.minesAround === 0 || block.mine ? "" : block.minesAround);
    let textColor = "text-black";
    let fontWeight = "font-normal";
    let background;

    if (block.minesAround > 0) {
        switch (block.minesAround) {
            case 1:
                textColor = "text-green-500";
                fontWeight = "font-bold";
                background = "cobblestone.png";
                break;
            case 2:
                textColor = "text-cyan-600";
                fontWeight = "font-bold";
                background = "deepslate.png";
                break;
            case 3:
                textColor = "text-purple-600";
                fontWeight = "font-bold";
                background = "blackstone.png";
                break;
            default:
                textColor = "text-red-900";
                fontWeight = "font-bold";
                background = "nether_bricks.png";
                break;
        }
    }

    if (block.minesAround === 0) background = "smooth_stone.png";
    if (block.mine) background = "tnt.png";
    
    if(!cheats){
        if (!block.open) background = "stone.png"
    }

    return (
        <div
            onClick={openBlock}
            onContextMenu={onContextMenu}
            className={`w-[30px] h-[30px] flex items-center justify-center cursor-pointer`}
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('${background}')`,
            }}
        >
            <motion.div
                className={`relative w-full h-full transition transform transition-opacity flex items-center justify-center ${textColor} ${fontWeight}`}
                style={{ backgroundImage: block.flag ? `url('/redstone_torch.png')` : "", backgroundSize: "cover" }}
            >
                {text && <div className="absolute inset-0 bg-black opacity-20"></div>}
                <p className="z-[10]">{text}</p>
            </motion.div>
        </div>
    );
}
