"use client";

import { boardUpdateEvent, channelTemplate, endGameEvent, startGameEvent } from "@/app/constants";
import { BoardUpdate } from "@/model/boardUpdate";
import { CellState, Game } from "@/model/game";
import { getGame } from "@/utils/getGame";
import { isRedPlayer } from "@/utils/player";
import { updateBoard } from "@/utils/updateBoard";
import { wsClient } from "@/utils/wsClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const getCellColor = (state: CellState) => {
  if (state === "red") return "bg-red-400";

  if (state === "blue") return "bg-indigo-400";

  return "bg-gray-400";
};

const Cell = ({
  pos,
  state = "empty",
  gameId,
  isRed,
  isGameActive
}: {
  pos: number;
  state?: CellState;
  gameId: string;
  isRed: boolean;
  isGameActive: boolean;
}) => {
  const [color, setColor] = useState<CellState>(state);
  const playerColor = isRed ? "red" : "blue";
  const mutation = useMutation({
    mutationKey: ["updateBoard"],
    mutationFn: ({ id, message }: { id: string; message: BoardUpdate }) =>
      updateBoard(id, message),
  });

  const onClick = () => {
    if (!isGameActive) return;
    if (color === "empty") {
      setColor(playerColor);
      mutation.mutate({
        id: gameId,
        message: { index: pos, value: playerColor },
      });
    }
  };

  return (
    <div
      onClick={onClick}
      className={`h-24 w-24 ${getCellColor(
        color
      )} flex items-center justify-center border border-solid`}
    >
      {pos}
    </div>
  );
};

export const Board = ({ gameId, game }: { gameId: string; game?: Game }) => {
  const isRed = isRedPlayer(game?.redPlayer);
  const { data } = useQuery({
    queryKey: ["gameQuery"],
    queryFn: getGame(gameId),
    initialData: game,
  });

  const [gameState, setGameState] = useState({...data as Game});
  const [isGameActive, setIsGameActive] = useState(false);

  useEffect(() => {
    const gameChannel = wsClient.subscribe(channelTemplate(gameId));
    gameChannel.bind(boardUpdateEvent, ({ index, value }: BoardUpdate) => {
      setGameState((prev) => {
        const { board } = prev as Game;
        board[index] = value;
        return {...prev, board};
      });
    });

    gameChannel.bind(startGameEvent, () => {
      setIsGameActive(true);
    });

    gameChannel.bind(endGameEvent, () => {
      setIsGameActive(false);
    });

    return () => { gameChannel.unsubscribe(); }
  }, [gameId]);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-4 w-96">
        {gameState?.board.map((cell, index) => (
          <Cell key={`cell-${index}-${cell}`} pos={index} state={cell} gameId={gameId} isRed={isRed} isGameActive={isGameActive} />
        ))}
      </div>
    </>
  );
};
