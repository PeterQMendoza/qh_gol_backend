// Interfaces definidos sobre las operaciones en el tablero
export interface ICoordinate {
  x: number
  y: number
}

export interface IBoardState {
  getAliveCells(): ICoordinate[]
  isAlive(x: number, y: number): boolean
}

export interface IBoardMutator {
  setAlive(x: number, y: number): void
  setDead(x: number, y: number): void
  clear(): void
}
