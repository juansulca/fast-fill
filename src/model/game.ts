export type CellState = 'red' | 'blue' | 'empty';

export type Board = CellState[];

export interface Game {
  id: string;
  board: Board;
  redPlayer?: string;
  bluePlayer?: string;
  redScore: number;
  blueScore: number;
}
