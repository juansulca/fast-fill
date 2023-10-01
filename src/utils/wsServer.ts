import { channelTemplate, boardUpdateEvent } from '@/app/constants';
import { BoardUpdate } from '@/model/boardUpdate';
import Pusher from 'pusher';

class WS {
  private readonly pusher: Pusher;

  constructor() {
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APPID ?? '',
      key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? '',
      secret: process.env.PUSHER_SECRET ?? '',
      cluster: "mt1",
      useTLS: true
    });
  }

  triggerBoardUpdate(gameId: string, message: BoardUpdate) {
    this.pusher.trigger(channelTemplate(gameId), boardUpdateEvent, message);
  }
}

export const wsServer = new WS();
