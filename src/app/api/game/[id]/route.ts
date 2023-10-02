import { EndGameMessage } from "@/model/endGameMessage";
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

  const score = game.board.filter(cell => cell === value).length ?? 0;
  wsServer.triggerScoreUpdate(id, { player: value, score: score });

  const emptyCells = game.board.filter(cell => cell === 'empty').length ?? 0;

  if (emptyCells <= 0) {
    const redScore = game.board.filter(cell => cell === 'red').length ?? 0;
    const blueScore = game.board.filter(cell => cell === 'blue').length ?? 0;
    let winner: EndGameMessage["winner"] = 'no one';
    if (redScore > 8) {
      winner = 'red';
    } else if (blueScore > 8) {
      winner = 'blue';
    }
    wsServer.triggerEndGame(id, { winner });
  }

  db.updateGame(id, game);

  return Response.json({ ok: true });
}
