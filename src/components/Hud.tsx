"use client";

import { Game } from "@/model/game";
import { getGame } from "@/utils/getGame";
import { isRedPlayer } from "@/utils/player";
import { getUserId } from "@/utils/userSession";
import { useQuery } from "@tanstack/react-query";

export const Hud = ({ gameId, game }: { gameId: string; game: Game }) => {
  const { data } = useQuery({
    queryKey: ["gameQuery"],
    queryFn: getGame(gameId),
    initialData: game,
  });

  const { redScore, blueScore } = data;
  const time = "1:23";
  const userId = getUserId();
  const player = isRedPlayer(data.redPlayer) ? "red" : "blue";

  return (
    <>
      <div>
        client: {userId} - playing as: {player}
      </div>
      <div className="flex w-96 justify-between mt-6">
        <div className="grid grid-cols-1 grid-rows-2">
          <div className={`text-red-400 ${player === "red" && 'underline'}`}>Red: {redScore}</div>
          <div className={`text-indigo-400 ${player === "blue" && 'underline'}`}>Blue: {blueScore}</div>
        </div>
        <div>Time: {time}</div>
      </div>
    </>
  );
};
