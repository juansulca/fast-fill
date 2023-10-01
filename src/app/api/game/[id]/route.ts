import { db } from "@/utils/database";
import { wsServer } from "@/utils/wsServer";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const game = await db.getGame(id);

  return Response.json(game);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { index, value } = await req.json(); // { index: 0..15, value: 'red' | 'blue' }

  wsServer.triggerBoardUpdate(id, { index, value });

  const game = await db.getGame(id);
  game.board[index] = value;

  if(value === 'red') {
    game.redScore = game.board.filter(cell => cell === 'red').length ?? 0;
    wsServer.triggerScoreUpdate(id, { player: 'red', score: game.redScore });
  } else {
    game.blueScore = game.board.filter(cell => cell === 'blue').length ?? 0;
    wsServer.triggerScoreUpdate(id, { player: 'blue', score: game.blueScore })
  }

  db.updateGame(id, game);

  return Response.json({ ok: true });
}
