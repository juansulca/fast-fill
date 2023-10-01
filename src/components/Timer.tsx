"use client";

import { channelTemplate, endGameEvent, startGameEvent } from "@/app/constants";
import { wsClient } from "@/utils/wsClient";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const Timer = ({ gameId }: { gameId: string }) => {
  const [start, setStart] = useState(false);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("00:00");
  const [end, setEnd] = useState(false);

  const initialTime = new Date().getTime();

  useEffect(() => {
    if (!start) return;

    const interval = setInterval(() => {
      const elapsed = count + (new Date().getTime() - initialTime);
      setCount(elapsed);

      const second = Math.floor((elapsed / 1000) % 60)
        .toString()
        .padStart(2, "0");
      const minute = Math.floor(elapsed / 1000 / 60)
        .toString()
        .padStart(2, "0");

      setTime(`${minute}:${second}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  useEffect(() => {
    const gameChannel = wsClient.subscribe(channelTemplate(gameId));

    gameChannel.bind(startGameEvent, () => {
      setStart(true);
    });

    gameChannel.bind(endGameEvent, () => {
      setStart(false);
      setEnd(true);
    });

    return () => {
      gameChannel.unsubscribe();
    };
  }, [gameId]);

  const startGameMutation = useMutation({
    mutationKey: ['startGame'],
    mutationFn: () => fetch(`api/game/${gameId}/start`, { method: 'POST' }).then(res => res.json()),
  });

  const onClickStart = () => {
    startGameMutation.mutate();
  };

  return (
    <div>
      {start || end ? <>Time: {time}</> :
      <a onClick={onClickStart}>start</a>}
    </div>
  );
};
