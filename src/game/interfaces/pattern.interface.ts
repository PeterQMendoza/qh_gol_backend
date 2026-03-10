//  Interfaces para representacion de patrones 

import { ICoordinate } from "./board.interface"

export interface IBoardPattern {
  readonly name: string
  getCells(boardSize: number): ICoordinate[]
}
