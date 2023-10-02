"use client";

import { getOrCreateUserId } from "@/utils/userSession";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const JoinGameButton = () => {
  const router = useRouter();
  const [gameId, setGameId] = useState('');

  const onClickJoinGame = async () => {
    const userId = getOrCreateUserId();
    router.push(`/${gameId}`);
  };
  
  return (<div className="flex flex-col items-center my-2">
    <input className="text-black mb-2 p-2" type="text" placeholder="Game id..." value={gameId} onChange={(e) => setGameId(e.target.value)}/>
    <a className="hover:text-slate-400 h-12 w-full flex justify-center items-center" onClick={onClickJoinGame}>Join Game</a>
  </div>);
};