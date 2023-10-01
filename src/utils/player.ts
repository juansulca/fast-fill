import { getUserId } from "./userSession";

export const isRedPlayer = (redPlayerId?: string) => {
  const playerId = getUserId();

  return playerId == redPlayerId;
};