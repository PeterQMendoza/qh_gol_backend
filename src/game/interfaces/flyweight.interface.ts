// Interfaces para el patron flyweight

export interface ICellFlyweight {
  readonly x: number
  readonly y: number
  readonly key: string
}

export interface IFlyweightFactory<T> {
  get(x: number, y: number): T
  count(): number
}
