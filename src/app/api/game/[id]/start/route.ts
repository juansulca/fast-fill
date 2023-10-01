import { wsServer } from "@/utils/wsServer";


export async function POST(
  _: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  wsServer.triggerStartGame(id, { start: 1 });

  return Response.json({ ok: true });
}