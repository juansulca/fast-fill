import Pusher from "pusher-js";

const wsClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? '', {
  cluster: 'mt1'
});

export { wsClient };
