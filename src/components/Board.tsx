"use client";

import { CellState } from "@/model/game";
import { useState } from "react";

const getCellColor = (state: CellState) => {
  if (state === 'red')
    return 'bg-red-400';

  if (state === 'blue')
    return 'bg-indigo-400';

  return 'bg-gray-400';
}

const Cell = ({ text, state = 'empty' }: { text: string, state?: CellState }) => {
  const [color, setColor] = useState<CellState>(state);

  const onClick = () => {
    if (color === 'empty')
      setColor('red');
  };

  return (
    <div onClick={onClick} className={`h-24 w-24 ${getCellColor(color)} flex items-center justify-center border border-solid`}>
      {text}
    </div>
  );
};

export const Board = () => {
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-4 w-96">
        <Cell text="0" />
        <Cell text="1" />
        <Cell text="2" />
        <Cell text="3" />
        <Cell text="4" />
        <Cell text="5" />
        <Cell text="6" />
        <Cell text="7" />
        <Cell text="8" />
        <Cell text="9" />
        <Cell text="10" />
        <Cell text="11" />
        <Cell text="12" />
        <Cell text="13" />
        <Cell text="14" />
        <Cell text="15" />
      </div>
    </>
  );
};
