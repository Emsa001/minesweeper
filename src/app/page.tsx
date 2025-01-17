import Game from "@/components/Game";
import GameSettings from "@/components/Game/settings";
import { GameProvider } from "@/context/game";

export default function Home() {
    return (
        <GameProvider>
            <Game />
            <GameSettings />
        </GameProvider>
    );
}
