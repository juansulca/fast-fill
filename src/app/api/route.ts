import { id } from '@/utils/id';
import { db } from '@/utils/database';

export async function POST(req: Request) {
  const { userId } = await req.json();
  const gameId = id();

  db.createNewGame(gameId, userId);

  return Response.json({ gameId });
}
