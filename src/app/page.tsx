import { JoinGameButton } from "@/components/JoinGame";
import { NewGameButton } from "@/components/NewGameButton";

export default function Home() {
  return (
    <div className="max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col mx-auto">
      <h1 className="text-3xl">Fast Fill ⚡️</h1>
      <NewGameButton />
      <JoinGameButton />
    </div>
  );
}
