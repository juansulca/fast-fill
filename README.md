This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project description

This is a simple two player game build using Next 13, upstash redis, pusher (web sockets) and deployed on vercel.

To access the live app open: https://fast-fill.juansulca.me/

### How to play

1. Create a new game by clicking on New Game.
2. You will see the game board. Copy the game id and send it to your friend.
3. Your friend can join your game using the text field and the join button.
4. Use the start button to start your game.

## Getting Started

First, run the development server:

```bash
npm run dev
```

### You will need a  `.env` file similar to the one provided in `.env.example`
```bash
UPSTASH_REDIS_REST_URL='https://link'
UPSTASH_REDIS_REST_TOKEN='XXXXX'
PUSHER_APPID='xxxxxxx'
NEXT_PUBLIC_PUSHER_KEY='xxxxxx'
PUSHER_SECRET='xxxxx'
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment
