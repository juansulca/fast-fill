import { channelTemplate, boardUpdateEvent, scoreUpdateEvent, startGameEvent, endGameEvent } from '@/app/constants';
import { BoardUpdate } from '@/model/boardUpdate';
import { EndGameMessage } from '@/model/endGameMessage';
import { ScoreUpdate } from '@/model/scoreUpdate';
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

  triggerScoreUpdate(gameId: string, message: ScoreUpdate) {
    this.pusher.trigger(channelTemplate(gameId), scoreUpdateEvent, message);
  }

  triggerStartGame(gameId: string, message: { start: number }) {
    this.pusher.trigger(channelTemplate(gameId), startGameEvent, message);
  }

  triggerEndGame(gameId: string, message: EndGameMessage) {
    this.pusher.trigger(channelTemplate(gameId), endGameEvent, message);
  }
}

export const wsServer = new WS();
