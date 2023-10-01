import { Board } from "@/components/Board";
import { Hud } from "@/components/Hud";
import { db } from "@/utils/database";

export default async function Game({ params }: { params: { game: string } }) {
  const data = await db.getGame(params.game);

  return <>
    <div>Game: {params.game}</div>
    <Board gameId={params.game} game={data}/>
    <Hud gameId={params.game} game={data}/>
  </>
}