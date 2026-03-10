import { ICoordinate } from "../interfaces/board.interface"
import { IBoardPattern } from "../interfaces/pattern.interface"

export class PistolGosperPattern implements IBoardPattern {
  // Clase PulsarPattern: representa el patron pulsar, oscilador de período 3 del Juego de la Vida.
  readonly name = 'PistolGosper'

  // Este patron abarca un talero de 9x36
  private static readonly OFFSETS: ReadonlyArray<[number, number]> = [
    [24, 0],
    [22, 1],[24, 1],
    [12, 2],[13, 2],[20, 2],[21, 2],[34, 2],[35, 2],
    [11, 3],[15, 3],[20, 3],[21, 3],[34, 3],[35, 3],
    [0, 4],[1, 4],[10, 4],[16, 4],[20, 4],[21, 4],
    [0, 5],[1, 5],[10, 5],[14, 5],[16, 5],[17, 5],[22, 5],[24, 5],
    [10, 6],[16, 6],[24, 6],
    [11, 7],[15, 7],
    [12, 8],[13, 8],
  ]

  getCells(boardSize: number): ICoordinate[] {
    const patternSizeX = 56
    const patternSizeY = 56
    // Ubicacion al centro del tablero
    const originX = Math.floor((boardSize - patternSizeX) / 2)
    const originY = Math.floor((boardSize - patternSizeY) / 2)

    return PistolGosperPattern.OFFSETS
      .map(([dx, dy]) => ({ x: originX + dx, y: originY + dy}))
      .filter(({ x, y }) => x >= 0 && x < boardSize && y >= 0 && y < boardSize)
  }
}
