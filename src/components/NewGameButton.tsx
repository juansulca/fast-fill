'use client';

import { getOrCreateUserId } from '@/utils/userSession';

export const NewGameButton = () => {
  const onClickNewGame = async () => {
    const userId = getOrCreateUserId();
    const res = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ userId })
    });

    const { gameId } = await res.json();
    if (!gameId) return;

    window.location.pathname = `/${gameId}`;
  };

  return <a onClick={onClickNewGame}>New Game</a>
};
