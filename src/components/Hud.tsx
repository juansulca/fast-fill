'use client';

import { getUserId } from "@/utils/userSession";

export const Hud = () => {
  const redScore = 2;
  const blueScore = 4;
  const time = "1:23";
  const userId = getUserId();

  return (<>
    <div>client: {userId}</div>
    <div className="flex w-96 justify-between mt-6">
      <div className="grid grid-cols-1 grid-rows-2">
        <div>Red: {redScore}</div>
        <div>Blue: {blueScore}</div>
      </div>
      <div>Time: {time}</div>
    </div>
  </>);
};
