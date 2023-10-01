"use client";

import { getOrCreateUserId } from "@/utils/userSession";
import { useState } from "react";

export const JoinGameButton = () => {
  const [gameId, setGameId] = useState('');

  const onClickJoinGame = async () => {
    const userId = getOrCreateUserId();
    window.location.pathname = `/${gameId}`;
  };
  
  return (<div>
    <input className="text-black" type="text" value={gameId} onChange={(e) => setGameId(e.target.value)}/>
    <a onClick={onClickJoinGame}>Join Game</a>
  </div>);
};