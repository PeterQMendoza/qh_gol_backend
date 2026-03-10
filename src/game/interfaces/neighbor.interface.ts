// Interface para contador de celulas vecinas

import { IBoardState } from "./board.interface"

export interface INeighborCounter {
  count(x: number, y: number, state: IBoardState): number
}
