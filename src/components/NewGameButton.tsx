'use client';

import { getOrCreateUserId } from '@/utils/userSession';
import { useRouter } from 'next/navigation';

export const NewGameButton = () => {
  const router = useRouter();

  const onClickNewGame = async () => {
    const userId = getOrCreateUserId();
    const res = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ userId })
    });

    const { gameId } = await res.json();
    if (!gameId) return;

    router.push(`/${gameId}`);
  };

  return <a className="hover:text-slate-400 my-2 h-12 w-1/3 flex justify-center items-center" onClick={onClickNewGame}>New Game</a>
};
