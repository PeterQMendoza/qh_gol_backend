import { ICoordinate } from "../interfaces/board.interface"
import { IBoardPattern } from "../interfaces/pattern.interface"

export class SapoPattern implements IBoardPattern {
  // Clase SapoPattern: representa el patron sapo, oscilador de período 2.
  readonly name = 'Sapo'

  // Este patron abarca un talero de 4x2
  private static readonly OFFSETS: ReadonlyArray<[number, number]> = [
    [2, 0],
    [0, 1],[3, 1],
    [0, 2],[3, 2],
    [1, 3],
  ]

  getCells(boardSize: number): ICoordinate[] {
    const patternSize = 4
    // Ubicacion al centro del tablero
    const originX = Math.floor((boardSize - patternSize) / 2)
    const originY = Math.floor((boardSize - patternSize) / 2)

    return SapoPattern.OFFSETS
      .map(([dx, dy]) => ({ x: originX + dx, y: originY + dy }))
      .filter(({ x, y }) => x >= 0 && x < boardSize && y >= 0 && y < boardSize)
  }
}
