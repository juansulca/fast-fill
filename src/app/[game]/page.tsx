import { Board } from "@/components/Board";
import { Hud } from "@/components/Hud";

export default function Game({ params }: { params: { game: string } }) {
  return <>
    <div>Game: {params.game}</div>
    <Board />
    <Hud />
  </>
}