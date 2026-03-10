import { Injectable } from '@nestjs/common'
import { INeighborCounter } from '../interfaces/neighbor.interface'
import { IBoardState } from '../interfaces/board.interface'

@Injectable()
export class MooreNeighborCounter implements INeighborCounter {
  // Clase MooreNeightborCounter: Establece la vecindad de Moore (8 direcciones)
  // con bordes finitos
  private static readonly DIRECTIONS: ReadonlyArray<[number, number]> = [
    [-1, -1], [0, -1], [1, -1],
    [-1,  0],           [1,  0],
    [-1,  1], [0,  1], [1,  1],
  ]

  constructor(private readonly boardSize: number) {}

  count(x: number, y: number, state: IBoardState): number {
    let total = 0
    for (const [dx, dy] of MooreNeighborCounter.DIRECTIONS) {
      const nx = x + dx
      const ny = y + dy
      if (nx >= 0 && nx < this.boardSize && ny >= 0 && ny < this.boardSize) {
        if (state.isAlive(nx, ny)) total++
      }
    }
    return total
  }
}
