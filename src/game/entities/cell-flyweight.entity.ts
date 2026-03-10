import { ICellFlyweight } from '../interfaces/flyweight.interface'

export class CellFlyweight implements ICellFlyweight {
  // Clase CellFlyeight: Representa coodenadas de las celulas vivas
  // Flyweight: Estado intrínseco e inmutable de una celda.
  readonly key: string

  constructor(
    readonly x: number,
    readonly y: number,
  ) {
    this.key = `${x},${y}`
  }
}
