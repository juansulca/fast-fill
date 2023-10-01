import { Game } from "@/model/game";

export const getGame = (id: string): () => Promise<Game> => {
  return async () => {
    const res = await fetch(`/api/game/${id}`, { method: "GET" });
    return res.json();
  }
};
