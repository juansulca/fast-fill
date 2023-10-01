"use client";

import { channelTemplate, endGameEvent, scoreUpdateEvent } from "@/app/constants";
import { EndGameMessage } from "@/model/endGameMessage";
import { Game } from "@/model/game";
import { ScoreUpdate } from "@/model/scoreUpdate";
import { getGame } from "@/utils/getGame";
import { isRedPlayer } from "@/utils/player";
import { getUserId } from "@/utils/userSession";
import { wsClient } from "@/utils/wsClient";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const Hud = ({ gameId, game }: { gameId: string; game: Game }) => {
  const { data } = useQuery({
    queryKey: ["gameQuery"],
    queryFn: getGame(gameId),
    initialData: game,
  });

  const { board } = data;
  const time = "1:23";
  const userId = getUserId();
  const player = isRedPlayer(data.redPlayer) ? "red" : "blue";
  const [rScore, setRedScore] = useState(board.filter(cell => cell === 'red').length ?? 0);
  const [bScore, setBlueScore] = useState(board.filter(cell => cell === 'blue').length ?? 0);
  
  useEffect(() => {
    const gameChannel = wsClient.subscribe(channelTemplate(gameId));
    gameChannel.bind(scoreUpdateEvent, ({player, score}: ScoreUpdate) => {
      if (player === 'red')
        setRedScore(score);
      else
        setBlueScore(score);
    });

    gameChannel.bind(endGameEvent, ({ winner }: EndGameMessage) => {
      alert(`Player: ${winner} wins!`);
    });

    return () => {
      gameChannel.unsubscribe();
    }
  }, [gameId]);

  return (
    <>
      <div>
        client: {userId} - playing as: {player}
      </div>
      <div className="flex w-96 justify-between mt-6">
        <div className="grid grid-cols-1 grid-rows-2">
          <div className={`text-red-400 ${player === "red" && 'underline'}`}>Red: {rScore}</div>
          <div className={`text-indigo-400 ${player === "blue" && 'underline'}`}>Blue: {bScore}</div>
        </div>
        <div>Time: {time}</div>
      </div>
    </>
  );
};
