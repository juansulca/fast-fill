import { BoardUpdate } from "@/model/boardUpdate";

export const updateBoard = async (
  id: string,
  message: BoardUpdate
): Promise<{ ok: true }> => {
  const res = await fetch(`/api/game/${id}`, {
    method: "POST",
    body: JSON.stringify(message),
  });
  return res.json();
};
