// Interfaces para orquestar el juego

import { ICoordinate } from "./board.interface"

export interface IGameService {
  getActiveCells(): ICoordinate[]
  nextGeneration(): ICoordinate[]
  reset(): void
}
