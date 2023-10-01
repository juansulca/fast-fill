import { CellState } from "./game";

export interface BoardUpdate {
  index: number,
  value: CellState
}
