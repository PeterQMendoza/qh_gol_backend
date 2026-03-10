import { ICoordinate } from "../interfaces/board.interface"
import { IBoardPattern } from "../interfaces/pattern.interface"

export class PulsarPattern implements IBoardPattern {
  // Clase PulsarPattern: representa el patron pulsar, oscilador de período 3 del Juego de la Vida.
  readonly name = 'Pulsar'

  // Este patron abarca un talero de 13x13
  private static readonly OFFSETS: ReadonlyArray<[number, number]> = [
    // Segmento superior-izquierdo
    [2, 0],[3, 0],[4, 0],
    [0, 2],[0, 3],[0, 4],
    [5, 2],[5, 3],[5, 4],
    [2, 5],[3, 5],[4, 5],
    // Segmento superior-derecho
    [8, 0],[9, 0],[10, 0],
    [7, 2],[7, 3],[7, 4],
    [12, 2],[12, 3],[12, 4],
    [8, 5],[9, 5],[10, 5],
    // Segmento inferior-izquierdo
    [2, 7],[3, 7],[4, 7],
    [0, 8],[0, 9],[0, 10],
    [5, 8],[5, 9],[5, 10],
    [2, 12],[3, 12],[4, 12],
    // Segmento inferior-derecho
    [8, 7],[9, 7],[10, 7],
    [7, 8],[7, 9],[7, 10],
    [12, 8],[12, 9],[12, 10],
    [8, 12],[9, 12],[10, 12],
  ]

  getCells(boardSize: number): ICoordinate[] {
    const patternSize = 13
    // Ubicacion al centro del tablero
    const originX = Math.floor((boardSize - patternSize) / 2)
    const originY = Math.floor((boardSize - patternSize) / 2)

    return PulsarPattern.OFFSETS
      .map(([dx, dy]) => ({ x: originX + dx, y: originY + dy }))
      .filter(({ x, y }) => x >= 0 && x < boardSize && y >= 0 && y < boardSize)
  }
}
