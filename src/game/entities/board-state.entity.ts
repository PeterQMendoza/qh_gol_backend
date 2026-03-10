import { IBoardMutator, IBoardState, ICoordinate } from "../interfaces/board.interface"

export class BoardState implements IBoardState, IBoardMutator {
  // Clase de BoardState encapsula el conunto de celdas vivas
  private readonly alive: Set<string> = new Set()

  private static toKey(x: number, y: number): string {
    return `${x},${y}`
  }

  isAlive(x: number, y: number): boolean {
    return this.alive.has(BoardState.toKey(x, y))
  }

  setAlive(x: number, y: number): void {
    this.alive.add(BoardState.toKey(x, y))
  }

  setDead(x: number, y: number): void {
    this.alive.delete(BoardState.toKey(x, y))
  }

  clear(): void {
    this.alive.clear()
  }

  getAliveCells(): ICoordinate[] {
    return Array.from(this.alive).map(key => {
      const [x, y] = key.split(',').map(Number)
      return { x, y }
    })
  }

  clone(): BoardState {
    const copy = new BoardState()
    for (const { x, y } of this.getAliveCells()) {
      copy.setAlive(x, y)
    }
    return copy
  }
}
